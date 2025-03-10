import { EventEmitter } from "~/utils/event-emitter";
import { DEFAULT_TIME_SLICE_MS, RecordServiceEventTypes } from "./constants";
import { RecordServiceEvents } from "./types";

class RecordManager {
  private static instance: RecordManager;
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private tabStream: MediaStream | null = null; // Add these
  private micStream: MediaStream | null = null; // Add these
  private isRecording: boolean = false;

  public emitter = new EventEmitter<RecordServiceEvents>();

  private constructor() {}

  public static getInstance(): RecordManager {
    if (!this.instance) {
      this.instance = new RecordManager();
    }
    return this.instance;
  }

  private initializeRecorder(stream: MediaStream) {
    this.mediaStream = stream;
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.emitter.emit(RecordServiceEventTypes.DATA_AVAILABLE, event.data);
      }
    };

    this.mediaRecorder.onstop = this.handleStop.bind(this);
  }

  public async start() {
    if (this.isRecording) return;

    // Save original streams
    this.tabStream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });

    this.micStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        autoGainControl: true,
        echoCancellation: true,
      },
    });

    this.audioContext = new AudioContext();

    const tabAudioSource = this.audioContext.createMediaStreamSource(
      this.tabStream,
    );
    const micAudioSource = this.audioContext.createMediaStreamSource(
      this.micStream,
    );
    const destination = this.audioContext.createMediaStreamDestination();

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 1.0;

    tabAudioSource.connect(gainNode).connect(destination);
    micAudioSource.connect(gainNode).connect(destination);

    this.initializeRecorder(destination.stream);
    this.mediaRecorder?.start(DEFAULT_TIME_SLICE_MS);
    this.isRecording = true;
    this.emitter.emit(RecordServiceEventTypes.STATE_CHANGE, true);
  }

  public pause() {
    if (this.mediaRecorder?.state === "recording") {
      this.mediaRecorder.pause();
      console.log("Recording paused");
      this.emitter.emit(RecordServiceEventTypes.STATE_CHANGE, true);
    }
  }

  public resume() {
    if (this.mediaRecorder?.state === "paused") {
      this.mediaRecorder.resume();
      console.log("Recording resumed");
      this.emitter.emit(RecordServiceEventTypes.STATE_CHANGE, true);
    }
  }

  public stop() {
    if (!this.isRecording) return;
    this.mediaRecorder?.stop();
    this.isRecording = false;
    this.emitter.emit(RecordServiceEventTypes.STATE_CHANGE, false); // emit false when stopping
  }

  private handleStop() {
    this.cleanup();
  }

  private cleanup() {
    this.mediaRecorder = null;

    this.audioContext?.close();
    this.audioContext = null;

    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = null;

    // Explicitly stop original streams to ensure recording fully stops
    this.tabStream?.getTracks().forEach((track) => track.stop());
    this.micStream?.getTracks().forEach((track) => track.stop());

    this.tabStream = null;
    this.micStream = null;
  }

  public isRecordingInProgress() {
    return this.isRecording;
  }

  public isPaused() {
    return this.mediaRecorder?.state === "paused";
  }
}

export default RecordManager;

export { RecordServiceEventTypes } from "./constants";
export { type RecordServiceEvents } from "./types";

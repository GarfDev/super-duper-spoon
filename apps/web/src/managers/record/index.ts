import { EventEmitter } from "~/utils/event-emitter";

import { RecordServiceEventTypes } from "./constants";
import { RecordServiceEvents } from "./types";

class RecordManager {
  private static instance: RecordManager;
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private isRecording: boolean = false;

  public emitter = new EventEmitter<RecordServiceEvents>();

  private constructor() {}

  public static getInstance(): RecordManager {
    if (!RecordManager.instance) {
      RecordManager.instance = new RecordManager();
    }
    return RecordManager.instance;
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

    const tabStream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });

    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    this.audioContext = new AudioContext();

    const tabAudioSource = this.audioContext.createMediaStreamSource(tabStream);
    const micAudioSource = this.audioContext.createMediaStreamSource(micStream);
    const destination = this.audioContext.createMediaStreamDestination();

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 1.0;

    tabAudioSource.connect(gainNode).connect(destination);
    micAudioSource.connect(gainNode).connect(destination);

    this.initializeRecorder(destination.stream);
    this.mediaRecorder?.start(2000);
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
    this.emitter.emit(RecordServiceEventTypes.STATE_CHANGE, true);
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
  }

  public isRecordingInProgress() {
    return this.isRecording;
  }

  public isPaused() {
    return this.mediaRecorder?.state === "paused";
  }
}

export default RecordManager;

/** Only re-export important types and constants */
export { RecordServiceEventTypes } from "./constants";
export { type RecordServiceEvents } from "./types";

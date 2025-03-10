import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { PreferenceStore, RecordStore } from "~/globals/stores";
import { RecordServiceEventTypes } from "~/globals/stores/record-store";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">If you see this means this work</h1>
      <Button size="lg" onClick={PreferenceStore.toggleTheme}>Toggle</Button>
      <RecorderControls />
    </div>
  );
};

export default Homepage;

const RecorderControls = () => {
  const { isRecording, isPaused, instance: recordInstance } = RecordStore
    .store();
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    const callback = (data: Blob) => {
      audioChunks.current.push(data);
    };

    // Set the audio data callback when component mounts
    recordInstance.emitter.on(
      RecordServiceEventTypes.DATA_AVAILABLE,
      callback,
    );

    // Clean up the audio data callback when component unmounts
    return () => {
      recordInstance.emitter.off(
        RecordServiceEventTypes.DATA_AVAILABLE,
        callback,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadRecording = () => {
    const blob = new Blob(audioChunks.current, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
    audioChunks.current = [];
  };

  return (
    <div className="gap-4">
      <h2>Recorder Controls</h2>
      <p>
        Status:{" "}
        {!isRecording ? "Not recording" : isPaused ? "Paused" : "Recording..."}
      </p>
      <Button
        variant="ghost"
        onClick={RecordStore.start}
        disabled={isRecording}
      >
        Start
      </Button>
      {isRecording && !isPaused && (
        <Button variant="ghost" onClick={RecordStore.pause}>
          Pause
        </Button>
      )}
      {isRecording && isPaused && (
        <Button variant="ghost" onClick={RecordStore.resume}>
          Resume
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={RecordStore.stop}
        disabled={!isRecording}
      >
        Stop
      </Button>
      <Button
        onClick={downloadRecording}
        disabled={audioChunks.current.length === 0}
      >
        Download
      </Button>
    </div>
  );
};

import { Focus } from "lucide-react";
import { cn } from "~/lib/utils";
import { RecordStore } from "~/globals/stores";

const AppPermission = () => {
  const { isRecording } = RecordStore.store();

  return (
    <div
      className={cn(
        baseContainerStyles,
        isRecording ? recordingStyles : idleStyles,
      )}
    >
      <RecordingIndicator isRecording={isRecording} />
    </div>
  );
};

export default AppPermission;

/** Extracted Components and Styles for Clarity */

const RecordingIndicator = ({ isRecording }: { isRecording: boolean }) => (
  <span className="flex items-center gap-1 text-sm">
    <FocusIcon isRecording={isRecording} />
    {isRecording && <LiveText />}
  </span>
);

const FocusIcon = ({ isRecording }: { isRecording: boolean }) => (
  <Focus
    className={cn(
      isRecording ? "text-destructive-foreground animate-pulse" : "text-ring",
    )}
    size={20}
  />
);

const LiveText = () => (
  <p className="font-bold text-destructive-foreground animate-pulse">Live</p>
);

/** CSS Styles */

const baseContainerStyles =
  "flex items-center gap-x-8 border-2 h-full px-2 py-1 self-center rounded-md transition-all duration-300";

const recordingStyles =
  "border-destructive-foreground shadow-[0_0_10px_rgba(239,68,68,0.7)]";

const idleStyles = "border-ring shadow-none";

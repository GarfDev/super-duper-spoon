// useRecordStore.ts
import { create } from "zustand";
import RecordManager, { RecordServiceEventTypes } from "~/managers/record";

interface RecordStoreState {
  isRecording: boolean;
  isPaused: boolean;
  instance: RecordManager;
}

export const store = create<RecordStoreState>(
  (set) => {
    /** Subscribe to RecordManager events (initialize once) */
    const recorder = RecordManager.getInstance();

    recorder.emitter.on(RecordServiceEventTypes.STATE_CHANGE, () => {
      set({
        isRecording: recorder.isRecordingInProgress(),
        isPaused: recorder.isPaused(),
      });
    });

    return {
      isRecording: false,
      isPaused: false,
      instance: recorder,
    };
  },
);

/** Actions */

export const start = async () => {
  await RecordManager.getInstance().start();
};

export const pause = () => {
  RecordManager.getInstance().pause();
};

export const resume = () => {
  RecordManager.getInstance().resume();
};

export const stop = () => {
  RecordManager.getInstance().stop();
};

export { RecordServiceEventTypes };

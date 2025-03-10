import { PermissionEventType } from "./constants";

export type PermissionServiceEvents = {
  [PermissionEventType.UPDATE]: {
    name: PermissionQuery;
    state: PermissionState;
  };
};

export type PermissionQuery =
  | "accelerometer"
  | "accessibility-events"
  | "ambient-light-sensor"
  | "background-sync"
  | "camera"
  | "clipboard-read"
  | "clipboard-write"
  | "geolocation"
  | "gyroscope"
  | "local-fonts"
  | "magnetometer"
  | "microphone"
  | "midi"
  | "notifications"
  | "payment-handler"
  | "persistent-storage"
  | "push"
  | "screen-wake-lock"
  | "storage-access"
  | "top-level-storage-access"
  | "window-management";

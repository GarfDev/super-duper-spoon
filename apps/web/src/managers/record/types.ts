import { RecordServiceEventTypes } from "./constants";

export type RecordServiceEvents = {
  [RecordServiceEventTypes.STATE_CHANGE]: boolean;
  [RecordServiceEventTypes.DATA_AVAILABLE]: Blob;
};

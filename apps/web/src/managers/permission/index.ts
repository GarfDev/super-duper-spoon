import { EventEmitter } from "~/utils/event-emitter";
import { PermissionQuery, PermissionServiceEvents } from "./types";
import { PermissionEventType } from "./constants";

class PermissionManager {
  private static instance: PermissionManager;
  public emitter = new EventEmitter<PermissionServiceEvents>();

  private constructor() {}

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  public check = async (query: PermissionQuery) => {
    const permission = await navigator.permissions.query({
      name: query as PermissionName,
    });

    const update = {
      name: query,
      state: permission.state,
    };

    this.emitter.emit(PermissionEventType.UPDATE, update);

    return permission.state;
  };

  public promptMicrophone = async () => {
    const permission = await navigator.permissions.query({
      name: "microphone" as PermissionName,
    });
    if (permission.state === "granted") {
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    stream.getTracks().forEach((track) => track.stop());
  };
}

export default PermissionManager;

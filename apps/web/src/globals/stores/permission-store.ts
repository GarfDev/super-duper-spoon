import { create } from "zustand";
import PermissionManager from "~/managers/permission";

interface PermissionStoreState {
  microphone: PermissionState | null;
}

export const store = create<PermissionStoreState>(() => ({
  microphone: null,
}));

/** Actions */

export const sync = async () => {
  const permission = PermissionManager.getInstance();

  /** All Needed permissions need to check in here */
  const microphone = await permission.check("microphone");

  store.setState({
    microphone,
  });
};

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

export const Status = {
  otp: "otp",
  confirm: "confirm",
  verify: "verify",
  reset: "reset",
  none: "none",
} as const;

type StatusType = keyof typeof Status;

export type State = {
  phone: string | null;
  token: string | null;
  // status: typeof Status.none;
  status: StatusType;
};

const initialState: State = {
  phone: null,
  token: null,
  status: "none",
};

type Actions = {
  setAuth: (phone: string, token: string, status: StatusType) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: (phone, token, status) =>
        set((state) => {
          state.phone = phone;
          state.token = token;
          state.status = status;
        }),
      clearAuth: () => set(initialState),
    })),
    {
      name: "auth-credentials",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

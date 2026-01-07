import { create } from "zustand";

interface logoutState {
  logout: boolean;
  setLogout: (arg: boolean) => void;
}

export const LogoutStore = create<logoutState>((set) => ({
  logout: false,
  setLogout: (arg: boolean) => set({ logout: arg }),
}));

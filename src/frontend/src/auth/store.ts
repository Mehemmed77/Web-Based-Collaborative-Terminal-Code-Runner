import { create } from "zustand";

type AuthType = "LOGIN" | "REGISTER";

interface AuthState {
  type: AuthType;
  username: string;
  password: string;
  fullName: string;
  setType: (type: AuthType) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setFullName: (fullName: string) => void;
}

const initialState = {
  type: "LOGIN" as AuthType,
  username: "",
  password: "",
  fullName: "",
};

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setType: (type) => set({ type }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setFullName: (fullName) => set({ fullName }),
}));

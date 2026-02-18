import { create } from "zustand";

type AuthType = "LOGIN" | "REGISTER";

interface AuthState {
  type: AuthType;
  username: string;
  password: string;
  fullName: string;
  error: string | null;
  setType: (type: AuthType) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setFullName: (fullName: string) => void;
  setError: (error: string) => void;
}

const initialState = {
  type: "LOGIN" as AuthType,
  username: "",
  password: "",
  fullName: "",
  error: null,
};

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setType: (type) => set({ type }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setFullName: (fullName) => set({ fullName }),
  setError: (error) => set({ error })
}));

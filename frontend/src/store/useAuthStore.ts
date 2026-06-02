import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export interface SignupData {
  Username: string;
  Email: string;
  Password: string;
}

export interface LoginData {
  Email: string;
  Password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthStore {
  user: User | null;
  isCheckingAuth: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isCheckingAuth: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.get("/auth/check");
      set({ user: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      set({ user: response.data.user });
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data);
    }
  },
  signup: async (data) => {
    try {
      await axiosInstance.post("/auth/register", data);
    } catch (error: any) {
      console.error(error.response?.data);
      toast.error("Error signing up");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
    window.location.href = "/";
    toast.success("Logging out");
  },
}));

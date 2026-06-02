import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export interface Game {
  id: string;
  name: string;
  genre: string;
  price: number;
  releaseDate: string;
}

interface createGameData {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
}

export interface updateGameData extends createGameData {}

interface GameStore {
  myGames: Game[] | null;
  games: Game[] | null;
  game: Game | null;
  isLoading: boolean;
  isDeleting: boolean;
  isEditing: boolean;
  getGames: () => Promise<void>;
  getMyGames: () => Promise<void>;
  getGameById: (id: string) => Promise<void>;
  createGame: (game: createGameData) => Promise<void>;
  updateGame: (game: updateGameData, id: string) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
}

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  games: [],
  myGames: [],
  isLoading: false,
  isDeleting: false,
  isEditing: false,

  getGames: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/games");
      set({ games: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getMyGames: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/games/my-games");
      set({ myGames: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getGameById: async (id) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(`/games/${id}`);
      set({ game: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  createGame: async (game) => {
    try {
      await axiosInstance.post("/games", game);
      toast.success("Game created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error creating game");
    }
  },

  updateGame: async (game, id) => {
    try {
      const response = await axiosInstance.put(`/games/${id}`, game);
      set({ game: response.data });
      toast.success("Game updated successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data);
    }
  },
  deleteGame: async (id) => {
    try {
      set({ isDeleting: true });
      await axiosInstance.delete(`/games/${id}`);
      set((state) => ({
        myGames: state.myGames?.filter((game) => game.id !== id),
      }));
      toast.success("Game deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting game");
    } finally {
      set({ isDeleting: false });
    }
  },
}));

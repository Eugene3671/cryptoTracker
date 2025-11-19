import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favorites: string[];
  setFavorites: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      setFavorites: (id) => {
        const { favorites } = get();
        const update = favorites.includes(id)
          ? favorites.filter((favId) => favId !== id)
          : [...favorites, id];
        set({ favorites: update });
      },
    }),
    {
      name: "favoritesCoins",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

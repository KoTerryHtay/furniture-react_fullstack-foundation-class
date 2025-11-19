import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface FilterState {
  categories: string[];
  types: string[];
}

interface FilterActions {
  addFilter: (categories?: string[], types?: string[]) => void;
}

const initialState: FilterState = { categories: [], types: [] };

export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    immer((set) => ({
      ...initialState,
      addFilter: (categories, types) =>
        set({ categories: categories ?? [], types: types ?? [] }),
    })),
    { name: "filter-storage", storage: createJSONStorage(() => localStorage) },
  ),
);

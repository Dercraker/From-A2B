import { useMap } from "@vis.gl/react-google-maps";
import { create } from "zustand";

type MapStore = {
  map: google.maps.Map | null;
  SetMap: () => void;
};

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  SetMap() {
    set({ map: useMap() });
  },
}));

import { create } from "zustand";
import Store, { stages } from "./types";

const useCollage = create<Store>((set) => ({
  collageIndex: 0,
  selectedType: "Note",
  selectedTiles: [],
  selectedSection: null,
  expandedSection: null,
  draggedSection: null,
  selection: null,
  isOnBoard: false,
  set,
}));

export default useCollage;

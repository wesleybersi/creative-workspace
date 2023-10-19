import Crop from "./data/crops/crop";
import Client from "./data/client";
import Tile from "./data/tile";
import Section, { SectionType } from "./data/section";

interface Store {
  client: Client;
  toolTip: string;
  isMouseDown: boolean;
  newestSection: Section | null;
  newCollage: () => void;
  newSection: (
    index: number,
    tiles: Tile[],
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) => void;
  clearSection: (collageIndex: number, section: Section) => void;
  clearAllSections: (collageIndex: number) => void;
  expandCollage: (collageIndex: number) => void;
  setSectionImage: (section: Section, file: File | null) => void;
  setSectionType: (section: Section, type: SectionType) => void;
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}

export default Store;

export type InventoryItem = Crop;

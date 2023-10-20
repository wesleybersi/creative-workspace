import Client from "./data/client";
import Section, { SectionType } from "./data/section";

interface Store {
  client: Client;
  toolTip: string;
  mode: "Interact" | "Edit";
  isMouseDown: boolean;
  newestSection: Section | null;
  newCollage: () => void;
  newSection: (
    index: number,
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) => void;
  clearSection: (collageIndex: number, sectionId: string) => void;
  clearAllSections: (collageIndex: number) => void;
  expandCollage: (collageIndex: number) => void;
  expandSection: (
    collageIndex: number,
    sectionId: string,
    direction: "in" | "out",
    handle: "tl" | "tr" | "tc" | "bc" | "bl" | "br" | "cl" | "cr"
  ) => void;
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

import Board from "./data/board";
import Client from "./data/client";
import Section, { SectionType } from "./data/section";

interface Store {
  client: Client;
  boards: Board[];
  toolTip: string;
  mode: "Interact" | "Edit";
  isMouseDown: boolean;
  newestSectionId: string | null;

  //Boards
  newBoard: () => void;
  expandBoard: (boardId: string) => void;

  //Sections
  newSection: (
    boardId: string,
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) => void;
  deleteSection: (boardId: string, sectionId: string) => void;
  expandSection: (
    boardId: string,
    sectionId: string,
    direction: "in" | "out",
    handle: "tl" | "tr" | "tc" | "bc" | "bl" | "br" | "cl" | "cr"
  ) => void;
  updateSection: (
    boardId: string,
    sectionId: string,
    updateCallback: (section: Section) => Section
  ) => void;

  //Set
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void;
}

export default Store;

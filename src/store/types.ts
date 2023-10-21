import Board from "./data/board";
import Client from "./data/client";
import Section, { SectionType } from "./data/section";
import Tile from "./data/tile";

interface Store {
  client: Client;
  boards: Board[];

  toolTip: string;
  cursor: string;
  mode: "Interact" | "Edit";
  isMouseDown: boolean;
  isEditingSection: boolean;
  newestSectionId: string | null;
  selection: Selection | null;
  selectedType: SectionType | null;
  selectedTiles: Tile[];
  selectedSection: Section | null;
  cellSize: number;
  //Boards
  newBoard: () => void;
  expandBoard: (boardId: string) => void;

  //Areas
  newArea: (
    boardId: string,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) => void;

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
  setNewSectionPosition: (
    boardId: string,
    sectionId: string,
    target: { row: number; col: number }
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

export type Selection = {
  row: { start: number; end: number };
  col: { start: number; end: number };
};

export type Tool = "Pointer" | "Move";

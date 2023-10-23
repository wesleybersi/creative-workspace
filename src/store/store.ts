import { create } from "zustand";
import Store from "./types";
import Board from "./data/board";
import Client from "./data/client";
import Section, { SectionType } from "./data/section";
import Tile from "./data/tile";
import { updateSectionInBoard } from "./utilities";
import Carousel from "./data/carousel";
import { getColor } from "../utils/helper-functions";

const useStore = create<Store>((set) => ({
  client: new Client("Joanna Lee"),
  boards: [],
  toolTip: "",
  cursor: "",
  mode: "Edit",
  isEditingSection: false,
  isMouseDown: false,
  newestSectionId: "",
  selectedType: null,
  selectedTiles: [],
  selectedPage: null,
  selectedSection: null,
  selection: null,
  cellSize: 0,
  newBoard: () =>
    set((state) => {
      const board = new Board(state.client.name + "'s collage", {
        rows: 16,
        cols: 32,
      });
      return {
        boards: [...state.boards, board],
      };
    }),
  newArea: (
    boardId: string,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) =>
    set((state) => {
      const boards = [...state.boards];
      const boardIndex = boards.findIndex((b) => b.id === boardId);
      const board = { ...state.boards[boardIndex] };
      const tiles = [...board.tiles];
      const startRow = Math.min(position.row.start, position.row.end);
      const endRow = Math.max(position.row.start, position.row.end);
      const startCol = Math.min(position.col.start, position.col.end);
      const endCol = Math.max(position.col.start, position.col.end);

      const sectionPosition = {
        row: { start: startRow + 1, end: endRow + 2 },
        col: { start: startCol + 1, end: endCol + 2 },
      };
      const size = { rows: endRow - startRow + 1, cols: endCol - startCol + 1 };
      const area = new Carousel(board.id, sectionPosition, size);
      board.areas.push(area);

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= area.position.col.start - 1 &&
            tile.col < area.position.col.end - 1 &&
            tile.row >= area.position.row.start - 1 &&
            tile.row < area.position.row.end - 1
          ) {
            tile.carousel = area.id;
          }
        }
      }

      // const areaColors = ["#288AF6", "#3FAF97", "#FA4554", "#FFC055"];
      // area.color = areaColors[Math.floor(Math.random() * areaColors.length)];
      // area.color = "#eEeFf";
      // area.color = "#288AF6";
      return { boards };
    }),
  newSection: (
    boardId: string,
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    },
    carouselId?: string,
    carouselSlide?: number
  ) =>
    set((state) => {
      console.log("CAROUSEL ID:", carouselId);
      console.log("CAROUSEL SLIDE:", carouselSlide);
      const boards = [...state.boards];
      const boardIndex = boards.findIndex((b) => b.id === boardId);
      const board = { ...state.boards[boardIndex] };
      const tiles = [...board.tiles];
      const startRow = Math.min(position.row.start, position.row.end);
      const endRow = Math.max(position.row.start, position.row.end);
      const startCol = Math.min(position.col.start, position.col.end);
      const endCol = Math.max(position.col.start, position.col.end);

      const sectionPosition = {
        row: { start: startRow + 1, end: endRow + 2 },
        col: { start: startCol + 1, end: endCol + 2 },
      };

      const size = { rows: endRow - startRow + 1, cols: endCol - startCol + 1 };
      const section = new Section(board.id, type, sectionPosition, size);

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= section.position.col.start - 1 &&
            tile.col < section.position.col.end - 1 &&
            tile.row >= section.position.row.start - 1 &&
            tile.row < section.position.row.end - 1
          ) {
            tile.section = section.id;
          }
        }
      }

      board.tiles = tiles;

      if (!carouselId) {
        board.sections.push(section);
      } else {
        //ANCHOR Add section to carousel
        if (carouselSlide !== undefined) {
          const carousels = [...board.areas];
          const carouselIndex = carousels.findIndex((c) => c.id === carouselId);
          const carousel = { ...carousels[carouselIndex] };

          carousel.slides[carouselSlide].push(section);
          carousels[carouselIndex] = carousel;
          board.areas = carousels;
          section.carouselId = carouselId;
        }
      }

      if (type === "Note") {
        const noteColors = ["#D9F0FF", "#CDF1CC", "#FFE9D9", "#F6F5BC"];
        section.color =
          noteColors[Math.floor(Math.random() * noteColors.length)];
      } else if (type === "Emoji") {
        section.color = "transparent";
      } else if (type === "Color") {
        section.color = getColor();
      } else if (type !== "Empty Page") {
        section.color = "transparent";
      }

      console.log("New section!");
      console.log(section);

      return { boards, newestSectionId: section.id };
    }),
  copySection: (
    boardId: string,
    sectionId: string,
    updateCallback: (section: Section) => Section
  ) =>
    set((state) => {
      const updatedBoards = updateSectionInBoard(
        state.boards,
        boardId,
        sectionId,
        (section) => {
          return section;
        }
      );

      return { boards: updatedBoards };
    }),
  expandSection: (boardId, sectionId, direction, handle) =>
    set((state) => {
      const boards = [...state.boards];
      const boardIndex = boards.findIndex((b) => b.id === boardId);
      const board = { ...boards[boardIndex] };
      const sections = [...board.sections];
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex < 0) return {};
      const section = { ...sections[sectionIndex] };

      const row = { ...section.position.row };
      const col = { ...section.position.col };
      const size = { ...section.size };

      switch (handle) {
        case "tl":
          if (direction === "out") {
            col.start--;
            row.start--;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            col.start++;
            row.start++;
            size.rows--;
            size.cols--;
          }
          break;
        case "tc":
          if (direction === "out") {
            row.start--;
            size.rows++;
          } else if (direction === "in") {
            row.start++;
            size.rows--;
          }
          break;
        case "tr":
          if (direction === "out") {
            row.start--;
            col.end++;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            row.start++;
            col.end--;
            size.rows--;
            size.cols--;
          }
          break;
        case "cl":
          if (direction === "out") {
            col.start--;
            size.cols++;
          } else if (direction === "in") {
            col.start++;
            size.cols--;
          }
          break;
        case "bl":
          if (direction === "out") {
            col.start--;
            row.end++;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            col.start++;
            row.end--;
            size.rows--;
            size.cols--;
          }
          break;
        case "bc":
          if (direction === "out") {
            size.rows++;
            row.end++;
          } else if (direction === "in") {
            size.rows--;
            row.end--;
          }
          break;
        case "br":
          if (direction === "out") {
            row.end++;
            col.end++;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            row.end--;
            col.end--;
            size.rows--;
            size.cols--;
          }
          break;
        case "cr":
          if (direction === "out") {
            size.cols++;
            col.end++;
          } else if (direction === "in") {
            size.cols--;
            col.end--;
          }
          break;
      }

      if (size.cols <= 0 || size.rows <= 0) return {};
      if (row.end <= 0) return {};
      if (col.end <= 0) return {};
      if (row.end <= row.start) return {};
      if (col.end <= col.start) return {};
      if (row.start < 0) return {};
      if (col.start < 0) return {};
      if (row.end - 1 > board.size.rows) return {};
      if (col.end - 1 > board.size.cols) return {};
      if (col.end <= col.start) return {};

      section.position = { row, col };
      section.size = size;

      const tiles = [...board.tiles];

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= section.position.col.start - 1 &&
            tile.col < section.position.col.end - 1 &&
            tile.row >= section.position.row.start - 1 &&
            tile.row < section.position.row.end - 1
          ) {
            tile.section = section.id;
          } else {
            if (tile.section === section.id) {
              tile.section = "";
            }
          }
        }
      }
      board.tiles = tiles;

      sections[sectionIndex] = section;
      board.sections = sections;
      boards[boardIndex] = board;

      return { boards };
    }),
  expandBoard: (boardId: string) =>
    set((state) => {
      const boards = [...state.boards];
      const boardIndex = boards.findIndex((b) => b.id === boardId);
      const expandedCollage = { ...boards[boardIndex] };
      expandedCollage.size.rows++;

      const y = expandedCollage.size.rows - 1;

      const extraTiles = Array.from({ length: expandedCollage.size.cols }).map(
        (_, x) =>
          new Tile(expandedCollage, y * expandedCollage.size.cols + x, y, x)
      );
      expandedCollage.tiles.push(extraTiles);

      return { boards };
    }),
  deleteSection: (boardId, sectionId) =>
    set((state) => {
      const boards = [...state.boards];
      const boardIndex = boards.findIndex((b) => b.id === boardId);
      const board = { ...boards[boardIndex] };
      const sections = [...board.sections];
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      const section = { ...sections[sectionIndex] };
      if (sectionIndex < 0) return {};

      const tiles = [...board.tiles];

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= section.position.col.start - 1 &&
            tile.col < section.position.col.end - 1 &&
            tile.row >= section.position.row.start - 1 &&
            tile.row < section.position.row.end - 1
          ) {
            tile.section = "";
          }
        }
      }
      board.tiles = tiles;
      board.sections.splice(sectionIndex, 1);

      return { boards };
    }),

  setNewSectionPosition: (
    boardId: string,
    sectionId: string,
    target: { row: number; col: number }
  ) => {
    set((state) => {
      const updatedBoards = updateSectionInBoard(
        state.boards,
        boardId,
        sectionId,
        (section) => {
          const position = {
            row: { ...section.position.row },
            col: { ...section.position.col },
          };

          const rowDiff = position.row.start - target.row;
          const colDiff = position.col.start - target.col;

          position.row.start = position.row.start - rowDiff;
          position.col.start = position.col.start - colDiff;
          position.row.end = position.row.end - rowDiff;
          position.col.end = position.col.end - colDiff;

          section.position = { ...position };
          return section;
        }
      );
      return { boards: updatedBoards };
    });
  },
  updateSection: (
    boardId: string,
    sectionId: string,
    updateCallback: (section: Section) => Section
  ) =>
    set((state) => {
      const updatedBoards = updateSectionInBoard(
        state.boards,
        boardId,
        sectionId,
        updateCallback
      );
      return { boards: updatedBoards };
    }),

  set,
}));

export default useStore;

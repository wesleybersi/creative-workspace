import { create } from "zustand";
import Store from "./types";
import Collage from "./data/collage";
import Client from "./data/client";
import Section, { SectionType } from "./data/section";
import Tile from "./data/tile";

const useStore = create<Store>((set) => ({
  client: new Client("Joanna Lee"),
  toolTip: "",
  mode: "Edit",
  isMouseDown: false,
  newestSection: null,
  newCollage: () =>
    set((state) => {
      const client = { ...state.client };
      client.collages.push(
        new Collage(state.client.name + "'s collage", {
          rows: 14,
          cols: 28,
        })
      );
      return {
        client,
      };
    }),
  newSection: (
    index: number,
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) =>
    set((state) => {
      const client = { ...state.client };
      const collage = { ...client.collages[index] };
      const tiles = [...collage.tiles];

      const startRow = Math.min(position.row.start, position.row.end);
      const endRow = Math.max(position.row.start, position.row.end);
      const startCol = Math.min(position.col.start, position.col.end);
      const endCol = Math.max(position.col.start, position.col.end);

      const sectionPosition = {
        row: { start: startRow + 1, end: endRow + 2 },
        col: { start: startCol + 1, end: endCol + 2 },
      };
      const size = { rows: endRow - startRow + 1, cols: endCol - startCol + 1 };
      const section = new Section(collage, type, sectionPosition, size);

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= section.position.col.start &&
            tile.col < section.position.col.end - 1 &&
            tile.row >= section.position.row.start &&
            tile.row < section.position.row.end - 1
          ) {
            if (tile.section && tile.section !== section.id) return {};
            tile.section = section.id;
          }
        }
      }
      collage.tiles = tiles;
      collage.sections.push(section);

      if (type === "Note") {
        const noteColors = ["#D9F0FF", "#CDF1CC", "#FFE9D9", "#F6F5BC"];
        section.color =
          noteColors[Math.floor(Math.random() * noteColors.length)];
      }
      return { client, newestSection: section };
    }),
  expandSection: (collageIndex, sectionId, direction, handle) =>
    set((state) => {
      const client = { ...state.client };
      const collage = { ...client.collages[collageIndex] };
      const sections = [...collage.sections];
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex < 0) return {};
      const section = { ...sections[sectionIndex] };

      const position = section.position;
      const size = section.size;

      switch (handle) {
        case "tl":
          if (direction === "out") {
            position.col.start--;
            position.row.start--;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            position.col.start++;
            position.row.start++;
            size.rows--;
            size.cols--;
          }
          break;
        case "tc":
          if (direction === "out") {
            position.row.start--;
            size.rows++;
          } else if (direction === "in") {
            position.row.start++;
            size.rows--;
          }
          break;
        case "tr":
          console.log("Initial size", size);
          if (direction === "out") {
            position.row.start--;
            position.col.end++;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            position.row.start++;
            position.col.end--;
            size.rows--;
            size.cols--;
          }
          break;
        case "cl":
          if (direction === "out") {
            position.col.start--;
            size.cols++;
          } else if (direction === "in") {
            position.col.start++;
            size.cols--;
          }
          break;
        case "bl":
          if (direction === "out") {
            position.col.start--;
            position.row.end++;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            position.col.start++;
            position.row.end--;
            size.rows--;
            size.cols--;
          }
          break;
        case "bc":
          if (direction === "out") {
            size.rows++;
            position.row.end++;
          } else if (direction === "in") {
            size.rows--;
            position.row.end--;
          }
          break;
        case "br":
          if (direction === "out") {
            position.row.end++;
            position.col.end++;
            size.rows++;
            size.cols++;
          } else if (direction === "in") {
            position.row.end--;
            position.col.end--;
            size.rows--;
            size.cols--;
          }
          break;
        case "cr":
          if (direction === "out") {
            size.cols++;
            position.col.end++;
          } else if (direction === "in") {
            size.cols--;
            position.col.end--;
          }
          break;
      }

      const tiles = [...collage.tiles];

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= section.position.col.start &&
            tile.col < section.position.col.end - 1 &&
            tile.row >= section.position.row.start &&
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
      collage.tiles = tiles;

      sections[sectionIndex] = section;
      collage.sections = sections;
      client.collages[collageIndex] = collage;

      return { client };
    }),
  expandCollage: (collageIndex: number) =>
    set((state) => {
      const client = { ...state.client };
      const expandedCollage = { ...client.collages[collageIndex] };
      expandedCollage.size.rows++;

      const y = expandedCollage.size.rows - 1;

      const extraTiles = Array.from({ length: expandedCollage.size.cols }).map(
        (_, x) =>
          new Tile(expandedCollage, y * expandedCollage.size.cols + x, y, x)
      );
      expandedCollage.tiles.push(extraTiles);

      return { client };
    }),
  clearSection: (collageIndex, sectionId) =>
    set((state) => {
      const client = { ...state.client };
      const collage = { ...client.collages[collageIndex] };
      const sections = [...collage.sections];
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      const section = { ...sections[sectionIndex] };
      if (sectionIndex < 0) return {};

      const tiles = [...collage.tiles];

      for (const row of tiles) {
        for (const tile of row) {
          if (
            tile.col >= section.position.col.start &&
            tile.col < section.position.col.end - 1 &&
            tile.row >= section.position.row.start &&
            tile.row < section.position.row.end - 1
          ) {
            tile.section = "";
          }
        }
      }
      collage.tiles = tiles;
      collage.sections.splice(sectionIndex, 1);

      return { client };
    }),
  clearAllSections: (collageIndex: number) =>
    set((state) => {
      const client = { ...state.client };
      const collage = client.collages[collageIndex];

      for (const tile of collage.tiles.flat()) {
        tile.section = "";
      }

      collage.sections = [];

      return { client };
    }),
  setSectionType: (section: Section, type: SectionType) =>
    set(() => {
      section.type = type;
      switch (section.type) {
        case "Note":
        case "Image":
        case "Empty":
          section.color = "white";
          break;
      }
      return {};
    }),
  setSectionImage: (section: Section, file: File | null) =>
    set(() => {
      section.image = file;
      return {};
    }),
  setSectionText: (section: Section, text: string[]) =>
    set(() => {
      section.text = text;
      return {};
    }),

  set,
}));

export default useStore;

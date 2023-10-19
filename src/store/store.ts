import { create } from "zustand";
import Store from "./types";
import Collage from "./data/collage";
import Client from "./data/client";
import Section, { SectionType } from "./data/section";
import Tile from "./data/tile";

const useStore = create<Store>((set) => ({
  client: new Client("Joanna Lee"),
  toolTip: "",
  isMouseDown: false,
  newestSection: null,
  newCollage: () =>
    set((state) => {
      const client = { ...state.client };
      client.collages.push(
        new Collage(state.client.name + "'s collage", {
          rows: 32,
          cols: 12,
        })
      );
      return {
        client,
      };
    }),
  newSection: (
    index: number,
    tiles: Tile[],
    type: SectionType,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    }
  ) =>
    set((state) => {
      const obstructed = tiles.some((tile) => tile.section);
      if (obstructed) {
        console.warn("Section is overlapping");
        return {};
      }

      const client = { ...state.client };
      const collage = client.collages[index];

      const startRow = Math.min(position.row.start, position.row.end);
      const endRow = Math.max(position.row.start, position.row.end);
      const startCol = Math.min(position.col.start, position.col.end);
      const endCol = Math.max(position.col.start, position.col.end);

      const sectionPosition = {
        row: { start: startRow + 1, end: endRow + 2 },
        col: { start: startCol + 1, end: endCol + 2 },
      };

      const section = new Section(collage, tiles, type, sectionPosition);
      collage.sections.push(section);

      for (const tile of tiles) {
        tile.section = section;
      }
      console.log("New section:", section);
      console.log("collage", collage);

      if (type === "Note") {
        // section.color = "#f6f5bc";
        section.randomNoteColor();
      }
      return { client, newestSection: section };
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
  clearSection: (collageIndex: number, section: Section) =>
    set((state) => {
      const client = { ...state.client };
      const collage = client.collages[collageIndex];

      const sectionIndex = collage.sections.indexOf(section);

      collage.sections.splice(sectionIndex, 1);
      for (const tile of section.tiles) {
        tile.section = null;
      }
      section.tiles = [];

      return { client };
    }),
  clearAllSections: (collageIndex: number) =>
    set((state) => {
      const client = { ...state.client };
      const collage = client.collages[collageIndex];

      for (const tile of collage.tiles.flat()) {
        tile.section = null;
      }
      for (const section of collage.sections) {
        section.tiles = [];
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

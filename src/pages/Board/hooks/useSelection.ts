import { useEffect } from "react";
import { Selection } from "../local-store/types";
import Board from "../../../store/data/board";
import useCollage from "../local-store/useCollage";

export default function useSelection(
  selection: Selection | null,
  collage: Board
) {
  const { set } = useCollage();

  useEffect(() => {
    if (selection === null) {
      set({ selectedTiles: [] });
    } else {
      const selectedTilesArray: { row: number; col: number }[] = [];
      const startRow = Math.min(selection.row.start, selection.row.end);
      const endRow = Math.max(selection.row.start, selection.row.end);
      const startCol = Math.min(selection.col.start, selection.col.end);
      const endCol = Math.max(selection.col.start, selection.col.end);

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          selectedTilesArray.push({ row, col });
        }
      }
      const selectedTiles = [];
      for (const vector of selectedTilesArray) {
        selectedTiles.push(collage.tiles[vector.row][vector.col]);
      }

      set({ selectedTiles });
    }
  }, [set, selection, collage.tiles]);
}

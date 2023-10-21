import { useEffect } from "react";

import Board from "../../../store/data/board";
import useStore from "../../../store/store";
import { Selection } from "../../../store/types";

export default function useSelection(
  selection: Selection | null,
  board: Board
) {
  const { set } = useStore();

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
        selectedTiles.push(board.tiles[vector.row][vector.col]);
      }

      set({ selectedTiles });
    }
  }, [set, selection, board.tiles]);
}

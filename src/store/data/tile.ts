import Board from "./board";

export default class Tile {
  index: number;
  row: number;
  col: number;
  collage = "";
  section = "";
  opacity = 1;
  cornerPiece?: "tl" | "tr" | "bl" | "br";
  constructor(collage: Board, index: number, row: number, col: number) {
    this.index = index;
    this.row = row;
    this.col = col;
    this.collage = collage.id;
  }
}

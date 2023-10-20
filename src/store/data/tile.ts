import Collage from "./collage";

export default class Tile {
  index: number;
  row: number;
  col: number;
  collage: Collage;
  section = "";
  opacity = 1;
  cornerPiece?: "tl" | "tr" | "bl" | "br";
  constructor(collage: Collage, index: number, row: number, col: number) {
    this.index = index;
    this.row = row;
    this.col = col;
    this.collage = collage;
  }
}

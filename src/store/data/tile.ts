import Crop from "./crops/crop";
import crops, { returnCropByName } from "./crops/all-crops";
import Collage from "./collage";
import { oneIn } from "../../utils/helper-functions";
import Section from "./section";

export default class Tile {
  index: number;
  row: number;
  col: number;
  collage: Collage;
  section: Section | null = null;
  opacity = Math.random() * 0.2 + 0.8;
  cornerPiece?: "tl" | "tr" | "bl" | "br";
  constructor(collage: Collage, index: number, row: number, col: number) {
    this.index = index;
    this.row = row;
    this.col = col;
    this.collage = collage;
  }
}

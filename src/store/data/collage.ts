import { oneIn } from "../../utils/helper-functions";
import Section from "./section";
import Tile from "./tile";

export default class Collage {
  name = "";
  target = "";
  size: { rows: number; cols: number };
  tiles: Tile[][];
  sections: Section[] = [];
  description: string[] = [];
  isFilled = false;
  isPublished = false;
  constructor(name: string, size: { rows: number; cols: number }) {
    this.name = name;
    this.size = size;
    this.tiles = Array.from({ length: size.rows }).map((_, y) =>
      Array.from({ length: size.cols }).map(
        (_, x) => new Tile(this, y * size.cols + x, y, x)
      )
    );
  }
}

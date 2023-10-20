import Section from "./section";
import Tile from "./tile";

export default class Board {
  id: string;
  target = "";
  size: { rows: number; cols: number };
  tiles: Tile[][];
  sections: Section[] = [];
  name = "";
  description: string[] = [];
  constructor(name: string, size: { rows: number; cols: number }) {
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
    this.id = uniqueId;
    this.name = name;
    this.size = size;
    this.tiles = Array.from({ length: size.rows }).map((_, y) =>
      Array.from({ length: size.cols }).map(
        (_, x) => new Tile(this, y * size.cols + x, y, x)
      )
    );
  }
}

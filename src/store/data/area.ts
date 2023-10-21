import { getColor } from "../../utils/helper-functions";
import Area from "./section";

export default class Area {
  id: string;
  boardId: string;
  created: { at: number; by: string } | null = null;
  lastEdited: { at: number; by: string } | null = null;
  size: { rows: number; cols: number };
  position: {
    row: { start: number; end: number };
    col: { start: number; end: number };
  };
  color = getColor();
  image: File | null = null;
  text: string[] = [];
  isValid = false;
  depth = 1;
  tabs: Set<Area>[] = [];
  constructor(
    boardId: string,
    position: {
      row: { start: number; end: number };
      col: { start: number; end: number };
    },
    size: {
      rows: number;
      cols: number;
    }
  ) {
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
    this.id = uniqueId;
    this.boardId = boardId;
    this.position = position;
    this.size = size;
    this.created = { at: Date.now(), by: "Wesley" };
  }
}

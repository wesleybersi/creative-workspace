export default class Page {
  id: string;
  boardId: string;
  created: { at: number; by: string } | null = null;
  lastEdited: { at: number; by: string } | null = null;
  size: { rows: number; cols: number };
  position: {
    row: { start: number; end: number };
    col: { start: number; end: number };
  };
  color = "white";
  image: File | null = null;
  text: string[] = [];
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

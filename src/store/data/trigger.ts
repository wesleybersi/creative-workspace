// export default class Section {
//   id: string;
//   boardId: string;
//   created: { at: number; by: string } | null = null;
//   lastEdited: { at: number; by: string } | null = null;
//   type: SectionType = "Empty";
//   size: { rows: number; cols: number };
//   position: {
//     row: { start: number; end: number };
//     col: { start: number; end: number };
//   };
//   color = "white";
//   image: File | null = null;
//   text: string[] = [];
//   isValid = false;
//   depth = 1;
//   pages: Section[][] = [[]];
//   constructor(
//     boardId: string,
//     type: SectionType,
//     position: {
//       row: { start: number; end: number };
//       col: { start: number; end: number };
//     },
//     size: {
//       rows: number;
//       cols: number;
//     }
//   ) {
//     const timestamp = new Date().getTime();
//     const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
//     this.id = uniqueId;
//     this.boardId = boardId;
//     this.type = type;
//     this.position = position;
//     this.size = size;
//     this.created = { at: Date.now(), by: "Wesley" };
//   }
// }

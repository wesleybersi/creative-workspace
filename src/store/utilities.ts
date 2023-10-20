import Board from "./data/board";
import Section from "./data/section";

export function updateSectionInBoard(
  boards: Board[],
  boardId: string,
  sectionId: string,
  updater: (section: Section) => Section
): Board[] {
  const updatedBoards = [...boards];
  const boardIndex = updatedBoards.findIndex((b) => b.id === boardId);
  const board = { ...updatedBoards[boardIndex] };
  const updatedSections = board.sections.map((section) => {
    if (section.id === sectionId) {
      return updater({ ...section });
    }
    return section;
  });

  board.sections = updatedSections;
  updatedBoards[boardIndex] = board;
  return updatedBoards;
}

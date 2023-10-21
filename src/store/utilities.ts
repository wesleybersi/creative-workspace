import Board from "./data/board";
import Area from "./data/section";

export function updateSectionInBoard(
  boards: Board[],
  boardId: string,
  sectionId: string,
  updater: (section: Area) => Area
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
export function duplicateSectionInBoard(
  boards: Board[],
  boardId: string,
  sectionId: string,
  updater: (section: Area) => Area
): Board[] {
  const updatedBoards = [...boards];
  const boardIndex = updatedBoards.findIndex((b) => b.id === boardId);
  const board = { ...updatedBoards[boardIndex] };

  const updatedSections = board.sections.map((section) => {
    if (section.id === sectionId) {
      const copyOfSection: Area = JSON.parse(JSON.stringify(section));
      const timestamp = new Date().getTime();
      const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
      copyOfSection.id = uniqueId;
      updatedSections.push(copyOfSection);
      return updater({ ...copyOfSection });
    }
    return section;
  });

  board.sections = updatedSections;
  updatedBoards[boardIndex] = board;
  return updatedBoards;
}

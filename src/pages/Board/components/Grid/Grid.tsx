import styles from "./grid.module.scss";
import Board from "../../../../store/data/board";
import useCollage from "../../local-store/useCollage";
import useStore from "../../../../store/store";
import { useEffect, useRef, useState } from "react";
import GridSection from "./components/GridSection/GridSection";
import Section from "../../../../store/data/section";

interface Props {
  board: Board;
}

const Grid: React.FC<Props> = ({ board }) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { newSection, isMouseDown, mode } = useStore();
  const { size } = board;
  const {
    set,
    selection,
    selectedTiles,
    expandedSection,
    selectedType,
    draggedSection,
    selectedSection,
  } = useCollage();
  const [preview] = useState<boolean>(false);

  const [sectionPositions, setSectionPositions] = useState<
    {
      section: Section;
      x: number;
      y: number;
      width: number;
      height: number;
    }[]
  >([]);

  const [draggedDim, setDraggedDim] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (draggedSection !== null && draggedDim === null) {
      const children = sectionRef.current.children;
      const child = children[draggedSection] as HTMLElement;
      const childRect = child.getBoundingClientRect();

      setDraggedDim({
        width: child.offsetWidth,
        height: child.offsetHeight,
        x: 0,
        y: 0,
        offsetX: childRect.left,
        offsetY: childRect.top,
      });
    } else {
      setDraggedDim(null);
    }
  }, [draggedSection, sectionRef]);

  useEffect(() => {
    function mouseMove(event: MouseEvent) {
      const x = event.clientX;
      const y = event.clientY;

      setDraggedDim(
        (prev) =>
          prev && {
            ...prev,
            x,
            y,
          }
      );
    }

    if (draggedDim) window.addEventListener("mousemove", mouseMove);
  }, [draggedDim]);

  useEffect(() => {
    if (!isMouseDown && selection && selectedType) {
      newSection(board.id, selectedType, selection);
      set({ selection: null, selectedSection: null });
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (!gridRef.current) return;
    setSectionPositions([]);
    for (const section of board.sections) {
      const firstIndex =
        section.position.row.start * board.size.rows +
        section.position.col.start;
      const lastIndex =
        section.position.row.end -
        1 * board.size.rows +
        section.position.col.end -
        1;

      const firstTile = gridRef.current.children[firstIndex] as HTMLElement;
      const lastTile = gridRef.current.children[lastIndex] as HTMLElement;
      if (!firstTile || !lastTile) continue;

      const x = firstTile.offsetLeft;
      const y = firstTile.offsetTop;
      const width = lastTile.offsetLeft + lastTile.offsetWidth - x;
      const height = lastTile.offsetTop + lastTile.offsetHeight - y;

      setSectionPositions((prev) => [
        ...prev,
        {
          section,
          x,
          y,
          width,
          height,
        },
      ]);
    }
  }, [gridRef, board.sections, board.sections.length]);

  return (
    <>
      <div
        className={styles.wrapper}
        onContextMenu={(event) => {
          event?.preventDefault();
          set({ selectedSection: null });
        }}
      >
        <section
          className={styles.grid}
          ref={gridRef}
          style={{
            gridTemplateColumns: `repeat(${size.cols},1fr)`,

            opacity: expandedSection ? 0 : 1,
          }}
          onMouseEnter={() => set({ isOnBoard: true })}
          onMouseLeave={() => set({ isOnBoard: false })}
        >
          {board.tiles.map((row, y) =>
            row.map((tile, x) => {
              return (
                <div
                  className={`${styles.cell} ${
                    selection && selectedTiles.includes(tile)
                      ? styles.selected
                      : ""
                  }`}
                  style={{
                    opacity: preview || mode === "Interact" ? 0 : tile.opacity,
                  }}
                  onClick={() => console.log("click")}
                  onDoubleClick={() => console.log("double click")}
                  onMouseDown={() => {
                    if (!selection && selectedType) {
                      set({
                        selection: {
                          row: { start: y, end: y },
                          col: { start: x, end: x },
                        },
                      });
                    } else {
                      set({ selectedSection: null });
                    }
                  }}
                  onMouseEnter={() => {
                    if (selection) {
                      set((state) =>
                        state.selection
                          ? {
                              selection: {
                                row: {
                                  start: state.selection.row.start,
                                  end: y,
                                },
                                col: {
                                  start: state.selection.col.start,
                                  end: x,
                                },
                              },
                            }
                          : {}
                      );
                    }
                  }}
                >
                  {/* <p>{tile.index}</p> */}
                  {/* {selectedTiles.includes(tile) && <p>!</p>} */}
                </div>
              );
            })
          )}
        </section>
        <section
          ref={sectionRef}
          className={styles.sections}
          style={{
            gridTemplateColumns: `repeat(${size.cols},1fr)`,
            gridTemplateRows: `repeat(${size.rows},1fr)`,
          }}
        >
          {sectionPositions.map(({ section }, index) => (
            <GridSection
              section={section}
              dragIndex={index}
              dragDim={
                index === draggedSection && draggedDim && draggedDim.x > 0
                  ? {
                      width: draggedDim.width,
                      height: draggedDim.height,
                      x: draggedDim.x - draggedDim.offsetX,
                      y: draggedDim.y - draggedDim.offsetY,
                    }
                  : undefined
              }
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Grid;

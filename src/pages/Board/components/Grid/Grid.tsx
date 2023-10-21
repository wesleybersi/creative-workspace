import styles from "./grid.module.scss";
import Board from "../../../../store/data/board";
import useStore from "../../../../store/store";
import { useEffect, useRef, useState } from "react";
import GridSection from "./components/GridSection/GridSection";
import useWindowSize from "../../../../hooks/useWindowSize";
import GridArea from "./components/GridArea/GridArea";

interface Props {
  board: Board;
}

const Grid: React.FC<Props> = ({ board }) => {
  const [dim] = useWindowSize();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const areaRef = useRef<HTMLDivElement | null>(null);

  const [zOrder, setZOrder] = useState<string[]>([]);

  const {
    set,
    newSection,
    isMouseDown,
    mode,
    selection,
    selectedTiles,
    selectedType,
    newArea,
  } = useStore();
  const { size } = board;
  const [preview] = useState<boolean>(false);

  //Form a new section when letting go of the mouse
  useEffect(() => {
    if (!isMouseDown && selection && selectedType) {
      if (selectedType === "Area") {
        newArea(board.id, selection);
      } else {
        newSection(board.id, selectedType, selection);
      }
      set({ selection: null, selectedSection: null });
    }
  }, [isMouseDown]);

  //Set global cellsize for future reference
  useEffect(() => {
    if (!gridRef.current) return;
    const cell = gridRef.current.firstChild as HTMLElement;
    if (cell) set({ cellSize: cell.offsetWidth });
  }, [gridRef, dim.width, dim.height]);

  useEffect(() => {
    const currentOrder = [...zOrder];
    const removeIds: string[] = [];

    for (const section of board.sections) {
      if (zOrder.includes(section.id)) continue;
      currentOrder.push(section.id);
    }

    for (const id of currentOrder) {
      const index = board.sections.findIndex((s) => s.id === id);
      if (index >= 0) continue;
      else {
        removeIds.push(id);
      }
    }

    const newOrder = currentOrder.filter((id) => !removeIds.includes(id));
    setZOrder(newOrder);
  }, [board.sections.length, board.sections]);

  function bringToTop(sectionId: string) {
    setZOrder((prevOrder) => {
      const order = [...prevOrder];
      const index = order.indexOf(sectionId);
      if (index >= 0) {
        order.splice(index, 1);
        order.push(sectionId);
      }
      return order;
    });
  }

  function increaseZIndex(sectionId: string) {
    setZOrder((prevOrder) => {
      const order = [...prevOrder];
      const index = order.indexOf(sectionId);
      if (index >= 0 && index < order.length - 1) {
        order.splice(index, 1);
        const newIndex = index + 1;
        order.splice(newIndex, 0, sectionId);
      }

      return order;
    });
  }

  function decreaseZIndex(sectionId: string) {
    setZOrder((prevOrder) => {
      const order = [...prevOrder];
      const index = order.indexOf(sectionId);
      if (index >= 1) {
        order.splice(index, 1);
        const newIndex = index - 1;
        order.splice(newIndex, 0, sectionId);
      }

      return order;
    });
  }

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
          }}
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
                  <div style={{ opacity: 0.15 }}>
                    {/* <p>{tile.index}</p> */}
                    {/* <p>{tile.col}</p> */}
                    {/* <p>{tile.row}</p> */}
                  </div>
                  {/* {cellSize} */}
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
          {board.sections.map((section) => (
            <GridSection
              section={section}
              gridRef={gridRef.current}
              z={zOrder.findIndex((id) => id === section.id)}
              bringToTop={bringToTop}
              increaseZ={increaseZIndex}
              decreaseZ={decreaseZIndex}
            />
          ))}
        </section>
        <section
          ref={areaRef}
          className={styles.areas}
          style={{
            gridTemplateColumns: `repeat(${size.cols},1fr)`,
            gridTemplateRows: `repeat(${size.rows},1fr)`,
          }}
        >
          {board.areas.map((area) => (
            <GridArea area={area} gridRef={gridRef.current} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Grid;

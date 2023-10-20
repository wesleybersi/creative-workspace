import styles from "./plot.module.scss";

import Board from "../../../../../../store/data/collage";

import useCollage from "../../local-store/useCollage";
import useStore from "../../../../../../store/store";
import { useEffect, useRef, useState } from "react";
import GridSection from "./components/GridSection/GridSection";
import Section from "../../../../../../store/data/section";

interface Props {
  collage: Board;
}

const PlotGrid: React.FC<Props> = ({ collage }) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { newSection, client, isMouseDown } = useStore();
  const { size } = collage;
  const {
    set,
    selection,
    selectedTiles,
    expandedSection,
    selectedType,
    draggedSection,
    selectedSection,
  } = useCollage();
  const [preview, setPreview] = useState<boolean>(false);

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

  // const gutter = "1rem";
  const gutter = "0";
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
    if (!isMouseDown && selection && selectedType !== "None") {
      newSection(
        client.boards.indexOf(collage),
        selectedTiles,
        selectedType,
        selection
      );
      set({ selection: null });
      // set({ selectedType: "None" });
    }
  }, [isMouseDown]);

  // useEffect(() => {
  //   function keydown(event: KeyboardEvent) {
  //     if (event.key === "=") {
  //       setPreview((prev) => !prev);
  //     }
  //   }
  //   // function keyup(event: KeyboardEvent) {
  //   //   if (event.key === "=") {
  //   //     setPreview(false);
  //   //   }
  //   // }
  //   window.addEventListener("keydown", keydown);
  //   // window.addEventListener("keyup", keyup);
  //   return () => window.removeEventListener("keydown", keydown);
  // }, [preview]);

  useEffect(() => {
    if (selectedType === "None") {
      // setPreview(true);
    } else {
      setPreview(false);
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedSection) {
      set({ selectedType: "None" });
    }
  }, [selectedSection]);

  useEffect(() => {
    if (!gridRef.current) return;
    setSectionPositions([]);
    for (const section of collage.sections) {
      const lowest = section.tiles.reduce((prev, curr) =>
        prev.index < curr.index ? prev : curr
      );
      const highest = section.tiles.reduce((prev, curr) =>
        prev.index > curr.index ? prev : curr
      );

      const firstTile = gridRef.current.children[lowest.index] as HTMLElement;
      const lastTile = gridRef.current.children[highest.index] as HTMLElement;
      if (!firstTile || !lastTile) continue;

      const x = firstTile.offsetLeft;
      const y = firstTile.offsetTop;
      const width = lastTile.offsetLeft + lastTile.offsetWidth - x;
      const height = lastTile.offsetTop + lastTile.offsetHeight - y;

      const tl = lowest.index === 0;
      const tr = section.tiles.some(
        (tile) => tile.index === collage.size.cols - 1
      );
      const bl = section.tiles.some(
        (tile) =>
          tile.index ===
          collage.size.rows * collage.size.cols - collage.size.cols
      );

      const br = highest.index === collage.tiles.flat().length - 1;

      setSectionPositions((prev) => [
        ...prev,
        {
          section,
          x,
          y,
          width,
          height,
          tl,
          tr,
          bl,
          br,
        },
      ]);
    }
  }, [gridRef, collage.sections.length]);

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
            gridGap: gutter,
            opacity: expandedSection ? 0 : 1,
          }}
          onMouseEnter={() => set({ isOnBoard: true })}
          onMouseLeave={() => set({ isOnBoard: false })}
        >
          {collage.tiles.map((row, y) =>
            row.map((tile, x) => {
              return (
                <div
                  className={`${styles.cell} ${
                    selection && selectedTiles.includes(tile)
                      ? styles.selected
                      : ""
                  }`}
                  style={{
                    opacity: preview ? 0 : tile.opacity,
                  }}
                  onClick={() => console.log("click")}
                  onDoubleClick={() => console.log("double click")}
                  onMouseDown={() => {
                    if (!selection && selectedType !== "None") {
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
            gridGap: gutter,
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

        {/* {draggedDim && draggedDim.x > 0 && (
          <section
            style={{
              zIndex: 200,
              position: "absolute",
              top: draggedDim.y - draggedDim.offsetY,
              left: draggedDim.x - draggedDim.offsetX,
              background: "red",
              width: draggedDim.width,
              height: draggedDim.height,
            }}
          >
            {draggedDim.offsetX}
            {draggedDim.offsetY}
          </section>
        )} */}
      </div>
      {/* <button
        style={{
          alignSelf: "center",
          aspectRatio: 1,
        }}
        onClick={() => {
          expandCollage(client.collages.indexOf(collage));
          setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
        }}
      >
        Publish
      </button> */}
    </>
  );
};

export default PlotGrid;

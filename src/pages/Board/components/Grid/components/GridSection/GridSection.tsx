import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Section from "../../../../../../store/data/section";
import styles from "./section.module.scss";
import useCollage from "../../../../local-store/useCollage";

import useStore from "../../../../../../store/store";
import Note from "./components/Note/Note";

import Image from "./components/Image/Image";
import Text from "./components/Text/Text";
import DeleteSection from "./components/DeleteSection/DeleteSection";
import Poll from "./components/Poll/Poll";
import Heading from "./components/Heading/Heading";
import ToDo from "./components/ToDo/ToDo";
import List from "./components/List/List";
import Indexing from "./components/Indexing/Indexing";
import { PiDotsSix as IconHandle } from "react-icons/pi";
import useHandles from "./hooks/useHandles";

interface Props {
  section: Section;
  gridRef: HTMLDivElement | null;
}

const GridSection: React.FC<Props> = ({ section, gridRef }) => {
  const { set, selectedSection, collageIndex } = useCollage();
  const isSelected = selectedSection?.id === section.id;
  const { set: globalSet, isMouseDown, setNewSectionPosition } = useStore();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [handles, currentHandle, setCurrentHandle] = useHandles(
    section,
    sectionRef.current
  );

  const [selectedPage, setSelectedPage] = useState<number>(0);

  const [dragTimer, setDragTimer] = useState<number>(0);
  const [dragEvent, setDragEvent] = useState<React.MouseEvent<
    HTMLElement,
    MouseEvent
  > | null>(null);
  const [dragDim, setDragDim] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    offset: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (isMouseDown) {
      if (!dragEvent || currentHandle) return;
      if (dragTimer < 5) {
        setTimeout(() => setDragTimer((prev) => prev + 1), 10);
      } else if (dragTimer >= 5) {
        setDragTimer(0);

        if (!sectionRef.current) return;
        const rect = dragEvent.currentTarget.getBoundingClientRect();
        const sectionOffset = { x: rect.left, y: rect.top };
        const pointerOffset = {
          x: dragEvent.clientX - rect.left,
          y: dragEvent.clientY - rect.top,
        };
        setDragDim({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight,
          x: 0,
          y: 0,
          offset: {
            x: sectionOffset.x + pointerOffset.x,
            y: sectionOffset.y + pointerOffset.y,
          },
        });
        setDragEvent(null);
        globalSet({ cursor: "grab" });
      }
    } else {
      const calculateDropTarget = () => {
        if (!gridRef || !sectionRef.current) return;

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const x = sectionRect.left;
        const y = sectionRect.top;
        // Get the dimensions and position of a single grid cell
        const cellRect = (
          gridRef.firstChild as HTMLElement
        )?.getBoundingClientRect();
        const cellWidth = cellRect.width;
        const cellHeight = cellRect.height;

        // Calculate the row and column based on mouse position
        const row = Math.floor((y - gridRef.offsetTop) / cellHeight);
        const col = Math.floor((x - gridRef.offsetLeft) / cellWidth);

        setNewSectionPosition(section.boardId, section.id, {
          row: row,
          col: col - 1,
        });
      };
      if (dragDim) calculateDropTarget();
      setCurrentHandle("");
      setDragTimer(0);
      setDragEvent(null);
      setDragDim(null);
      globalSet({ cursor: "" });
    }
  }, [dragTimer, isMouseDown, dragEvent, currentHandle]);

  useEffect(() => {
    function mousemove(event: MouseEvent) {
      if (!dragDim) return;
      const x = event.clientX - dragDim.offset.x;
      const y = event.clientY - dragDim.offset.y;

      setDragDim(
        (prev) =>
          prev && {
            ...prev,
            x,
            y,
          }
      );
    }

    window.addEventListener("mousemove", mousemove);
    return () => window.removeEventListener("mousemove", mousemove);
  }, [dragDim]);

  return (
    <main
      className={styles.wrapper}
      ref={sectionRef}
      style={{
        userSelect: dragDim ? "none" : "all",
        pointerEvents: currentHandle || dragDim ? "none" : "all",
        position: dragDim ? "absolute" : "relative",
        top: dragDim ? dragDim.y : "",
        left: dragDim ? dragDim.x : "",
        width: dragDim ? dragDim.width : "",
        height: dragDim ? dragDim.height : "",
        gridColumnStart: section.position.col.start,
        gridColumnEnd: section.position.col.end,
        gridRowStart: section.position.row.start,
        gridRowEnd: section.position.row.end,

        zIndex: isSelected || dragDim ? 100 : 1,
      }}
      onMouseDown={(event) => {
        if (currentHandle || dragDim) return;
        if (dragTimer === 0) {
          setDragEvent({ ...event });
          return;
        }
      }}
      onClick={() => {
        set({ selectedSection: section });
      }}
    >
      <section
        className={styles.mainOffset}
        style={{
          backgroundColor: section.color,
          outline: isSelected
            ? `4px ${
                section.type === "Image" || section.type === "Video"
                  ? "solid"
                  : "solid"
              } var(--primary)`
            : "",
          boxShadow: dragDim ? " 6px 8px 16px 4px rgba(0, 0, 0, 0.125)" : "",
        }}
      >
        {section.type === "Image" && <Image section={section} />}
        {section.type === "Note" && <Note section={section} />}
        {section.type === "Text" && <Text section={section} />}
        {section.type === "Heading" && <Heading section={section} />}
        {section.type === "Poll" && <Poll section={section} />}
        {section.type === "To-do" && <ToDo section={section} />}
        {section.type === "List" && <List section={section} />}
        {section.type === "Indexing" && <Indexing section={section} />}

        {selectedSection?.id === section.id && (
          <>
            <div className={styles.handles}>
              {handles.map((handle) => (
                <div
                  className={styles[handle]}
                  style={
                    currentHandle === handle
                      ? { outline: "3px solid var(--primary)" }
                      : {}
                  }
                  onMouseDown={() => setCurrentHandle(handle)}
                ></div>
              ))}
            </div>
            <DeleteSection index={collageIndex} section={section} />
          </>
        )}

        <div className={styles.handle}>
          <IconHandle size="24px" />
        </div>

        {/* <div
          style={{
            userSelect: "none",
            alignSelf: "center",
            justifySelf: "center",
            display: "grid",
            placeContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {isDraggable && <p>Draggable</p>}
          {dragDim && (
            <p>
              {dragDim.x} - {dragDim.y}
            </p>
          )}
        </div> */}
      </section>
    </main>
  );
};

export default GridSection;

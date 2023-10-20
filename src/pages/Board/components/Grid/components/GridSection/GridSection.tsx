import { useEffect, useRef, useState } from "react";
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
  dragIndex: number;
  dragDim?: { width: number; height: number; x: number; y: number };
}

const GridSection: React.FC<Props> = ({ section, dragIndex, dragDim }) => {
  const { set, selectedSection, collageIndex, draggedSection } = useCollage();
  const { newestSectionId, isMouseDown: isMouseDownGlobal } = useStore();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

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

  const isSelected = selectedSection?.id === section.id;
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!isMouseDownGlobal) {
      setIsMouseDown(false);
      setCurrentHandle("");
    }
  }, [isMouseDownGlobal]);

  useEffect(() => {
    if (isMouseDown) {
      if (dragTimer < 5) {
        setTimeout(() => setDragTimer((prev) => prev + 1), 10);
      } else if (dragTimer >= 5) {
        setDragTimer(0);
        set({ draggedSection: dragIndex });
        if (dragEvent) {
          const rect = dragEvent.currentTarget.getBoundingClientRect();
          setMouseOffset({
            x: dragEvent.clientX - rect.left,
            y: dragEvent.clientY - rect.top,
          });
        }
        setIsMouseDown(false);

        setDragEvent(null);
      }
    } else {
      setIsMouseDown(false);
      setDragTimer(0);
      setDragEvent(null);
    }
  }, [dragTimer, isMouseDown, dragEvent]);

  return (
    <main
      className={styles.wrapper}
      ref={sectionRef}
      style={{
        // scale: dragDim ? "1.05" : "1",

        userSelect: dragDim ? "none" : "all",
        pointerEvents: currentHandle || dragDim ? "none" : "all",
        position: dragDim ? "absolute" : "relative",
        top: dragDim ? dragDim.y - mouseOffset.y : "",
        left: dragDim ? dragDim.x - mouseOffset.x : "",
        width: dragDim ? dragDim.width : "",
        height: dragDim ? dragDim.height : "",
        gridColumnStart: section.position.col.start,
        gridColumnEnd: section.position.col.end,
        gridRowStart: section.position.row.start,
        gridRowEnd: section.position.row.end,

        zIndex: isSelected || dragDim ? 100 : 1,
      }}
      onMouseDown={(event) => {
        if (currentHandle) return;
        // if (draggedSection !== dragIndex) {
        //   if (dragTimer === 0) {
        //     setDragEvent({ ...event });
        //     setIsMouseDown(true);
        //     return;
        //   }
        // }
      }}
      onMouseEnter={() => {
        // set({ selectedSection: section });
      }}
      onMouseLeave={() => {
        // set({ selectedSection: null });
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

        {section.type === "Story" && (
          <div className={styles.pages}>
            {section.pages.length > 1 ? (
              section.pages.map((_, index) => (
                <button
                  onClick={() => setSelectedPage(index)}
                  style={{
                    backgroundColor:
                      selectedPage === index ? "var(--primary)" : "",
                  }}
                ></button>
              ))
            ) : (
              <></>
            )}
          </div>
        )}
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
          <h1>Row Start: {section.position.row.start}</h1>
          <h1>Row End: {section.position.row.end}</h1>
          <h1>Col Start: {section.position.col.start}</h1>
          <h1>Col End:{section.position.col.end}</h1>
          <h2>{(selectedSection === section).toString()}</h2>
        </div> */}
      </section>
    </main>
  );
};

export default GridSection;

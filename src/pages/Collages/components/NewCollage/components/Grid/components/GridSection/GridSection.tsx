import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import styles from "./section.module.scss";
import useCollage from "../../../../local-store/useCollage";
import { BsImageAlt as IconImage } from "react-icons/bs";

import useStore from "../../../../../../../../store/store";
import Note from "./components/Note/Note";
import ToDo from "./components/ToDo/ToDo";
import Image from "./components/Image/Image";
import Story from "./components/Story/Story";
import DeleteSection from "./components/DeleteSection/DeleteSection";
import Poll from "./components/Poll/Poll";
import Heading from "./components/Heading/Heading";

interface Props {
  section: Section;
  dragIndex: number;
  dragDim?: { width: number; height: number; x: number; y: number };
}

const GridSection: React.FC<Props> = ({ section, dragIndex, dragDim }) => {
  const { set, selectedSection, collageIndex, draggedSection } = useCollage();
  const { newestSection, isMouseDown: isMouseDownGlobal } = useStore();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [dragTimer, setDragTimer] = useState<number>(0);
  const [rotation, setRotation] = useState<number>();
  // section.type === "Note" ? Math.floor(Math.random() * 4) - 2 : 0
  const [dragEvent, setDragEvent] = useState<React.MouseEvent<
    HTMLElement,
    MouseEvent
  > | null>(null);

  const isSelected = selectedSection === section;
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (newestSection) {
      set({ selectedSection: null });
    }
  }, [newestSection]);

  useEffect(() => {
    if (!isMouseDownGlobal) {
      setIsMouseDown(false);
    }
  }, [isMouseDownGlobal]);

  useEffect(() => {
    if (isMouseDown) {
      if (dragTimer < 20) {
        setTimeout(() => setDragTimer((prev) => prev + 1), 10);
      } else if (dragTimer >= 20) {
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
    <section
      className={styles.wrapper}
      style={{
        rotate: `${rotation}deg`,
        scale: dragDim ? "1.05" : "1",
        boxShadow: dragDim ? "2px 2px 64px 8px rgba(0,0,0,0.25)" : "",
        userSelect: dragDim ? "none" : "all",
        pointerEvents: dragDim ? "none" : "all",
        position: dragDim ? "absolute" : "relative",
        top: dragDim ? dragDim.y - mouseOffset.y : "",
        left: dragDim ? dragDim.x - mouseOffset.x : "",
        width: dragDim ? dragDim.width : "",
        height: dragDim ? dragDim.height : "",
        gridColumnStart: section.position.col.start,
        gridColumnEnd: section.position.col.end,
        gridRowStart: section.position.row.start,
        gridRowEnd: section.position.row.end,
        backgroundColor: section.color,
        outline: isSelected
          ? `4px ${
              section.type === "Image" || section.type === "Video"
                ? "solid"
                : "solid"
            } var(--primary)`
          : "",

        zIndex: isSelected || dragDim ? 100 : 1,
        // opacity: draggedSection === dragIndex ? 0 : 1,
        // opacity:
        // TODO selectedSection !== null && selectedSection !== section ? 0.5 : 1,
      }}
      onMouseDown={(event) => {
        if (draggedSection !== dragIndex) {
          if (dragTimer === 0) {
            setDragEvent({ ...event });
            setIsMouseDown(true);
            return;
          }
        }
      }}
      onClick={() => {
        // if (selectedSection === section) {
        //   set({ selectedSection: null });
        //   return;
        // }
        set({ selectedSection: section });
      }}
    >
      {section.type === "Image" && <Image section={section} />}
      {section.type === "Note" && <Note section={section} />}
      {section.type === "Story" && <Story section={section} />}
      {section.type === "Heading" && <Heading section={section} />}
      {section.type === "Poll" && <Poll section={section} />}
      {selectedSection === section && (
        <DeleteSection index={collageIndex} section={section} />
      )}
    </section>
  );
};

export default GridSection;

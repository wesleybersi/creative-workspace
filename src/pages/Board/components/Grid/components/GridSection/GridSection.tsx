import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Section from "../../../../../../store/data/section";
import styles from "./section.module.scss";

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
import useDragSection from "./hooks/useDragSection";
import Comment from "./components/Comment/Comment";
import Emoji from "./components/Emoji/Emoji";

interface Props {
  section: Section;
  gridRef: HTMLDivElement | null;
  z: number;
  bringToTop: (sectionId: string) => void;
  increaseZ: (sectionId: string) => void;
  decreaseZ: (sectionId: string) => void;
}

const GridSection: React.FC<Props> = ({
  section,
  gridRef,
  z,
  bringToTop,
  increaseZ,
  decreaseZ,
}) => {
  const hideShadows = section.type === "Emoji";
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { set, selectedSection, isMouseDown, isEditingSection, mode } =
    useStore();
  const isSelected = selectedSection?.id === section.id;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [handles, currentHandle, setCurrentHandle] = useHandles(
    section,
    sectionRef.current
  );
  const { dragData, setDragEvent } = useDragSection(
    !currentHandle && !isEditing,
    section,
    sectionRef.current,
    gridRef
  );

  useEffect(() => {
    if (!isMouseDown) setCurrentHandle("");
  }, [isMouseDown]);

  useEffect(() => {
    if (!selectedSection || selectedSection.id !== section.id) {
      if (isEditing) {
        set({ isEditingSection: false });
      }
      setIsEditing(false);
    }
  }, [selectedSection]);

  useEffect(() => {
    function wheel(event: WheelEvent) {
      if (!isSelected) return;
      if (event.deltaY > 0) {
        increaseZ(section.id);
      } else if (event.deltaY < 0) {
        decreaseZ(section.id);
      }
    }
    window.addEventListener("wheel", wheel);
    return () => window.removeEventListener("wheel", wheel);
  }, [isSelected]);

  return (
    <main
      className={styles.wrapper}
      ref={sectionRef}
      style={{
        userSelect: dragData ? "none" : "all",
        pointerEvents: currentHandle || dragData ? "none" : "all",
        position: dragData ? "absolute" : "relative",
        top: dragData ? dragData.y : "",
        left: dragData ? dragData.x : "",
        width: dragData ? dragData.width : "",
        height: dragData ? dragData.height : "",
        gridColumnStart: section.position.col.start,
        gridColumnEnd: section.position.col.end,
        gridRowStart: section.position.row.start,
        gridRowEnd: section.position.row.end,
        zIndex: z + 1,
        opacity: isEditingSection && !isSelected ? 0.5 : dragData ? 0.75 : 1,
      }}
      onContextMenu={() =>
        mode === "Edit" && set({ selectedType: section.type })
      }
      onDoubleClick={() => {
        if (section.type === "Image" || section.type === "Video") return;
        setIsEditing(true);
        set({ isEditingSection: true });
      }}
      onMouseDown={(event) => {
        bringToTop(section.id);
        if (isEditing || currentHandle || dragData) return;
        setDragEvent({ ...event });
        if (!isSelected && mode === "Edit") {
          set({ selectedSection: section });
        }
      }}
    >
      {section.type === "Note" && <div className={styles.shadow}></div>}
      <section
        className={`${styles.mainOffset} ${hideShadows && styles.hideShadows}`}
        style={{
          pointerEvents:
            mode === "Interact" || isEditing || section.type === "Image"
              ? "all"
              : "none",
          backgroundColor: section.color,
          outline: isSelected
            ? `4px ${
                isEditing ? "solid var(--primary)" : "solid var(--primary)"
              }`
            : "",
          boxShadow: dragData ? "6px 8px 16px 4px rgba(0, 0, 0, 0.125)" : "",
        }}
      >
        {section.type === "Image" && (
          <Image section={section} isEditable={isEditing} />
        )}
        {section.type === "Note" && (
          <Note section={section} isEditable={isEditing} />
        )}
        {section.type === "Emoji" && (
          <Emoji section={section} isEditable={isEditing} />
        )}
        {section.type === "Comment" && (
          <Comment section={section} isEditable={isEditing} />
        )}
        {section.type === "Text" && (
          <Text section={section} isEditable={isEditing} />
        )}
        {section.type === "Heading" && (
          <Heading section={section} isEditable={isEditing} />
        )}
        {section.type === "Poll" && (
          <Poll section={section} isEditable={isEditing} />
        )}
        {section.type === "To-do" && (
          <ToDo section={section} isEditable={isEditing} />
        )}
        {section.type === "List" && (
          <List section={section} isEditable={isEditing} />
        )}
        {section.type === "Indexing" && <Indexing section={section} />}

        {isSelected && !isEditing && (
          <>
            <div className={styles.handles}>
              {handles.map((handle) => (
                <div
                  onDragStart={(event) => event.preventDefault()}
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
            {isEditing && <DeleteSection section={section} />}
          </>
        )}

        <div className={styles.handle}>
          <IconHandle size="24px" />
        </div>

        <div
          style={{
            userSelect: "none",
            alignSelf: "center",
            justifySelf: "center",
            display: "grid",
            placeContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 5000,
            paddingTop: "2rem",
          }}
        ></div>
      </section>
    </main>
  );
};

export default GridSection;

import { useEffect, useRef, useState } from "react";
import Section from "../../../../../../store/data/section";
import styles from "./page.module.scss";

import useStore from "../../../../../../store/store";
import { PiDotsSix as IconHandle } from "react-icons/pi";
import useHandles from "./hooks/useHandles";
import useDragSection from "./hooks/useDragSection";

interface Props {
  section: Section;
  gridRef: HTMLDivElement | null;
  z: number;
  bringToTop?: (sectionId: string) => void;
  increaseZ?: (sectionId: string) => void;
  decreaseZ?: (sectionId: string) => void;
  carouselOffset?: { rows: number; cols: number };
}

const GridSection: React.FC<Props> = ({
  section,
  gridRef,
  z,
  bringToTop,
  increaseZ,
  decreaseZ,
  carouselOffset,
}) => {
  const hideShadows = section.type === "Emoji";
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { set, selectedSection, isMouseDown, isEditingSection, mode } =
    useStore();
  const isSelected = selectedSection?.id === section.id;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const book = useRef();
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
      if (event.deltaY > 0 && increaseZ) {
        increaseZ(section.id);
      } else if (event.deltaY < 0 && decreaseZ) {
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
        gridColumnStart: carouselOffset
          ? section.position.col.start - carouselOffset.cols
          : section.position.col.start,
        gridColumnEnd: carouselOffset
          ? section.position.col.end - carouselOffset.cols
          : section.position.col.end,
        gridRowStart: carouselOffset
          ? section.position.row.start - carouselOffset.rows
          : section.position.row.start,
        gridRowEnd: carouselOffset
          ? section.position.row.end - carouselOffset.rows
          : section.position.row.end,
        zIndex: z + 1,
        opacity: isEditingSection && !isSelected ? 0.5 : 1,
        padding: carouselOffset ? 0 : "",
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
        if (bringToTop) bringToTop(section.id);
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
          // boxShadow: dragData ? "6px 8px 16px 4px rgba(0, 0, 0, 0.125)" : "",
          boxShadow:
            section.type === "Empty Page"
              ? "2px 2px 0 1px rgba(0, 0, 0, 0.1)"
              : "none",
          // outline: mode === "Edit" ? "2px dashed var(--lightgrey)" : "",
        }}
      >
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
          </>
        )}

        <div className={styles.handle}>
          <IconHandle size="24px" />
        </div>
      </section>
    </main>
  );
};

export default GridSection;

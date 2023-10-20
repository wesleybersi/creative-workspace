import { useEffect, useRef, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import styles from "./note.module.scss";
import useCollage from "../../../../../../local-store/useCollage";
import Menu from "../Menu/Menu";

//Menu
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { ImFontSize as IconFontSize } from "react-icons/im";

interface Props {
  section: Section;
}

const Note: React.FC<Props> = ({ section }) => {
  const PLACEHOLDER_TEXT = "Empty note";

  const { selectedSection } = useCollage();
  const [noteValue, setNoteValue] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>(PLACEHOLDER_TEXT);
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "left"
  );
  const [newInput, setNewInput] = useState<boolean>(false);
  const noteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (newInput) {
      if (noteRef.current) {
        const note = noteRef.current.innerText;
        const cleanedNote = note?.replace(/\n{3,}/g, "\n\n"); // Replace more than two consecutive line breaks with two line breaks
        if (cleanedNote && cleanedNote !== noteValue) {
          setNoteValue(cleanedNote);
        }
        if (note === "") {
          setPlaceholder(PLACEHOLDER_TEXT);
        }
      }
      setNewInput(false);
    }
  }, [newInput]);

  useEffect(() => {
    if (selectedSection !== section) {
      noteRef.current?.blur();
    } else {
      noteRef.current?.focus();
    }
  }, [selectedSection]);

  return (
    <div
      className={styles.wrapper}
      style={{
        textAlign: "center",
        pointerEvents: selectedSection !== section ? "none" : "all",
      }}
    >
      {placeholder && (
        <div className={styles.placeholder} style={{ position: "absolute" }}>
          {placeholder}
        </div>
      )}
      <div
        ref={noteRef}
        className={styles.note}
        contentEditable
        onClick={(event) => {
          event.currentTarget.focus();
        }}
        onFocus={() => {
          setPlaceholder("");
        }}
        onBlur={() => {
          setNewInput(true);
        }}
      >
        {noteValue}
      </div>
      {selectedSection === section && (
        <Menu
          items={[
            {
              tooltip: "Font Size",
              icon: IconFontSize,
              isSelected: false,
              onMouseEnter: () => {
                console.log("Enter");
              },
            },
            {
              tooltip: "Align Left",
              icon: IconAlignLeft,
              isSelected: textAlign === "left",
              onClick: () => {
                setTextAlign("left");
              },
            },
            {
              tooltip: "Align Center",
              icon: IconAlignCenter,
              isSelected: textAlign === "center",
              onClick: () => {
                setTextAlign("center");
              },
            },
            {
              tooltip: "Align Right",
              icon: IconAlignRight,
              isSelected: textAlign === "right",
              onClick: () => {
                setTextAlign("right");
              },
            },
            {
              tooltip: "Change Background Color",
              icon: IconBackground,
              isSelected: false,
              onClick: () => {
                //Enable color picker
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default Note;

import { useEffect, useRef, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import styles from "./heading.module.scss";

import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { ImFontSize as IconFontSize } from "react-icons/im";
import useStore from "../../../../../../../../store/store";
import Menu from "../Menu/Menu";

interface Props {
  isEditable: boolean;
  section: Section;
}

const Heading: React.FC<Props> = ({ isEditable, section }) => {
  const { selectedSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "center"
  );
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const [fontSize, setFontSize] = useState<string>("");

  useEffect(() => {
    if (selectedSection === section && isEditable) {
      headRef.current?.focus();
    } else {
      headRef.current?.blur();
    }
  }, [selectedSection]);

  useEffect(() => {
    if (section.size.rows === 1) {
      setFontSize("calc(var(--font-size) * 1.5)");
    } else if (section.size.rows === 2) {
      setFontSize("calc(var(--font-size) * 2.25)");
    } else if (section.size.rows > 2) {
      setFontSize("calc(var(--font-size) * 3)");
    }
  }, [section.size.rows]);

  return (
    <div
      className={styles.wrapper}
      style={{ pointerEvents: isEditable ? "all" : "none" }}
    >
      <div className={styles.header}>
        <h1
          ref={headRef}
          contentEditable={selectedSection === section}
          spellCheck="false"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }

            const maxScrollLeft =
              event.currentTarget.scrollWidth - event.currentTarget.clientWidth;

            if (
              maxScrollLeft > 0 &&
              (event.key === "ArrowLeft" || event.key === "ArrowRight")
            ) {
              // Allow arrow left and arrow right keys when overflowed
              return;
            }

            if (maxScrollLeft > 0 && event.key.length === 1) {
              // Prevent typing when overflowed
              event.preventDefault();
            }
          }}
          style={{
            fontSize,
            textAlign,
          }}
        >
          Empty
        </h1>
      </div>

      {isEditable && selectedSection === section && (
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
          ]}
        />
      )}
    </div>
  );
};

export default Heading;

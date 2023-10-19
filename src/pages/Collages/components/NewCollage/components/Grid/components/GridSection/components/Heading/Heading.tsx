import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./heading.module.scss";
import useCollage from "../../../../../../local-store/useCollage";

import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { ImFontSize as IconFontSize } from "react-icons/im";
import useStore from "../../../../../../../../../../store/store";
import Menu from "../Menu/Menu";

interface Props {
  section: Section;
}

const Heading: React.FC<Props> = ({ section }) => {
  const { collageIndex, selectedSection } = useCollage();
  const { clearSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "center"
  );
  const [noteValue, setNoteValue] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 contentEditable spellCheck="false" style={{ textAlign }}>
          My heading
        </h1>
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
          ]}
        />
      )}
    </div>
  );
};

export default Heading;

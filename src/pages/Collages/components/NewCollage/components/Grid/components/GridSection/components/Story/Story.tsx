import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./story.module.scss";
import useCollage from "../../../../../../local-store/useCollage";

import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";

import useStore from "../../../../../../../../../../store/store";
import Menu from "../Menu/Menu";

interface Props {
  section: Section;
}

const Story: React.FC<Props> = ({ section }) => {
  const { collageIndex, selectedSection } = useCollage();
  const { clearSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "left"
  );
  const [noteValue, setNoteValue] = useState<string>("");

  return (
    <div className={styles.wrapper} style={{ textAlign }}>
      {/* <div className={styles.header} style={{ textAlign }}>
        <h3 contentEditable spellCheck="false">
          My story
        </h3>
      </div> */}
      <div className={styles.content} style={{ textAlign }}>
        <div className={styles.lines}>
          {Array.from({ length: section.size.rows * 3 }).map(() => (
            <div className={styles.line}></div>
          ))}
        </div>
        <textarea
          spellCheck="false"
          placeholder="Click here to edit your story"
          onChange={(event) => setNoteValue(event.target.value)}
          value={noteValue}
          style={{ textAlign }}
        />
        <div className={styles.pages}>
          <button></button>
          <button></button>
          <button style={{ backgroundColor: "var(--primary)" }}></button>
        </div>
      </div>
      {selectedSection === section && (
        <Menu
          items={[
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

export default Story;

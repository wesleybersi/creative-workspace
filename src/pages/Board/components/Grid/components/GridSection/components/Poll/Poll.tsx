import Section from "../../../../../../../../store/data/section";

import Menu from "../Menu/Menu";

import styles from "./poll.module.scss";

//Menu
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { BsArrowsExpand as IconExpand } from "react-icons/bs";

import { useState } from "react";
import Option from "./components/Option/Option";
import useStore from "../../../../../../../../store/store";

interface Props {
  section: Section;
  isEditable: boolean;
}

const List: React.FC<Props> = ({ section, isEditable }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { selectedSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [showResult, setShowResult] = useState<boolean>(false);

  return (
    <div
      className={styles.wrapper}
      style={{ pointerEvents: isEditable ? "all" : "none" }}
    >
      <section
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridTemplateRows: `repeat(${
            isExpanded ? Math.ceil(section.size.rows / 2) : section.size.rows
          }, 1fr)`,
        }}
      >
        {Array.from({
          length: isExpanded
            ? Math.ceil(section.size.rows / 2)
            : section.size.rows,
        }).map((_, index) => (
          <Option
            section={section}
            index={index + 1}
            row={index + 1}
            align={textAlign}
            showResult={showResult}
            setShowResult={setShowResult}
          />
        ))}
      </section>
      {isEditable && selectedSection === section && (
        <Menu
          items={[
            {
              tooltip: "Expand",
              icon: IconExpand,
              isSelected: isExpanded,
              onClick: () => {
                setIsExpanded((prev) => !prev);
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

export default List;

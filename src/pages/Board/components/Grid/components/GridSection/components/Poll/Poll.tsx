import Section from "../../../../../../../../store/data/section";
import useCollage from "../../../../../../local-store/useCollage";
import Menu from "../Menu/Menu";

import styles from "./poll.module.scss";

//Menu
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";

import { useState } from "react";
import Option from "./components/Option/Option";

interface Props {
  section: Section;
}

const List: React.FC<Props> = ({ section }) => {
  const { selectedSection } = useCollage();
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [showResult, setShowResult] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <section
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridTemplateRows: `repeat(${section.size.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: section.size.rows }).map((_, index) => (
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

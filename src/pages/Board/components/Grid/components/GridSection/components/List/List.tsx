import Section from "../../../../../../../../store/data/section";

import Menu from "../Menu/Menu";
import Item from "./components/Item/Item";

import styles from "./list.module.scss";

//Menu
import { BsTypeBold as IconBold } from "react-icons/bs";
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { TbPointFilled as IconBullet } from "react-icons/tb";
import { BsArrowsExpand as IconExpand } from "react-icons/bs";

import { useState } from "react";
import useStore from "../../../../../../../../store/store";

interface Props {
  isEditable: boolean;
  section: Section;
}

const List: React.FC<Props> = ({ isEditable, section }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showBullet, setShowBullet] = useState<boolean>(true);
  const { selectedSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [isBold, setIsBold] = useState<boolean>(false);
  return (
    <div
      className={styles.wrapper}
      style={{
        pointerEvents: isEditable ? "all" : "none",
        cursor: "pointer",
      }}
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
          <Item
            section={section}
            row={index + 1}
            align={textAlign}
            isBold={isBold}
            showBullet={showBullet}
            isDoubleSize={isExpanded}
          />
        ))}
      </section>
      {isEditable && selectedSection === section && (
        <Menu
          items={[
            {
              tooltip: "Bullets",
              icon: IconBullet,
              isSelected: showBullet,
              onClick: () => {
                setShowBullet((prev) => !prev);
              },
            },
            {
              tooltip: "Expand",
              icon: IconExpand,
              isSelected: isExpanded,
              onClick: () => {
                setIsExpanded((prev) => !prev);
              },
            },
            {
              tooltip: "Bold",
              icon: IconBold,
              isSelected: isBold,
              onClick: () => {
                setIsBold((prev) => !prev);
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

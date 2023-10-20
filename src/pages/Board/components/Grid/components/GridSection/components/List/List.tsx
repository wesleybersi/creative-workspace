import Section from "../../../../../../../../store/data/section";
import useCollage from "../../../../../../local-store/useCollage";
import Menu from "../Menu/Menu";
import Item from "./components/Item/Item";

import styles from "./list.module.scss";

//Menu
import { BsTypeBold as IconBold } from "react-icons/bs";
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { ImFontSize as IconFontSize } from "react-icons/im";
import { useState } from "react";

interface Props {
  section: Section;
}

const List: React.FC<Props> = ({ section }) => {
  const { selectedSection } = useCollage();
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [isBold, setIsBold] = useState<boolean>(false);
  return (
    <div className={styles.wrapper} style={{ cursor: "pointer" }}>
      <section
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridTemplateRows: `repeat(${section.size.rows * 1}, 1fr)`,
        }}
      >
        {Array.from({ length: section.size.rows * 1 }).map((_, index) => (
          <Item
            section={section}
            row={index + 1}
            align={textAlign}
            isBold={isBold}
          />
        ))}
      </section>
      {selectedSection === section && (
        <Menu
          items={[
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

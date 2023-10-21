import Section from "../../../../../../../../store/data/section";

import Menu from "../Menu/Menu";

import styles from "./comment.module.scss";

//Menu
import { BsTypeBold as IconBold } from "react-icons/bs";
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";

import { useState } from "react";
import useStore from "../../../../../../../../store/store";

interface Props {
  isEditable: boolean;
  section: Section;
}

const Comment: React.FC<Props> = ({ isEditable, section }) => {
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
          gridTemplateColumns: `repeat(${section.size.cols}, 1fr)`,
          gridTemplateRows: `repeat(${section.size.rows}, 1fr)`,
        }}
      >
        <div
          className={styles.icon}
          style={{
            gridRow: "1 / 2",
            gridColumn: `1 / 2`,
          }}
        >
          <span />
        </div>
        <div
          className={styles.author}
          style={{
            gridRow: "1 / 2",
            gridColumn: `2 / ${section.size.cols + 1}`,
          }}
        >
          Wesley Bersi
        </div>

        {section.size.rows >= 2 && (
          <div
            className={styles.content}
            style={{
              gridRow: `2 / ${section.size.rows + 1}`,
              gridColumn: `2 / ${section.size.cols + 1}`,
            }}
          >
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              omnis cumque iste animi facere totam, dolore placeat ducimus
              praesentium, nisi similique maxime illum culpa dignissimos
              perferendis maiores, quia blanditiis? Molestias.
            </div>
          </div>
        )}
      </section>
      {isEditable && selectedSection === section && (
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

export default Comment;

import { useEffect, useRef, useState, memo } from "react";
import Section from "../../../../../../../../store/data/section";
import styles from "./emoji.module.scss";

import Menu from "../Menu/Menu";

//Menu
import { IoMdColorFill as IconBackground } from "react-icons/io";
import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";
import { ImFontSize as IconFontSize } from "react-icons/im";
import useStore from "../../../../../../../../store/store";

interface Props {
  section: Section;
  isEditable: boolean;
}

const Emoji: React.FC<Props> = ({ section, isEditable }) => {
  const { cellSize } = useStore();
  return (
    <div
      className={styles.wrapper}
      style={{
        textAlign: "center",
        display: "grid",
        placeContent: "center",
        pointerEvents: isEditable ? "all" : "none",
        userSelect: "none",
      }}
    >
      <p
        style={{
          display: "grid",
          placeContent: "center",
          textAlign: "center",

          fontSize: `${
            cellSize * 0.8 * Math.min(section.size.rows, section.size.cols)
          }px`,
        }}
      >
        🥰
      </p>
    </div>
  );
};

export default memo(Emoji);

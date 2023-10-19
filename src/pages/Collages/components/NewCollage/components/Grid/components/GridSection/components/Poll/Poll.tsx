import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./poll.module.scss";
import useCollage from "../../../../../../local-store/useCollage";

import { AiOutlineAlignLeft as IconAlignLeft } from "react-icons/ai";
import { AiOutlineAlignRight as IconAlignRight } from "react-icons/ai";
import { AiOutlineAlignCenter as IconAlignCenter } from "react-icons/ai";

import useStore from "../../../../../../../../../../store/store";
import Menu from "../Menu/Menu";

interface Props {
  section: Section;
}

const Poll: React.FC<Props> = ({ section }) => {
  const { collageIndex, selectedSection } = useCollage();
  const { clearSection } = useStore();
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "left"
  );

  interface PollOption {
    text: string;
    amount: number;
    percentage: number;
  }
  //TODO Make part of section data
  const [options, setOptions] = useState<PollOption[]>([]);

  return (
    <div className={styles.wrapper} style={{ textAlign }}>
      <div className={styles.header} style={{ textAlign }}>
        <h3 contentEditable spellCheck="false">
          Poll question
        </h3>
      </div>
      <div className={styles.content} style={{ textAlign }}>
        <div className={styles.options}>
          {options.map(({ text, amount, percentage }) => (
            <div>{text}</div>
          ))}
          <button
            onClick={() =>
              setOptions((prev) => [
                ...prev,
                { text: "Tets", amount: 0, percentage: 0 },
              ])
            }
          >
            + Add option
          </button>
          <button style={{ backgroundColor: "var(--primary)" }}></button>
        </div>
      </div>
      <p>Total votes: 0</p>
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

export default Poll;

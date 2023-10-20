import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./option.module.scss";

interface Props {
  section: Section;
  row: number;
  index: number;
  align: "left" | "center" | "right";
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const Option: React.FC<Props> = ({
  section,
  index,
  row,
  align,
  showResult,
  setShowResult,
}) => {
  const [text, setText] = useState<string>("");

  return (
    <div
      className={styles.wrapper}
      style={{
        gridRow: `${row} / ${row + 1}`,
        borderBottom:
          section.size.rows > 1 && row !== section.size.rows
            ? "1px dashed var(--lightgrey)"
            : "",
      }}
    >
      <div className={styles.option}>
        {section.size.cols > 1 && (
          <input
            className={styles.text}
            style={{
              textDecorationColor: "var(--grey)",
              textAlign: align,
              cursor: "pointer",
            }}
            type="text"
            onChange={(event) => setText(event?.target.value)}
            value={text}
            placeholder={`Option ${index}`}
          />
        )}
        {showResult ? <div></div> : <div></div>}
      </div>
    </div>
  );
};

export default Option;

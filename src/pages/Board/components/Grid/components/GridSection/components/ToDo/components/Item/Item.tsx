import { useEffect, useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./item.module.scss";

interface Props {
  section: Section;
  row: number;
  allComplete: boolean;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const Item: React.FC<Props> = ({
  section,
  row,
  allComplete,
  setCompletedTasks,
}) => {
  const [text, setText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checked) {
      setCompletedTasks((prev) => {
        prev.add(row);
        return prev;
      });
    } else {
      setCompletedTasks((prev) => {
        prev.delete(row);
        return prev;
      });
    }
  }, [checked]);

  return (
    <div
      className={styles.wrapper}
      style={{
        gridRow: `${row} / ${row + 1}`,
        borderBottom:
          section.size.rows > 1 && row !== section.size.rows
            ? "1px dashed var(--lightgrey)"
            : "",
        background: allComplete ? "#c6efc6" : "",
      }}
    >
      <div
        className={styles.before}
        style={{ backgroundColor: allComplete ? "#2D933F" : "" }}
      ></div>
      <div className={styles.todo}>
        {section.size.cols > 1 && (
          <input
            className={styles.text}
            style={{
              pointerEvents: checked ? "none" : "all",
              textDecoration: checked ? "line-through" : "",
              textDecorationThickness: "2px",
              color: checked ? "var(--grey)" : "",
              textDecorationColor: "var(--grey)",
            }}
            type="text"
            onChange={(event) => setText(event?.target.value)}
            value={text}
            placeholder="Task"
          />
        )}
        {/* {section.size.cols > 2 && (
          <div className={styles.handle}>
            <IconHandle size="20px" />
          </div>
        )} */}
        <input
          type="checkbox"
          onClick={() => setChecked((prev) => !prev)}
          checked={checked}
        />
      </div>
    </div>
  );
};

export default Item;

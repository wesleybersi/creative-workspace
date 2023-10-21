import { useEffect, useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./item.module.scss";
import useStore from "../../../../../../../../../../store/store";

interface Props {
  isEditable: boolean;
  section: Section;
  row: number;
  allComplete: boolean;
  completedTasks: Set<number>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Set<number>>>;
  isDoubleSize: boolean;
}

const Item: React.FC<Props> = ({
  isEditable,
  section,
  row,
  allComplete,
  completedTasks,
  setCompletedTasks,
  isDoubleSize,
}) => {
  const { mode } = useStore();
  const [text, setText] = useState<string>("");
  const [subText, setSubText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checked) {
      setCompletedTasks((prev) => {
        if (!prev.has(row)) {
          prev.add(row);
        }
        return prev;
      });
    } else {
      setCompletedTasks((prev) => {
        prev.delete(row);
        return prev;
      });
    }
  }, [checked, completedTasks]);

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
        style={{ backgroundColor: checked ? "#2D933F" : "transparent" }}
      ></div>
      <div className={styles.todo}>
        {section.size.cols > 1 && (
          <div className={styles.textWrap}>
            <input
              className={styles.text}
              style={{
                pointerEvents:
                  mode !== "Interact" || checked || !isEditable
                    ? "none"
                    : "all",
                textDecoration: checked ? "line-through" : "",
                textDecorationThickness: "2px",
                color: checked ? "var(--grey)" : "",
                textDecorationColor: "var(--grey)",
              }}
              type="text"
              onChange={(event) => setText(event?.target.value)}
              value={text}
              placeholder={mode === "Edit" ? "Task" : ""}
            />
            {isDoubleSize && (
              <input
                className={styles.text}
                style={{
                  textDecorationColor: "var(--grey)",
                  opacity: 0.75,
                  fontSize: "calc(var(--font-size) * 0.85)",
                }}
                type="text"
                onChange={(event) => setSubText(event.target.value)}
                value={subText}
                placeholder={mode === "Edit" ? "Sub-Item" : ""}
              />
            )}
          </div>
        )}
        <input
          type="checkbox"
          onClick={() => mode === "Interact" && setChecked((prev) => !prev)}
          checked={checked}
        />
      </div>
    </div>
  );
};

export default Item;

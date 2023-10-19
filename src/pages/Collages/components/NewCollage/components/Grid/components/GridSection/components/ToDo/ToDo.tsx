import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./todo.module.scss";

interface Props {
  section: Section;
}

const ToDo = () => {
  const [textAlign, setTextAlign] = useState<"left" | "right" | "center">(
    "left"
  );
  const [noteValue, setNoteValue] = useState<string>("");

  return (
    <div className={styles.wrapper} style={{ textAlign }}>
      <div className={styles.header} style={{ textAlign: "center" }}>
        <h3 contentEditable spellCheck="false">
          My to-do list
        </h3>
      </div>
      <div className={styles.content}>
        <div className={styles.todo}>
          <input type="checkbox" />
          <input
            spellCheck="false"
            placeholder="Click here to edit your note"
            onChange={(event) => setNoteValue(event.target.value)}
            value={noteValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDo;

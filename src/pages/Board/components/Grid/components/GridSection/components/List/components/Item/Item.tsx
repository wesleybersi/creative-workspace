import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./item.module.scss";

interface Props {
  section: Section;
  row: number;
  align: "left" | "center" | "right";
  isBold: boolean;
}

const Item: React.FC<Props> = ({ section, row, align, isBold }) => {
  const [text, setText] = useState<string>("");

  return (
    <div className={styles.wrapper} style={{ gridRow: `${row} / ${row + 1}` }}>
      <div className={styles.item}>
        {section.size.cols > 1 && (
          <input
            className={styles.text}
            style={{
              textDecorationColor: "var(--grey)",
              textAlign: align,
              fontWeight: isBold ? 600 : 400,
              borderBottom:
                section.size.rows > 1 && row !== section.size.rows
                  ? "1px dashed var(--lightgrey)"
                  : "",
            }}
            type="text"
            onChange={(event) => setText(event?.target.value)}
            value={text}
            placeholder={"Item"}
          />
        )}
        {/* {section.size.cols > 2 && (
          <div className={styles.handle}>
            <IconHandle size="20px" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Item;

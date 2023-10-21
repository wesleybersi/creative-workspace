import { useState } from "react";
import Area from "../../../../../../../../../../../../store/data/section";
import styles from "./item.module.scss";

interface Props {
  section: Area;
  row: number;
  align: "left" | "center" | "right";
  isBold: boolean;
}

const Item: React.FC<Props> = ({ section, row, align, isBold }) => {
  const [text, setText] = useState<string>("");

  return (
    <div className={styles.wrapper} style={{ gridRow: `${row} / ${row + 1}` }}>
      <div className={styles.todo}>
        {section.size.cols > 1 && (
          <input
            className={styles.text}
            style={{
              textDecorationColor: "var(--grey)",
              textAlign: align,
              fontWeight: isBold ? 700 : 400,
            }}
            type="text"
            onChange={(event) => setText(event?.target.value)}
            value={text}
            placeholder="Empty"
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

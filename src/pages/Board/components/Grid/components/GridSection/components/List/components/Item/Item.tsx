import { useState } from "react";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./item.module.scss";
import useStore from "../../../../../../../../../../store/store";

interface Props {
  section: Section;
  row: number;
  align: "left" | "center" | "right";
  isBold: boolean;
  showBullet: boolean;
  isDoubleSize: boolean;
}

const Item: React.FC<Props> = ({
  section,
  row,
  align,
  isBold,
  showBullet,
  isDoubleSize,
}) => {
  const { mode } = useStore();
  const [text, setText] = useState<string>("");
  const [subText, setSubText] = useState<string>("");

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
      <div className={styles.item}>
        {showBullet && <div className={styles.bullet}></div>}
        {section.size.cols > 1 && (
          <div className={styles.textWrap}>
            <input
              className={styles.text}
              style={{
                textDecorationColor: "var(--grey)",
                textAlign: align,
                fontWeight: isBold ? 600 : 400,
              }}
              type="text"
              onChange={(event) => setText(event.target.value)}
              value={text}
              placeholder={mode === "Edit" ? "Item" : ""}
            />
            {isDoubleSize && (
              <input
                className={styles.text}
                style={{
                  textDecorationColor: "var(--grey)",
                  textAlign: align,
                  fontWeight: isBold ? 600 : 400,
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

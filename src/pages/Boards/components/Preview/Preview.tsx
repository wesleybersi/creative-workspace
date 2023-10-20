import styles from "./preview.module.scss";
import useStore from "../../../../store/store";
import { useEffect, useState } from "react";
import Section from "../../../../store/data/section";
import { useNavigate } from "react-router-dom";

const Preview = ({
  index,
  gutter = "0.5rem",
}: {
  index: number;
  gutter?: string;
}) => {
  const navigate = useNavigate();
  const { boards } = useStore();
  const board = boards[index];
  const [images, setImages] = useState<Map<Section, string>>(new Map());

  useEffect(() => {
    if (!board) return;
    const images = new Map();
    for (const section of board.sections) {
      if (!section.image) continue;
      const imageURL = URL.createObjectURL(section.image);
      images.set(section, imageURL);
    }
    setImages(images);
  }, [board]);

  if (!board) return;

  return (
    <section
      className={styles.wrapper}
      onClick={() => navigate(`board${index + 1}`)}
    >
      <div
        className={styles.under}
        style={{
          gridTemplateColumns: `repeat(${board.size.cols},1fr)`,
          gridTemplateRows: `repeat(${board.size.rows},1fr)`,
          gridGap: gutter,
        }}
      >
        {board.tiles.flat().map(() => {
          return (
            <div
              className={styles.section}
              style={{
                aspectRatio: 1,
                backgroundColor: "var(--lightgrey)",
              }}
            ></div>
          );
        })}
      </div>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${board.size.cols},1fr)`,
          gridTemplateRows: `repeat(${board.size.rows},1fr)`,
          gridGap: gutter,
        }}
      >
        {board.sections.map((section) => {
          const { position } = section;
          const { row, col } = position;
          return (
            <div
              className={styles.section}
              style={{
                backgroundColor:
                  section.type === "Color" ? section.color : "var(--grey)",
                backgroundImage: images.has(section)
                  ? `url(${images.get(section)})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                gridRowStart: row.start,
                gridRowEnd: row.end,
                gridColumnStart: col.start,
                gridColumnEnd: col.end,
              }}
            ></div>
          );
        })}
      </div>

      <div className={styles.name}>
        <p>{board.name}</p>
      </div>
    </section>
  );
};

export default Preview;

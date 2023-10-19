import styles from "./preview.module.scss";
import useStore from "../../../../../../store/store";
import { useEffect, useState } from "react";
import Section from "../../../../../../store/data/section";
import { useNavigate } from "react-router-dom";

const Preview = ({
  index,
  gutter = "0.5rem",
}: {
  index: number;
  gutter?: string;
}) => {
  const navigate = useNavigate();
  const { client } = useStore();
  const collage = client.collages[index];
  const [images, setImages] = useState<Map<Section, string>>(new Map());

  useEffect(() => {
    if (!collage) return;
    const images = new Map();
    for (const section of collage.sections) {
      if (!section.image) continue;
      const imageURL = URL.createObjectURL(section.image);
      images.set(section, imageURL);
    }
    setImages(images);
  }, [collage]);

  if (!collage) return;

  return (
    <section
      className={styles.wrapper}
      onClick={() => navigate(`collage${index + 1}`)}
    >
      <div
        className={styles.under}
        style={{
          gridTemplateColumns: `repeat(${collage.size.cols},1fr)`,
          gridTemplateRows: `repeat(${collage.size.rows},1fr)`,
          gridGap: gutter,
        }}
      >
        {collage.tiles.flat().map(() => {
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
          gridTemplateColumns: `repeat(${collage.size.cols},1fr)`,
          gridTemplateRows: `repeat(${collage.size.rows},1fr)`,
          gridGap: gutter,
        }}
      >
        {collage.sections.map((section) => {
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

      {/* <div className={styles.name}>
        <p>{collage.name}</p>
      </div> */}
    </section>
  );
};

export default Preview;

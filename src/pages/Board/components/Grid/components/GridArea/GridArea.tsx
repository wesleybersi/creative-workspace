import { useRef, useState } from "react";
import styles from "./area.module.scss";

import Area from "../../../../../../store/data/area";
import useStore from "../../../../../../store/store";

interface Props {
  area: Area;
  gridRef: HTMLDivElement | null;
}

const GridSection: React.FC<Props> = ({ area, gridRef }) => {
  const { cellSize } = useStore();
  const areaRef = useRef<HTMLDivElement | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <main
      className={styles.wrapper}
      ref={areaRef}
      style={{
        gridColumnStart: area.position.col.start,
        gridColumnEnd: area.position.col.end,
        gridRowStart: area.position.row.start,
        gridRowEnd: area.position.row.end,
        zIndex: 0,
      }}
    >
      <section
        className={styles.tabs}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.floor(
            area.size.cols / 1.5
          )}, 1fr)`,
          top: -cellSize / 1.75,
        }}
      >
        {Array.from({ length: Math.floor(area.size.cols / 1.5) }).map(
          (_, index) => (
            <div
              className={styles.tab}
              onClick={() => setSelectedTab(index)}
              style={
                selectedTab === index
                  ? {
                      background: area.color,
                      height: cellSize,
                      transform: "translateY(0)",
                    }
                  : {
                      background: "white",
                      height: cellSize,
                      opacity: index > 1 ? 0 : 1,
                      pointerEvents: index > 1 ? "none" : "all",
                    }
              }
            ></div>
          )
        )}
      </section>
      <section
        className={styles.mainOffset}
        style={{
          backgroundColor: area.color,
        }}
      >
        <div
          style={{
            userSelect: "none",
            alignSelf: "center",
            justifySelf: "center",
            display: "grid",
            placeContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 5000,
            paddingTop: "2rem",
          }}
        ></div>
      </section>
    </main>
  );
};

export default GridSection;

import useStore from "../../store/store";
import styles from "./boards.module.scss";
import { useNavigate } from "react-router-dom";
import Preview from "./components/Preview/Preview";
import { useState } from "react";

const _Boards = () => {
  const navigate = useNavigate();
  const { client, newCollage } = useStore();
  const { collages } = client;
  const [viewAmount] = useState<number>(4);

  return (
    <div className={styles.wrapper}>
      <section className={styles.top}>
        <div>
          <h3>My boards</h3>
        </div>
        <div className={styles.new}>
          <button
            onClick={() => {
              newCollage();
              // navigate(`board${collages.length}`);
            }}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              aspectRatio: 1,
              display: "grid",
              placeContent: "center",
              fontSize: "1.25rem",
              padding: 0,
              paddingBottom: "2px",
              color: "var(--grey)",
              border: "2px solid var(--grey)",
            }}
          >
            +
          </button>
        </div>
      </section>

      <section
        className={styles.collages}
        style={{ gridTemplateColumns: `repeat(${viewAmount},1fr)` }}
      >
        {collages
          .map(({ isPublished }, index) => (
            <Preview index={index} gutter="0.25rem" />
          ))
          .reverse()}
      </section>
    </div>
  );
};

export default _Boards;

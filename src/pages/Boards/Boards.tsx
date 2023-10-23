import useStore from "../../store/store";
import styles from "./boards.module.scss";
import { useNavigate } from "react-router-dom";
import Preview from "./components/Preview/Preview";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";

const _Boards = () => {
  const { boards, newBoard } = useStore();
  const [viewAmount] = useState<number>(4);

  return (
    <div className={styles.wrapper}>
      <section className={styles.top}>
        <div>
          <h3>My boards</h3>
        </div>
        <div className={styles.new}>
          <button
            onClick={() => newBoard()}
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
        {boards
          .map((_, index) => <Preview index={index} gutter="0.25rem" />)
          .reverse()}
      </section>
      <section
        style={{
          width: "600px",
          height: "auto",
          outline: "8px lightblue solid",
        }}
      >
        <MyBook width={400} height={600} />
      </section>
    </div>
  );
};

export default _Boards;

interface BookProps {
  width: number;
  height: number;
}
const MyBook: React.FC<BookProps> = ({ width, height }) => {
  return (
    <HTMLFlipBook
      width={width}
      height={height}
      size="stretch"
      startZIndex={1000}
      maxShadowOpacity={0.65}
    >
      <div className={styles.demo}>Hi there</div>
      <div className={styles.demo}>Page 2</div>
      <div className={styles.demo}>Page 3</div>
      <div className={styles.demo}>Page 4</div>
    </HTMLFlipBook>
  );
};

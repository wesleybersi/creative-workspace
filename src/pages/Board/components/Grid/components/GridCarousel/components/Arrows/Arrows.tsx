import styles from "./arrows.module.scss";
import { HiOutlineChevronLeft as IconArrowLeft } from "react-icons/hi";
import { HiOutlineChevronRight as IconArrowRight } from "react-icons/hi";
import useStore from "../../../../../../../../store/store";

interface Props {
  onLeft: () => void;
  onRight: () => void;
}

const Arrows: React.FC<Props> = ({ onLeft, onRight }) => {
  const { cellSize } = useStore();
  return (
    <section className={styles.arrows}>
      <div
        className={styles.arrow}
        style={{ width: cellSize - 4, height: cellSize - 4 }}
      >
        <span className={styles.left} onClick={onLeft}>
          <IconArrowLeft size={`${cellSize / 1.75}px`} />
        </span>
      </div>
      <div
        className={styles.arrow}
        style={{ width: cellSize - 4, height: cellSize - 4 }}
      >
        <span className={styles.right} onClick={onRight}>
          <IconArrowRight size={`${cellSize / 1.75}px`} />
        </span>
      </div>
    </section>
  );
};

export default Arrows;

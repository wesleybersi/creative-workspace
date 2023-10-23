import styles from "./dots.module.scss";

interface Props {
  amount: number;
  currentIndex: number;
  onTrigger: (index: number) => void;
}

const Dots: React.FC<Props> = ({ amount, currentIndex, onTrigger }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.dots}>
        {Array.from({ length: amount }).map((_, index) => (
          <button
            className={styles.dot}
            style={
              currentIndex === index + 1 ||
              currentIndex === index + 1 + amount ||
              currentIndex === index + 1 - amount
                ? { backgroundColor: "var(--primary)" }
                : {}
            }
            onClick={() => onTrigger(index + 1)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Dots;

import styles from "./index.module.scss";

interface Props {
  index: number;
  row: number;
}

const Index: React.FC<Props> = ({ index, row }) => {
  return (
    <div className={styles.wrapper} style={{ gridRow: `${row} / ${row + 1}` }}>
      <div className={styles.index}>{index}</div>
    </div>
  );
};

export default Index;

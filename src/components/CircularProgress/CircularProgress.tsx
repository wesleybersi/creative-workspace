import styles from "./progress.module.scss";

interface Props {
  progress: number;
  color?: string;
}

const CircularProgress: React.FC<Props> = ({
  progress,
  color = "rgba(255,255,255,0.45)",
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        background: `radial-gradient(closest-side,transparent 79%,transparent 80% 100%),conic-gradient(${color} ${progress}%, transparent 0)`,
      }}
    ></div>
  );
};

export default CircularProgress;

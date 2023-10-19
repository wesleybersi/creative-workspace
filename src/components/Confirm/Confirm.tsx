import styles from "./styles.module.scss";

interface Props {
  prompt: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: React.FC<Props> = ({ prompt, onConfirm, onCancel }) => {
  return (
    <div
      className={styles.confirm}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding)",
        textAlign: "center",
        backdropFilter: "blur(2px)",
        fontSize: "1.1rem",
        borderRadius: "0.25rem",
        boxShadow: "0 0 32px 4px rgba(0, 0, 0, 0.25)",
        background: "var(--main)",
        padding: "var(--padding)",
      }}
    >
      <p>{prompt}</p>
      <div
        style={{
          display: "flex",
          gap: "var(--padding)",
          justifyContent: "center",
        }}
      >
        <button onClick={() => onConfirm()}>Confirm</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default Confirm;

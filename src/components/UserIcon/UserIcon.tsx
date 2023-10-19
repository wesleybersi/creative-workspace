import useStore from "../../store/store";
import styles from "./icon.module.scss";

const UserIcon = () => {
  const { client } = useStore();
  return (
    <div className={styles.icon} style={{ backgroundColor: client.color }}>
      👩🏼
    </div>
  );
};

export default UserIcon;

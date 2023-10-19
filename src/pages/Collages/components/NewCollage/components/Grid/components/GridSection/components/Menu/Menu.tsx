import { IconType } from "react-icons";
import styles from "./menu.module.scss";

interface Props {
  items: {
    tooltip: string;
    icon: IconType;
    isSelected: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
  }[];
}
const Menu: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.arrowUp}></div>
        {items.map(
          ({ tooltip, icon: Icon, onClick, onMouseEnter, isSelected }) => (
            <div
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              style={{ outline: isSelected ? "2px solid white" : "" }}
            >
              <Icon size="28px" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Menu;

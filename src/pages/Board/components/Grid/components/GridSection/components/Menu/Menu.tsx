import { IconType } from "react-icons";
import styles from "./menu.module.scss";
import useCollage from "../../../../../../local-store/useCollage";

interface Option {
  tooltip: string;
  icon: IconType;
  isSelected: boolean;
  options?: [];
  onClick?: () => void;
  onMouseEnter?: () => void;
}

interface Props {
  items: Option[];
}
const Menu: React.FC<Props> = ({ items }) => {
  const { selectedSection } = useCollage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.arrowUp}></div>
        {items.map(
          ({
            tooltip,
            icon: Icon,
            onClick,
            onMouseEnter,
            isSelected,
            options,
          }) => (
            <div
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              style={{ outline: isSelected ? "2px solid white" : "" }}
            >
              <Icon size="24px" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Menu;

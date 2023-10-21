import Area from "../../../../../../../../../../store/data/section";
import Item from "./components/Item/Item";

import styles from "./todo.module.scss";

interface Props {
  section: Area;
}

const ToDo: React.FC<Props> = ({ section }) => {
  return (
    <div className={styles.wrapper}>
      <section
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridTemplateRows: `repeat(${section.size.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: section.size.rows }).map((_, index) => (
          <Item section={section} row={index + 1} />
        ))}
      </section>
    </div>
  );
};

export default ToDo;

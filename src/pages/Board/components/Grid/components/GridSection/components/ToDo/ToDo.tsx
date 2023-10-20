import { useEffect, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import Item from "./components/Item/Item";

import styles from "./todo.module.scss";

interface Props {
  section: Section;
}

const ToDo: React.FC<Props> = ({ section }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [allComplete, setAllComplete] = useState<boolean>(false);

  useEffect(() => {
    if (completedTasks.size === section.size.rows) {
      setAllComplete(true);
    } else {
      setAllComplete(false);
    }
  }, [completedTasks.size, section]);

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
          <Item
            section={section}
            row={index + 1}
            allComplete={allComplete}
            setCompletedTasks={setCompletedTasks}
          />
        ))}
      </section>
    </div>
  );
};

export default ToDo;

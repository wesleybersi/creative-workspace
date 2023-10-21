import { useEffect, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import Item from "./components/Item/Item";

import styles from "./todo.module.scss";
import useStore from "../../../../../../../../store/store";

import { BsArrowsExpand as IconExpand } from "react-icons/bs";
import Menu from "../Menu/Menu";

interface Props {
  section: Section;
  isEditable: boolean;
}

const ToDo: React.FC<Props> = ({ section, isEditable }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { mode, selectedSection } = useStore();
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [allComplete, setAllComplete] = useState<boolean>(false);

  useEffect(() => {
    if (completedTasks.size === section.size.rows) {
      setAllComplete(true);
    } else {
      setAllComplete(false);
    }
  }, [completedTasks.size, section.size.rows]);

  useEffect(() => {
    setCompletedTasks(new Set());
  }, [section.size.rows]);

  return (
    <div
      className={styles.wrapper}
      style={{
        pointerEvents: mode === "Interact" || isEditable ? "all" : "none",
      }}
    >
      <section
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridTemplateRows: `repeat(${
            isExpanded ? Math.ceil(section.size.rows / 2) : section.size.rows
          }, 1fr)`,
        }}
      >
        {Array.from({
          length: isExpanded
            ? Math.ceil(section.size.rows / 2)
            : section.size.rows,
        }).map((_, index) => (
          <Item
            isEditable={isEditable}
            section={section}
            row={index + 1}
            allComplete={allComplete}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
            isDoubleSize={isExpanded}
          />
        ))}
      </section>
      {isEditable && selectedSection === section && (
        <Menu
          items={[
            {
              tooltip: "Expand",
              icon: IconExpand,
              isSelected: isExpanded,
              onClick: () => {
                setIsExpanded((prev) => !prev);
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default ToDo;

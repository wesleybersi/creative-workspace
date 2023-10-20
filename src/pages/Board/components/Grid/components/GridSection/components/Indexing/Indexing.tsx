import { useState } from "react";
import Section from "../../../../../../../../store/data/section";
import useCollage from "../../../../../../local-store/useCollage";
import Menu from "../Menu/Menu";
import Index from "./components/Index/Index";

import styles from "./list.module.scss";

import { BiPlus as IconPlus, BiMinus as IconMinus } from "react-icons/bi";
import { GiVerticalFlip as IconInvert } from "react-icons/gi";

interface Props {
  section: Section;
}

const Indexing: React.FC<Props> = ({ section }) => {
  const { selectedSection } = useCollage();
  const [offset, setOffset] = useState<number>(0);
  const [invert, setInvert] = useState<boolean>(false);

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
          <Index
            row={index + 1}
            index={
              invert ? section.size.rows - index + offset : index + 1 + offset
            }
          />
        ))}
      </section>
      {selectedSection === section && (
        <Menu
          items={[
            {
              tooltip: "Decrement",
              icon: IconMinus,
              isSelected: false,
              onClick: () => {
                setOffset((prev) => prev - 1);
              },
            },
            {
              tooltip: "Increment",
              icon: IconPlus,
              isSelected: false,
              onClick: () => {
                setOffset((prev) => prev + 1);
              },
            },
            {
              tooltip: "Invert",
              icon: IconInvert,
              isSelected: false,
              onClick: () => {
                setInvert((prev) => !prev);
              },
            },
          ]}
        />
      )}
    </div>
  );
};

export default Indexing;

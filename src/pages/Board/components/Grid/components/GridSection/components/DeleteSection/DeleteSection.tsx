// import { MdDeleteForever as IconDelete } from "react-icons/md";
// import { IoMdClose as IconDelete } from "react-icons/io";
import { RiDeleteBinLine as IconDelete } from "react-icons/ri";
import styles from "./delete.module.scss";
import useStore from "../../../../../../../../store/store";
import Section from "../../../../../../../../store/data/section";

const DeleteSection = ({
  index,
  section,
}: {
  index: number;
  section: Section;
}) => {
  const { clearSection } = useStore();
  return (
    <div
      className={styles.delete}
      onClick={() => {
        clearSection(index, section.id);
      }}
    >
      <IconDelete size="32px" />
    </div>
  );
};

export default DeleteSection;
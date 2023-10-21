// import { MdDeleteForever as IconDelete } from "react-icons/md";
// import { IoMdClose as IconDelete } from "react-icons/io";
import { RiDeleteBinLine as IconDelete } from "react-icons/ri";
import styles from "./delete.module.scss";
import useStore from "../../../../../../../../store/store";
import Section from "../../../../../../../../store/data/section";

const DeleteSection = ({ section }: { section: Section }) => {
  const { deleteSection } = useStore();

  return (
    <div
      className={styles.delete}
      onClick={() => {
        deleteSection(section.boardId, section.id);
      }}
    >
      <IconDelete size="32px" />
    </div>
  );
};

export default DeleteSection;

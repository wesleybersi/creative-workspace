// import { MdDeleteForever as IconDelete } from "react-icons/md";
import { IoMdClose as IconDelete } from "react-icons/io";
import styles from "./delete.module.scss";
import useStore from "../../../../../../../../../../store/store";
import Section from "../../../../../../../../../../store/data/section";
import useCollage from "../../../../../../local-store/useCollage";
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
        console.log("Click");
        clearSection(index, section);
      }}
    >
      <IconDelete size="30px" />
    </div>
  );
};

export default DeleteSection;

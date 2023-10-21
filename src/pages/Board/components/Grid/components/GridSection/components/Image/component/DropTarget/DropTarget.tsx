import useStore from "../../../../../../../../../../store/store";
import Section from "../../../../../../../../../../store/data/section";
import styles from "./target.module.scss";
import { MdCloudUpload as IconUpload } from "react-icons/md";

interface Props {
  section: Section;
}
const DropTarget: React.FC<Props> = ({ section }) => {
  const { updateSection, cellSize } = useStore();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const image = e.dataTransfer.files[0];
    console.log("Image dropped!");
    if (image) {
      updateSection(section.boardId, section.id, (section) => {
        section.image = image;
        return section;
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.target}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      style={{
        opacity: section.image ? 0 : 1,
      }}
    >
      {!section.image && (
        <>
          <div className={styles.uploadIcon}>
            <IconUpload
              size={
                section.size.cols === 1 || section.size.rows === 1
                  ? `${cellSize * 0.7}px`
                  : `${cellSize}px`
              }
            />
          </div>

          {section.size.cols > 2 && section.size.rows > 2 && (
            <p>Drop image here</p>
          )}
        </>
      )}
    </div>
  );
};

export default DropTarget;

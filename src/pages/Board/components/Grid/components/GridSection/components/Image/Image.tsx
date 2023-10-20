import { ChangeEvent, useEffect, useRef, useState } from "react";
import Section from "../../../../../../../../store/data/section";
import styles from "./image.module.scss";
import useStore from "../../../../../../../../store/store";

import DropTarget from "./component/DropTarget/DropTarget";
import Menu from "../Menu/Menu";
import { AiFillFolderOpen as IconUpload } from "react-icons/ai";
import { AiOutlineClear as IconClear } from "react-icons/ai";
import useCollage from "../../../../../../local-store/useCollage";

interface Props {
  section: Section;
}

const Image: React.FC<Props> = ({ section }) => {
  const { selectedSection } = useCollage();
  const { updateSection } = useStore();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = (file: File) => {
    updateSection(section.boardId, section.id, (section) => {
      section.image = file;
      return section;
    });
  };

  useEffect(() => {
    if (section.image) {
      const imageURL = URL.createObjectURL(section.image);
      setBackgroundImage(imageURL);
    } else {
      setBackgroundImage("");
    }
  }, [section?.image]);

  return (
    <div
      className={styles.wrapper}
      style={{ background: backgroundImage ? `url(${backgroundImage})` : "" }}
      onMouseMove={(event) => {
        if (isMouseDown) {
          event.currentTarget.style.backgroundPositionX = event.clientX + "px";
          event.currentTarget.style.backgroundPositionY = event.clientY + "px";
        }
      }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <div className={styles.content}>
        <div className={styles.upload}>
          <DropTarget section={section} />

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {selectedSection === section &&
        (!backgroundImage ? (
          <Menu
            items={[
              {
                tooltip: "Upload image",
                icon: IconUpload,
                isSelected: false,
                onClick: () => {
                  triggerFileInput();
                },
              },
            ]}
          />
        ) : (
          <Menu
            items={[
              {
                tooltip: "Clear image",
                icon: IconClear,
                isSelected: false,
                onClick: () => {
                  updateSection(section.boardId, section.id, (section) => {
                    section.image = null;
                    return section;
                  });
                },
              },
              {
                tooltip: "Upload image",
                icon: IconUpload,
                isSelected: false,
                onClick: () => {
                  triggerFileInput();
                },
              },
            ]}
          />
        ))}
    </div>
  );
};

export default Image;

import { ChangeEvent, useEffect, useRef, useState } from "react";
import useStore from "../../../../../../store/store";
import useCollage from "../../local-store/useCollage";
import styles from "./info.module.scss";
import { MdCloudUpload as IconUpload } from "react-icons/md";
import { BsImageAlt as IconImage } from "react-icons/bs";
import { RiDoubleQuotesR as IconQuote } from "react-icons/ri";
import { BiSolidColorFill as IconColor } from "react-icons/bi";
import { ImMusic as IconMusic } from "react-icons/im";
import { FaUserFriends as IconFriend } from "react-icons/fa";
import { MdOutlineTitle as IconText } from "react-icons/md";
import { BsCameraVideoFill as IconVideo } from "react-icons/bs";
import { IoMdImages as IconGallery } from "react-icons/io";
// import { PiTextTBold as IconText } from "react-icons/pi";
import { BsEmojiWink as IconEmoji } from "react-icons/bs";
import { FaShapes as IconShape } from "react-icons/fa";
import { PiPencilDuotone as IconPencil } from "react-icons/pi";

import { GiPerspectiveDiceSixFacesRandom as IconRandom } from "react-icons/gi";
import { IoMdSwap as IconSwapHorz } from "react-icons/io";
import { AiOutlineClear as IconClear } from "react-icons/ai";
import { MdSwapVert as IconSwapVert } from "react-icons/md";
const Setup = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { newSection, clearAllSections, client } = useStore();
  const { set, collageIndex, selectedSection, selectedStage } = useCollage();
  const [tabIndex, setTabIndex] = useState(0);
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <section
        className={styles.under}
        style={expand ? { transform: "translateY(100%)" } : {}}
      >
        <div
          className={styles.triggerUnder}
          onClick={() => setExpand((prev) => !prev)}
        ></div>
        <label>Add decoration</label>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
            }}
            // onClick={() => setSectionImage(selectedSection, null)}
          >
            <IconText size="32px" />
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
            }}
            // onClick={() => setSectionImage(selectedSection, null)}
          >
            <IconPencil size="32px" />
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              aspectRatio: 1,
            }}
            // onClick={() => setSectionImage(selectedSection, null)}
          >
            <IconShape size="32px" />
          </button>
        </div>
      </section>
      <section className={styles.tabs}>
        {Array.from({ length: 2 }).map((_, index) => (
          <button
            style={tabIndex === index ? { background: "var(--primary)" } : {}}
            onClick={() => setTabIndex(index)}
          ></button>
        ))}
      </section>
      {tabIndex === 0 && (
        <>
          {" "}
          <section>
            <label>
              Type: <span style={{ fontWeight: "400" }}></span>
            </label>
            <div className={styles.grid}>
              <button
                style={
                  true
                    ? {
                        backgroundColor: "var(--primary)",
                        border: "2px solid var(--primary)",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => {
                  clearAllSections(collageIndex);
                }}
              >
                <IconClear size="50%" />
              </button>
              <button
                style={
                  true
                    ? {
                        backgroundColor: "var(--primary)",
                        border: "2px solid var(--primary)",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => {
                  clearAllSections(collageIndex);
                  const newSections =
                    client.collages[collageIndex].randomSections();

                  for (const { tiles, position } of newSections) {
                    newSection(collageIndex, tiles.flat(), position);
                  }
                }}
              >
                <IconRandom size="50%" />
              </button>
              <button
                style={
                  true
                    ? {
                        backgroundColor: "var(--primary)",
                        border: "2px solid var(--primary)",
                        color: "white",
                      }
                    : {}
                }
              >
                <IconSwapHorz size="50%" />
              </button>
              <button
                style={
                  true
                    ? {
                        backgroundColor: "var(--primary)",
                        border: "2px solid var(--primary)",
                        color: "white",
                        rotate: "90deg",
                      }
                    : { rotate: "90deg" }
                }
              >
                <IconSwapHorz size="50%" />
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Setup;

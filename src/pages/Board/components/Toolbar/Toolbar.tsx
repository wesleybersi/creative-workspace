import useCollage from "../../local-store/useCollage";
import styles from "./toolbar.module.scss";

import { sectionTypes } from "../../../../store/data/section";
import { useEffect } from "react";
const SectionInfo = () => {
  const { set, selectedType } = useCollage();

  return (
    <div className={styles.wrapper}>
      <section>
        <div className={styles.grid}>
          {sectionTypes.map(
            ({ name, icon: Icon }) =>
              name !== "None" && (
                <button
                  style={
                    selectedType === name
                      ? {
                          backgroundColor: "var(--primary)",

                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => {
                    set((state) => {
                      {
                        if (state.selectedType === name) {
                          return { selectedType: null, selectedSection: null };
                        } else
                          return {
                            selectedType: name,
                            selectedSection: null,
                          };
                      }
                    });
                  }}
                >
                  <Icon size="18px" /> <p>{name}</p>
                </button>
              )
          )}
        </div>
      </section>
      {/* <section>
        <hr style={{ margin: "calc(var(--padding) * 2) 0", opacity: 0.25 }} />
      </section> */}
    </div>
  );
};

export default SectionInfo;

import { useState } from "react";

import useCollage from "../../local-store/useCollage";
import styles from "./info.module.scss";

import { sectionTypes } from "../../../../../../store/data/section";
const SectionInfo = () => {
  const { set, selectedType } = useCollage();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <h2>Selected type</h2>
      <p>Select a cell and start dragging. Let go to create a new section.</p>
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
          <section>
            <div className={styles.grid}>
              {sectionTypes.map(({ name, icon: Icon }) => (
                <button
                  style={
                    selectedType === name
                      ? {
                          backgroundColor: "var(--primary)",
                          border: "2px solid var(--primary)",
                          color: "white",
                        }
                      : {}
                  }
                  onClick={() => set({ selectedType: name })}
                >
                  <Icon size="32px" /> <p>{name}</p>
                </button>
              ))}
            </div>
          </section>
          <section>
            <hr
              style={{ margin: "calc(var(--padding) * 2) 0", opacity: 0.25 }}
            />
          </section>
          {/* {(selectedSection.type === "Color" ||
            selectedSection.type === "Note") && (
            <section>
              <SliderPicker
                color={selectedSection.color}
                onChange={(color) => {
                  selectedSection.color = color.hex;
                  set({});
                }}
              />
            </section>
          )}
          {selectedSection.type === "Image" && (
           
          )} */}
        </>
      )}
      {/* {tabIndex === 1 && (
        <section className={styles.description}>
          <div className={styles.combiner}>
            <label>Title</label>
            <input
              type="text"
              value={selectedSection.title}
              onChange={(event) => {
                selectedSection.title = event.target.value;
                set({});
              }}
            />
          </div>
          <div className={styles.combiner}>
            <label>Description</label>
            <textarea />
          </div>
          <div className={styles.combiner}>
            <label>Tags</label>
            <input type="text" />
          </div>
          <button>Select file</button>
        </section>
      )}{" "}
      <section>
        <hr style={{ margin: "calc(var(--padding) * 2) 0", opacity: 0.25 }} />
      </section> */}
      {/* <button
        onClick={() => {
          clearSection(collageIndex, selectedSection);
          set({ selectedSection: null });
        }}
      >
        Remove section
      </button> */}
      <div>
        <input type="checkbox" /> <label>Randomize background colors</label>
      </div>
    </div>
  );
};

export default SectionInfo;

import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";
import styles from "./collages.module.scss";
import { useNavigate } from "react-router-dom";
import Preview from "./components/NewCollage/components/Preview/Preview";
import { useState } from "react";

const _Collages = () => {
  const navigate = useNavigate();
  const { client, newCollage } = useStore();
  const { collages } = client;
  const [viewAmount, setViewAmount] = useState<number>(3);

  return (
    <>
      <Center>
        <>
          <section className={styles.top}>
            <div>
              <h3>My boards</h3>
            </div>
            <div className={styles.new}>
              <button
                onClick={() => {
                  newCollage();
                  navigate(`collage${collages.length}`);
                }}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  aspectRatio: 1,
                  display: "grid",
                  placeContent: "center",
                  fontSize: "1.25rem",
                  padding: 0,
                  paddingBottom: "2px",
                  color: "var(--grey)",
                  border: "2px solid var(--grey)",
                }}
              >
                +
              </button>
            </div>
          </section>

          <section
            className={styles.collages}
            style={{ gridTemplateColumns: `repeat(${viewAmount},1fr)` }}
          >
            {/* <button
              onClick={() => {
                newCollage();
                navigate(`collage${collages.length}`);
              }}
              style={{
                aspectRatio: 1,
                borderRadius: "1rem",
                display: "grid",
                placeContent: "center",
                fontSize: "3rem",
                padding: 0,
                paddingBottom: "2px",
                color: "var(--grey)",
                border: "2px solid var(--grey)",
              }}
            >
              +
            </button> */}
            {collages
              .map(({ isPublished }, index) => (
                <Preview index={index} gutter="0.25rem" />
              ))
              .reverse()}
          </section>
        </>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Collages;

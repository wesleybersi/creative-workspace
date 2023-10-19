import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";
import styles from "./research.module.scss";

const _Research = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Research">
        <>
          <div className={styles.pair}>
            <p>Rock Plower</p>
            <p>Automatically remove rocks when plowing.</p>
          </div>
          <div className={styles.pair}>
            <p>Harvester I</p>
            <p>The ability to hold up to three items when harvesting.</p>
            <div>Cost: 250 carrots</div>
          </div>
        </>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Research;

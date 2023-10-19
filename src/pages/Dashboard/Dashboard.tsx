import React, { useEffect, useState } from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import styles from "./dashboard.module.scss";
import useStore from "../../store/store";

const _Dashboard = () => {
  const { client: farmer } = useStore();
  const [totalCrops, setTotalCrops] = useState<number>(0);
  const [readyCrops, setReadyCrops] = useState<number>(0);
  const [totalBeds, setTotalBeds] = useState<number>(0);

  useEffect(() => {
    let beds = 0;
    let crops = 0;
    let cropsReady = 0;
    for (const plot of farmer.collages) {
      for (const row of plot.tiles) {
        for (const bed of row) {
          beds++;
          if (bed.crop) {
            if (bed.crop.isReadyToHarvest) {
              cropsReady++;
            }
            crops++;
          }
        }
      }
    }
    setTotalCrops(crops);
    setReadyCrops(cropsReady);
    setTotalBeds(beds);
  }, [farmer.collages]);

  return (
    <>
      <Center title="Dashboard">
        <></>
        {/* <>
          <p style={{ fontWeight: 500 }}>Crops</p>
          <section className={styles.section}>
            <div className={styles.element}>
              <header>Total beds</header>
              <div className={styles.content}>
                <span>{totalBeds}</span>
              </div>
            </div>
            <div className={styles.element}>
              <header>Total crops</header>
              <div className={styles.content}>
                <span>{totalCrops}</span>
              </div>
            </div>
            <div className={styles.element}>
              <header>Ready for harvest</header>
              <div className={styles.content}>
                <span>{readyCrops}</span>
              </div>
            </div>
          </section>
          <p style={{ fontWeight: 500 }}>Economy</p>
          <section className={styles.section}>
            <div className={styles.element}>
              <header>Economy</header>
            </div>
            <div className={styles.element}>
              <header>Messages</header>
            </div>
          </section>
          <section></section>
        </> */}
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Dashboard;

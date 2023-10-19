import { useEffect, useState } from "react";
import useStore from "../../store/store";
import styles from "./status.module.scss";
import { FaCoins as IconMoney } from "react-icons/fa";
import { BsGrid1X2 as IconLand } from "react-icons/bs";
import { random } from "../../utils/helper-functions";
import { BsCloudSun as IconForecast } from "react-icons/bs";
import UserIcon from "../UserIcon/UserIcon";

const Status = () => {
  const { client } = useStore();
  const { collages } = client;

  return (
    <section className={styles.wrapper}>
      <div className={styles.icon}>
        <UserIcon />
        <h3>{client.name}</h3>
      </div>
    </section>
  );
};

export default Status;

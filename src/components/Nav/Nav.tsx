import styles from "./nav.module.scss";

import { GiFarmer as IconFarmer } from "react-icons/gi";
import { SiHackthebox as IconBox } from "react-icons/si";
import { BsGrid3X3 as IconLand } from "react-icons/bs";
import { MdScience as IconResearch } from "react-icons/md";
import { GrMoney as IconMoney } from "react-icons/gr";
import { FaExchangeAlt as IconTrade } from "react-icons/fa";
import { MdOutlineLocalGroceryStore as IconStore } from "react-icons/md";
import { BsCloudSun as IconForecast } from "react-icons/bs";

import { BsPersonLinesFill as IconFarmers } from "react-icons/bs";
import { MdLeaderboard as IconLeaderboard } from "react-icons/md";

import { RiDashboard2Fill as IconDashboard } from "react-icons/ri";

import { GiThreeFriends as IconColleagues } from "react-icons/gi";
import useStore from "../../store/store";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const { client: farmer } = useStore();

  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to="dashboard">
          <IconDashboard size="18px" />
          Dashboard
        </NavLink>
        <NavLink to="collages">
          <IconLand size="18px" /> My boards
        </NavLink>

        <NavLink to="supply-store">
          <IconStore size="18px" /> Supply Store
        </NavLink>
      </ul>
      <ul>
        <NavLink to={`farmer/${farmer.id}`}>
          <IconFarmer size="18px" />
          Farmer Profile
        </NavLink>
        <NavLink to="social-square">
          <IconColleagues size="18px" />
          Social Square
        </NavLink>
      </ul>
      <ul>
        <NavLink to="active-farmers">
          <IconFarmers size="18px" /> Active farmers
        </NavLink>
        <NavLink to="farmers-market">
          <IconTrade size="18px" />
          Farmer's Market
        </NavLink>
        <NavLink to="leaderboards">
          <IconLeaderboard size="18px" />
          Leaderboards
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;

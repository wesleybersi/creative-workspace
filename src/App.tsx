import { useEffect } from "react";
import styles from "./App.module.scss";
import Nav from "./components/Nav/Nav";

import Status from "./components/Status/Status";

import useStore from "./store/store";
import Tooltip from "./components/Tooltip/Tooltip";

import { Route, Routes, useNavigate } from "react-router-dom";
import _Dashboard from "./pages/Dashboard/Dashboard";
import _Inventory from "./pages/Inventory/Inventory";
import _Collages from "./pages/Collages/Collages";
import _Equipment from "./pages/Equipment/Equipment";
import _Economics from "./pages/Economics/Economics";
import _Research from "./pages/Research/Research";
import _SupplyStore from "./pages/SupplyStore/SupplyStore";
import _Profile from "./pages/Profile/Profile";
import _SocialSquare from "./pages/SocialSquare/SocialSquare";
import _NewCollage from "./pages/Collages/components/NewCollage/NewCollage";
import _Forecast from "./pages/Forecast/Forecast";

function App() {
  const navigate = useNavigate();
  const { client, set } = useStore();

  const routes = [
    { name: "Dashboard", path: "dashboard", element: <_Dashboard /> },
    { name: "Inventory", path: "inventory", element: <_Inventory /> },
    {
      name: "Collages",
      path: "collages",
      element: <_Collages />,
    },

    { name: "Equipment", path: "equipment", element: <_Equipment /> },
    { name: "Economics", path: "economics", element: <_Economics /> },
    { name: "Research", path: "research", element: <_Research /> },
    { name: "Supply Store", path: "supply-store", element: <_SupplyStore /> },
    { name: "Forecast", path: "forecast", element: <_Forecast /> },
    {
      name: "Profile",
      path: `farmer/${client.id}`,
      element: <_Profile farmer={client} />,
    },
    {
      name: "Social Square",
      path: "social-square",
      element: <_SocialSquare />,
    },
  ];

  useEffect(() => {
    navigate("collages");
  }, []);

  return (
    <div
      className={styles.App}
      onMouseDown={() => set({ isMouseDown: true })}
      onMouseUp={() => set({ isMouseDown: false })}
    >
      <header>
        <section style={{ justifyContent: "flex-end" }}>
          <h2>SocialGrid</h2>
        </section>
      </header>
      <main>
        <Left>
          <>
            <Status />
            <Nav />
          </>
        </Left>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route path={path} element={element} />
          ))}
          {client.collages.map(({ name }, index) => (
            <Route
              path={`collages/collage${(index + 1).toString()}`}
              element={<_NewCollage index={index} />}
            />
          ))}
        </Routes>
      </main>
      <Tooltip />
    </div>
  );
}

export default App;

export const Left = ({ children }: { children: JSX.Element }) => {
  return (
    <section
      className={styles.left}
      style={{
        flex: 0.5,
      }}
    >
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--padding) * 2)",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export const Center = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element;
}) => {
  return (
    <section className={styles.center} style={{ flex: 2.5 }}>
      {title && <h3>{title}</h3>}
      {children}
    </section>
  );
};

export const Right = ({ children }: { children: JSX.Element }) => {
  return (
    <section
      className={styles.right}
      style={{
        flex: 0.5,
      }}
    >
      {children}
    </section>
  );
};

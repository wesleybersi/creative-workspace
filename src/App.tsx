import { useEffect } from "react";
import styles from "./App.module.scss";
import Nav from "./components/Nav/Nav";

import Status from "./components/Status/Status";

import useStore from "./store/store";
import Tooltip from "./components/Tooltip/Tooltip";

import { Route, Routes, useNavigate } from "react-router-dom";
import _Boards from "./pages/Boards/Boards";
import _Board from "./pages/Board/Board";

function App() {
  const navigate = useNavigate();
  const { client, set, mode } = useStore();

  const routes = [
    {
      name: "Boards",
      path: "boards",
      element: <_Boards />,
    },
  ];

  useEffect(() => {
    navigate("boards");
  }, []);

  return (
    <div
      className={styles.App}
      onMouseDown={() => set({ isMouseDown: true })}
      onMouseUp={() => set({ isMouseDown: false })}
    >
      <header className={styles.header}>
        <section></section>
        <section>
          <h2>Creative Workspace</h2>
        </section>
        <section>
          <button
            style={
              mode === "Edit"
                ? {
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary",
                    color: "white",
                    fontWeight: 600,
                  }
                : {}
            }
            onClick={() => set({ mode: "Edit" })}
          >
            Edit
          </button>
          <button
            style={
              mode === "Interact"
                ? {
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary",
                    color: "white",
                    fontWeight: 600,
                  }
                : {}
            }
            onClick={() => set({ mode: "Interact" })}
          >
            Interact
          </button>
        </section>
      </header>

      <Routes>
        {routes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
        {client.collages.map(({ name }, index) => (
          <Route
            path={`boards/board${(index + 1).toString()}`}
            element={<_Board index={index} />}
          />
        ))}
      </Routes>
      <Tooltip />
    </div>
  );
}

export default App;

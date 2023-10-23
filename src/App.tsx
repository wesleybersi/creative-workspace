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
  const { boards, set, mode, cursor, cellSize } = useStore();

  useEffect(() => {
    const base = Math.round(cellSize * 0.28);
    document.body.style.setProperty("--cell-size", `${cellSize}px`);
    document.body.style.setProperty("--font-size", `${base}px`);
    document.body.style.setProperty("--pad", `${base}px`);
    document.body.style.setProperty("--half-pad", `${base / 2}px`);
    document.body.style.setProperty("--semi-pad", `${base * 1.5}px`);
    document.body.style.setProperty("--double-pad", `${base * 2}px`);
  }, [cellSize]);

  const routes = [
    {
      name: "Boards",
      path: "boards",
      element: <_Boards />,
    },
  ];

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  useEffect(() => {
    navigate("boards");
  }, []);

  return (
    <div
      className={`${styles.App} ${cursor === "grab" && styles.grab}`}
      onMouseDown={() => set({ isMouseDown: true })}
      onMouseUp={() => set({ isMouseDown: false })}
    >
      <header className={styles.header}>
        <section>
          <h3>Interactive Boards</h3>
        </section>
        <section></section>
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
          <button
            style={
              mode === "Share"
                ? {
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary",
                    color: "white",
                    fontWeight: 600,
                  }
                : {}
            }
            onClick={() => set({ mode: "Share" })}
          >
            Share
          </button>
        </section>
      </header>

      <Routes>
        {routes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
        {boards.length > 0 &&
          boards.map((_, index) => (
            <Route
              path={`boards/board${index + 1}`}
              element={<_Board index={index} />}
            />
          ))}
      </Routes>
      <Tooltip />
    </div>
  );
}

export default App;

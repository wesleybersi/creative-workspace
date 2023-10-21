import useStore from "../../store/store";
import Grid from "./components/Grid/Grid";

import useSelection from "./hooks/useSelection";
import Toolbar from "./components/Toolbar/Toolbar";
import { useEffect } from "react";

import styles from "./board.module.scss";

const _Board = ({ index }: { index: number }) => {
  const {
    set,
    mode,
    boards,
    deleteSection,
    selection,
    selectedSection,
    isEditingSection,
  } = useStore();
  useSelection(selection, boards[index]);
  const board = boards[index];

  useEffect(() => {
    if (selectedSection) {
      set({ selectedType: null });
    }

    function keydown(event: KeyboardEvent) {
      switch (event.key) {
        case "Delete":
        case "Backspace":
          if (selectedSection && !isEditingSection) {
            deleteSection(board.id, selectedSection.id);
          }
          break;
      }
    }
    window.addEventListener("keydown", keydown);

    return () => window.removeEventListener("keydown", keydown);
  }, [selectedSection, isEditingSection]);

  useEffect(() => {
    if (mode === "Interact") {
      set({ selectedSection: null });
    }
  }, [mode]);

  return (
    <main className={styles.wrapper}>
      {
        <div
          className={styles.overlay}
          style={{ opacity: isEditingSection ? 1 : 0 }}
        ></div>
      }
      {mode === "Edit" && <Toolbar />}
      <Grid board={board} />
    </main>
  );
};

export default _Board;

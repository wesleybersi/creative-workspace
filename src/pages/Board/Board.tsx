import useStore from "../../store/store";
import Grid from "./components/Grid/Grid";
import useCollage from "./local-store/useCollage";
import useSelection from "./hooks/useSelection";
import Toolbar from "./components/Toolbar/Toolbar";
import { useEffect } from "react";

import styles from "./board.module.scss";

const _Board = ({ index }: { index: number }) => {
  const { set, selection, selectedSection, draggedSection } = useCollage();
  const { mode, boards, deleteSection: clearSection, isMouseDown } = useStore();
  useSelection(selection, boards[index]);
  const board = boards[index];

  useEffect(() => {
    if (selectedSection) {
      set({ selectedType: null });
    }

    function keydown(event: KeyboardEvent) {
      if (event.key === "[") {
        set({ selectedSection: null });
      } else if (event.key === "]") {
        if (selectedSection) clearSection(board.id, selectedSection.id);
      }
    }
    window.addEventListener("keydown", keydown);

    return () => window.removeEventListener("keydown", keydown);
  }, [selectedSection]);

  useEffect(() => {
    if (!isMouseDown) {
      set({ draggedSection: null });
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (draggedSection !== null) {
      set({ selectedSection: null });
    }
  }, [draggedSection]);

  return (
    <main className={styles.wrapper}>
      {mode === "Edit" && <Toolbar />}
      <Grid board={board} />
    </main>
  );
};

export default _Board;

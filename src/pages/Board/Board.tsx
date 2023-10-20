import useStore from "../../store/store";
import Grid from "./components/Grid/Grid";
import useCollage from "./local-store/useCollage";
import useSelection from "./hooks/useSelection";
import Toolbar from "./components/Toolbar/Toolbar";
import { useEffect } from "react";

import styles from "./board.module.scss";

const _Board = ({ index }: { index: number }) => {
  const { set, selection, selectedSection, collageIndex, draggedSection } =
    useCollage();
  const { mode, client, clearSection, isMouseDown } = useStore();
  useSelection(selection, client.collages[index]);
  const collage = client.collages[index];

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.key === "[") {
        set({ selectedSection: null });
      } else if (event.key === "]") {
        if (selectedSection) clearSection(collageIndex, selectedSection.id);
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
      <Grid collage={collage} />
    </main>
  );
};

export default _Board;

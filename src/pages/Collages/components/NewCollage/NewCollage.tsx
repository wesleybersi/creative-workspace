import { Center } from "../../../../App";
import { Right } from "../../../../App";
import useStore from "../../../../store/store";

import Grid from "./components/Grid/Grid";
import useCollage from "./local-store/useCollage";

import useSelection from "./hooks/useSelection";
import SectionInfo from "./components/SectionInfo/SectionInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TypeSelector from "./components/TypeSelector/TypeSelector";

import styles from "./styles.module.scss";

const _NewCollage = ({ index }: { index: number }) => {
  const { set, selection, selectedSection, collageIndex, draggedSection } =
    useCollage();
  const { client, clearSection, isMouseDown } = useStore();
  useSelection(selection, client.collages[index]);
  const collage = client.collages[index];

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.key === "[") {
        set({ selectedSection: null });
      } else if (event.key === "]") {
        if (selectedSection) clearSection(collageIndex, selectedSection);
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
    <>
      <Center>
        <Grid collage={collage} />
      </Center>
      <Right>
        <SectionInfo />
      </Right>
    </>
  );
};

export default _NewCollage;

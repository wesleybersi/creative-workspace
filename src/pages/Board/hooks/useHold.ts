import { useEffect, useState } from "react";
import Bed from "../../../../../store/data/bed";
import { Tool } from "../../../store/data/tools";
import useCollage from "../local-store/usePlot";
import useStore from "../../../store/store";

export function useHold() {
  const { isMouseDown } = useStore();
  const { set, heldTile, selectedTool, selectedUnlock } = useCollage();
  const [holdTimer, setHoldTimer] = useState<number>(0);

  useEffect(() => {
    if (!heldTile || !isMouseDown) {
      setHoldTimer(0);
      return;
    }

    let delay = 1000;
    if (selectedTool.unlocks) {
      const duration = selectedTool.unlocks[selectedUnlock]?.specs?.duration;
      if (typeof duration !== "number") return;
      delay = duration;
    }

    setTimeout(() => setHoldTimer((prev) => prev + 1), delay);

    switch (selectedTool.name) {
      case "Plow":
      case "Point":
      case "Harvest":
        set({ heldTile: null });
        return;
      case "Plant":
        {
          if (!heldTile.isPlowed || heldTile.crop || !selectedTool.unlocks) {
            set({ heldTile: null });
            return;
          }
          if (holdTimer < 100) return;

          heldTile?.plantCrop("Magic Bean");
          set({ heldTile: null });
        }
        break;
      case "Irrigate":
        {
          if (
            heldTile.isWatered ||
            !heldTile.isPlowed ||
            !selectedTool.unlocks
          ) {
            set({ heldTile: null });
            return;
          }
          if (holdTimer < 100) return;

          heldTile.isWatered = true;
          set({ heldTile: null });
        }
        break;

      default:
        return;
    }
  }, [heldTile, holdTimer, isMouseDown]);

  return holdTimer;
}

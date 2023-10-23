import { useEffect, useState } from "react";
import Section from "../../../../../../../store/data/section";
import useStore from "../../../../../../../store/store";
import Carousel from "../../../../../../../store/data/area";

export type Handle = "tl" | "tr" | "tc" | "bc" | "bl" | "br" | "cl" | "cr";

function useHandles(
  area: Carousel,
  ref: HTMLDivElement | null
): [Handle[], Handle | "", React.Dispatch<React.SetStateAction<"" | Handle>>] {
  const handles: Handle[] = ["tl", "tr", "tc", "bc", "bl", "br", "cr", "cl"];
  const [currentHandle, setCurrentHandle] = useState<Handle | "">("");
  const { expandSection } = useStore();

  useEffect(() => {
    if (!currentHandle || !ref) return;
    window?.getSelection()?.removeAllRanges();
    function mousemove(event: MouseEvent) {
      if (!currentHandle || !ref) return;
      const x = event.clientX;
      const y = event.clientY;
      const rect = ref?.getBoundingClientRect();
      const offset = 32;
      let direction: "in" | "out" = "in";
      let isResize = false;
      let handle = currentHandle;
      if (!rect) return;

      switch (currentHandle) {
        case "tl":
          {
            const isUp = y < rect.top - offset;
            const isDown = y > rect.top + offset;
            const isRight = x > rect.left + offset;
            const isLeft = x < rect.left - offset;
            if (isUp) {
              if (isRight) {
                direction = "in";
              } else if (isLeft) {
                direction = "out";
              } else {
                direction = "out";
                handle = "tc";
              }
            } else if (isDown) {
              if (isRight) {
                direction = "in";
              } else if (isLeft) {
                direction = "out";
              } else {
                direction = "in";
                handle = "tc";
              }
            } else if (isLeft || isRight) {
              direction = isRight ? "in" : "out";
              handle = "cl";
            } else break;
            isResize = true;
          }
          break;
        case "tr":
          {
            const isUp = y < rect.top - offset;
            const isDown = y > rect.top + offset;
            const isLeft = x < rect.right - offset;
            const isRight = x > rect.right + offset;
            if (isUp) {
              if (isRight) {
                direction = "out";
              } else if (isLeft) {
                direction = "in";
              } else {
                direction = "out";
                handle = "tc";
              }
            } else if (isDown) {
              if (isRight) {
                direction = "out";
                handle = "cr";
              } else if (isLeft) {
                direction = "in";
              } else {
                direction = "in";
                handle = "tc";
              }
            } else if (isLeft || isRight) {
              direction = isLeft ? "in" : "out";
              handle = "cr";
            } else break;
            isResize = true;
          }
          break;

        case "tc":
          if (y < rect.top - offset) {
            direction = "out";
          } else if (y > rect.top + offset) {
            direction = "in";
          } else break;
          isResize = true;
          break;
        case "cl":
          if (x < rect.left - offset) {
            direction = "out";
          } else if (x > rect.left + offset) {
            direction = "in";
          } else break;
          isResize = true;
          break;
        case "cr":
          if (x > rect.right + offset) {
            direction = "out";
          } else if (x < rect.right - offset) {
            direction = "in";
          } else break;
          isResize = true;
          break;
        case "bl":
          {
            const isUp = y < rect.bottom - offset;
            const isDown = y > rect.bottom + offset;
            const isRight = x > rect.left + offset;
            const isLeft = x < rect.left - offset;
            if (isUp) {
              if (isRight) {
                direction = "in";
              } else if (isLeft) {
                direction = "out";
                handle = "cl";
              } else {
                direction = "in";
                handle = "bc";
              }
            } else if (isDown) {
              if (isRight) {
                direction = "in";
                handle = "cl";
              } else if (isLeft) {
                direction = "out";
              } else {
                direction = "out";
                handle = "bc";
              }
            } else if (isLeft || isRight) {
              direction = isRight ? "in" : "out";
              handle = "cl";
            } else break;
            isResize = true;
          }
          break;
        case "br":
          {
            const isUp = y < rect.bottom - offset;
            const isDown = y > rect.bottom + offset;
            const isLeft = x < rect.right - offset;
            const isRight = x > rect.right + offset;
            if (isUp) {
              if (isRight) {
                direction = "out";
              } else if (isLeft) {
                direction = "in";
              } else {
                direction = "in";
                handle = "bc";
              }
            } else if (isDown) {
              if (isRight) {
                direction = "out";
              } else if (isLeft) {
                direction = "in";
              } else {
                direction = "out";
                handle = "bc";
              }
            } else if (isLeft || isRight) {
              direction = isLeft ? "in" : "out";
              handle = "cr";
            } else break;
            isResize = true;
          }
          break;
        case "bc":
          if (y > rect.bottom + offset) {
            direction = "out";
          } else if (y < rect.bottom - offset) {
            direction = "in";
          } else break;
          isResize = true;
          break;
      }
      if (isResize) {
        expandSection(area.boardId, area.id, direction, handle);
      }
    }
    window.addEventListener("mousemove", mousemove);
    return () => window.removeEventListener("mousemove", mousemove);
  }, [currentHandle, ref]);

  return [handles, currentHandle, setCurrentHandle];
}

export default useHandles;

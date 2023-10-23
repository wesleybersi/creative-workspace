import { useEffect, useLayoutEffect, useState } from "react";
import useStore from "../../../../../../../store/store";

import Carousel from "../../../../../../../store/data/area";

interface DragData {
  x: number;
  y: number;
  width: number;
  height: number;
  initialPointerPosition: { x: number; y: number };
}

export default function useDragSection(
  isDragEnabled: boolean,
  area: Carousel,
  areaRef: HTMLDivElement | null,
  gridRef: HTMLDivElement | null
): {
  dragData: DragData | null;
  setDragEvent: React.Dispatch<
    React.SetStateAction<React.MouseEvent<HTMLElement, MouseEvent> | null>
  >;
} {
  const { setNewSectionPosition, isMouseDown, cellSize } = useStore();
  //Dragging section
  const timeUntilDragEnabled = 12;
  const [dragHoldTimer, setDragHoldTimer] = useState<number>(0);
  const [dragEvent, setDragEvent] = useState<React.MouseEvent<
    HTMLElement,
    MouseEvent
  > | null>(null);
  const [dragData, setDragData] = useState<DragData | null>(null);

  useLayoutEffect(() => {
    if (isMouseDown) {
      if (!dragEvent || !isDragEnabled) return;
      if (dragHoldTimer < timeUntilDragEnabled) {
        setTimeout(() => setDragHoldTimer((prev) => prev + 1), 10);
      } else if (dragHoldTimer >= timeUntilDragEnabled) {
        setDragHoldTimer(0);
        if (!areaRef) return;

        setDragData({
          width: areaRef.offsetWidth,
          height: areaRef.offsetHeight,
          x: 0,
          y: 0,
          initialPointerPosition: {
            x: dragEvent.clientX,
            y: dragEvent.clientY,
          },
        });
        setDragEvent(null);
      }
    } else {
      const calculateDropTarget = () => {
        if (!gridRef || !areaRef) return;

        //Position relative to viewport
        const sectionRect = areaRef.getBoundingClientRect();
        const sectionX = sectionRect.left;
        const sectionY = sectionRect.top;
        const gridY = gridRef.offsetTop;
        const gridX = gridRef.offsetLeft;

        // Calculate the row and column based on mouse position
        const row = Math.floor((sectionY - gridY) / cellSize);
        const col = Math.floor((sectionX - gridX) / cellSize);

        setNewSectionPosition(area.boardId, area.id, {
          row: row,
          col: col - 1,
        });
      };
      if (dragData) calculateDropTarget();
      setDragHoldTimer(0);
      setDragEvent(null);
      setDragData(null);
    }
  }, [dragHoldTimer, isMouseDown, dragEvent, isDragEnabled, cellSize]);

  useEffect(() => {
    function mousemove(event: MouseEvent) {
      if (!dragData) return;
      const { x: initialX, y: initialY } = dragData.initialPointerPosition;
      const { clientX: currentX, clientY: currentY } = event;

      //Both x and y are relative to the position within the grid.
      const x = currentX - initialX;
      const y = currentY - initialY;

      setDragData(
        (prev) =>
          prev && {
            ...prev,
            x,
            y,
          }
      );
    }

    window.addEventListener("mousemove", mousemove);
    return () => window.removeEventListener("mousemove", mousemove);
  }, [dragData]);

  return { dragData, setDragEvent };
}

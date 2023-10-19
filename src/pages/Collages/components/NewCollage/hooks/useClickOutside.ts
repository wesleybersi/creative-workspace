import { useRef, useEffect, useState } from "react";

const useClickOutside = (
  element: HTMLElement | null
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [outsideClick, setOutsideClick] = useState<boolean>(false);

  function clickHandler(event: MouseEvent) {
    if (element) {
      if (!element.contains(event.target as Node)) {
        setOutsideClick(true);
      } else {
        setOutsideClick(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickHandler, true);
    return () => window.removeEventListener("click", clickHandler, true);
  }, [element]);

  return [outsideClick, setOutsideClick];
};

export default useClickOutside;

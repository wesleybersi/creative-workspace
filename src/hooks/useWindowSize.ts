import { useState, useEffect, useCallback } from "react";

export interface Dimensions {
    width: number;
    height: number;
}

const useWindowSize = (): [Dimensions, boolean] => {
    const [windowSize, setWindowSize] = useState<{
        width: number;
        height: number;
    }>({ width: window.innerWidth, height: window.innerHeight });
    const [resizing, setResizing] = useState<boolean>(false);

    function resizeHandler() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        setResizing(true);
    }

    useEffect(() => {
        setTimeout(() => setResizing(false), 500);
    }, [resizing]);

    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return [windowSize, resizing];
};

export default useWindowSize;

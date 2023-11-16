import { useCallback, useEffect, useState } from "react";

import type { Dimension } from "types";

const getWindowSize = (): Dimension => {
  return { h: window.innerHeight, w: window.innerWidth };
};

const useWindowSize = (): Dimension => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const handleResize = useCallback(() => {
    setWindowSize(getWindowSize());
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
};

export { useWindowSize };

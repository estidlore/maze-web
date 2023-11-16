import { obj } from "litus";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Dimension } from "types";
import { MazeDrawer } from "utils/drawing";
import { MazeGenerator } from "utils/generation";
import { useWindowSize } from "utils/hooks";

const mazeOptions = {
  large: { cells: 2500, delay: 0 },
  medium: { cells: 500, delay: 50 },
  small: { cells: 100, delay: 200 },
};

const App = (): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();
  const canvasSize = useMemo((): Dimension => {
    return { h: 0.9 * windowSize.h, w: 0.9 * windowSize.w };
  }, [windowSize]);

  const [size, setSize] = useState<keyof typeof mazeOptions>("large");
  const onSelectSize = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      setSize(ev.target.value as keyof typeof mazeOptions);
    },
    [],
  );

  useEffect(() => {
    const canvas = ref.current;
    if (canvas !== null) {
      const option = mazeOptions[size];
      const k = Math.sqrt(option.cells / (canvasSize.w * canvasSize.h));
      const mazeSize: Dimension = {
        h: Math.round(k * canvasSize.h),
        w: Math.round(k * canvasSize.w),
      };

      const generator = new MazeGenerator(mazeSize);
      const drawer = new MazeDrawer(generator.maze, canvas);
      let cancel = false;
      (async () => {
        while (generator.nextStep() && !cancel) {
          drawer.draw();
          generator.edges.forEach((edge) => {
            drawer.fillCell(edge, "gray");
          });
          await new Promise((res) => setTimeout(res, option.delay));
        }
      })();

      return () => {
        cancel = true;
      };
    }
  }, [canvasSize, ref.current, size]);

  return (
    <div className={"bg-gray-900 min-h-screen text-gray-100"}>
      <div className={"flex flex-col items-center justify-center py-6"}>
        <p className={"font-bold mb-4 text-3xl"}>{"Maze generation"}</p>
        <select
          className={"bg-gray-900 border-2 border-gray-100 px-2 py-1 rounded"}
          onChange={onSelectSize}
          value={size}
        >
          {obj.keys(mazeOptions).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
        <canvas
          className={"my-2"}
          height={canvasSize.h}
          id={"maze-canvas"}
          ref={ref}
          width={canvasSize.w}
        />
      </div>
    </div>
  );
};

export { App };

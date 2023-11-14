import { Dimension, Point } from "types";

import { MazeCell } from "./types";

class Maze {
  cells: MazeCell[][];

  constructor(cells: MazeCell[][]) {
    this.cells = cells;
  }

  getWalls = (): [Point, Point][] => {
    const { cells } = this;
    const { h, w } = this.getSize();
    const walls: [Point, Point][] = [
      [
        { x: 0, y: h },
        { x: w, y: h },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: h },
      ],
      [
        { x: w, y: 0 },
        { x: w, y: h },
      ],
      [
        { x: 0, y: 0 },
        { x: w, y: 0 },
      ],
    ];
    for (let i = 1; i < w; i++) {
      let hadLeftWall = false;
      for (let j = 0; j < h; j++) {
        const { left } = cells[i][j];
        if (left) {
          if (hadLeftWall) {
            const last = walls[walls.length - 1];
            last[1].y = j + 1;
          } else {
            walls.push([
              { x: i, y: j },
              { x: i, y: j + 1 },
            ]);
          }
        }
        hadLeftWall = left;
      }
    }
    for (let j = 1; j < h; j++) {
      let hadUpWall = false;
      for (let i = 0; i < w; i++) {
        const { up } = cells[i][j];
        if (up) {
          if (hadUpWall) {
            const last = walls[walls.length - 1];
            last[1].x = i + 1;
          } else {
            walls.push([
              { x: i, y: j },
              { x: i + 1, y: j },
            ]);
          }
        }
        hadUpWall = up;
      }
    }
    return walls;
  };

  public getSize = (): Dimension => {
    return { h: this.cells[0].length, w: this.cells.length };
  };
}

export { Maze };

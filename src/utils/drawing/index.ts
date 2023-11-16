import { Dimension, Point } from "types";
import { Maze } from "utils/maze";

class MazeDrawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  maze: Maze;

  constructor(maze: Maze, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.maze = maze;
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) {
      throw Error("2d canvas context is null");
    }
    this.ctx = ctx;

    const cellSize = this.getCellSize();
    ctx.lineCap = "round";
    ctx.lineWidth = Math.ceil(Math.min(cellSize.w, cellSize.h) / 20) * 2;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
  }

  draw = () => {
    const { canvas, ctx, drawWall } = this;

    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();

    for (const wall of this.maze.getWalls()) {
      drawWall(wall[0], wall[1]);
    }
  };

  drawWall = (a: Point, b: Point): void => {
    const { ctx } = this;
    const cellSize = this.getCellSize();
    ctx.beginPath();
    ctx.moveTo(a.x * cellSize.w, a.y * cellSize.h);
    ctx.lineTo(b.x * cellSize.w, b.y * cellSize.h);
    ctx.stroke();
  };

  fillCell = (point: Point, color: string): void => {
    const { x, y } = point;
    const { ctx } = this;
    const { fillStyle } = ctx;
    const cellSize = this.getCellSize();
    const margin = Math.ceil(ctx.lineWidth / 2);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(
      x * cellSize.w + margin,
      y * cellSize.h + margin,
      cellSize.w - 2 * margin,
      cellSize.h - 2 * margin,
    );
    ctx.stroke();
    ctx.fillStyle = fillStyle;
  };

  getCellSize = (): Dimension => {
    const { canvas } = this;
    const size = this.maze.getSize();
    return { h: canvas.height / size.h, w: canvas.width / size.w };
  };
}

export { MazeDrawer };

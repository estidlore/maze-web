import { Dimension, Direction, Point, directions } from "types";
import { Maze } from "utils/maze";
import { MazeCell } from "utils/maze/types";

import type { MazeCellVisit } from "./types";

const oppositeDirections: Record<Direction, Direction> = {
  down: "up",
  left: "right",
  right: "left",
  up: "down",
};
const deltas: Record<Direction, Point> = {
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
};
const move = (point: Point, direction: Direction): Point => {
  const delta = deltas[direction];
  return { x: point.x + delta.x, y: point.y + delta.y };
};

const random = (n: number): number => Math.floor(Math.random() * n);

class MazeGenerator {
  edges: Point[];
  maze: Maze;
  start: Point;
  visits: MazeCellVisit[][];

  constructor(size: Dimension) {
    const cells: MazeCell[][] = new Array(size.w);
    const visits = new Array<MazeCellVisit[]>(size.w);
    for (let i = 0; i < size.w; i++) {
      const column = new Array<MazeCell>(size.h);
      const visitsColumn = new Array<MazeCellVisit>(size.h);
      for (let j = 0; j < size.h; j++) {
        column[j] = { down: true, left: true, right: true, up: true };
        visitsColumn[j] = { mazeSides: [], visited: false };
      }
      cells[i] = column;
      visits[i] = visitsColumn;
    }

    this.maze = new Maze(cells);
    this.start = { x: random(size.w), y: random(size.h) };
    this.edges = [this.start];
    this.visits = visits;
    this.spawn();
  }

  isComplete = (): boolean => {
    return this.edges.length === 0;
  };

  nextStep = (): boolean => {
    if (this.isComplete()) {
      return false;
    }
    const { cells } = this.maze;

    const edge = this.spawn();
    const { mazeSides } = this.visits[edge.x][edge.y];
    const side = mazeSides[random(mazeSides.length)];
    cells[edge.x][edge.y][side] = false;
    const neighboor = move(edge, side);
    cells[neighboor.x][neighboor.y][oppositeDirections[side]] = false;

    return true;
  };

  private spawn = () => {
    const { edges, visits } = this;
    const { h, w } = this.maze.getSize();

    const idx = random(edges.length);
    const edge = edges[idx];
    visits[edge.x][edge.y].visited = true;
    edges[idx] = edges[edges.length - 1];
    edges.pop();

    directions.forEach((direction) => {
      const point = move(edge, direction);
      if (point.x < 0 || point.x >= w || point.y < 0 || point.y >= h) {
        return;
      }
      const visit = visits[point.x][point.y];
      if (!visit.visited) {
        const { mazeSides } = visit;
        if (mazeSides.length === 0) {
          edges.push(point);
        }
        mazeSides.push(oppositeDirections[direction]);
      }
    });
    return edge;
  };
}

export { MazeGenerator };

import { Direction } from "types";

interface MazeCellVisit {
  mazeSides: Direction[];
  visited: boolean;
}

export type { MazeCellVisit };

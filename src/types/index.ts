const directions = ["down", "left", "right", "up"] as const;
type Direction = (typeof directions)[number];

type Point = Record<"x" | "y", number>;
type Dimension = Record<"h" | "w", number>;

export { directions };
export type { Dimension, Direction, Point };

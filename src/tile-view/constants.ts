export interface MoveDirectionsInterface {
    w: number[];
    a: number[];
    s: number[];
    d: number[];
}
export const MOVE_DIRECTIONS: MoveDirectionsInterface = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
};

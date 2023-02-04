export const TILE_SIZE = 32;

export const MAP_DIMENSIONS2 = {
    COLS: 17,
    ROWS: 13,
    TILE_SIZE,
};
export const MAP_DIMENSIONS = {
    COLS: 17,
    ROWS: 15,
    TILE_SIZE,
};
export const MAP_TILE_IMAGES = {
    0: 'assets/map/PineTools.com_files/row-1-column-1.png', // transparent
    1: 'assets/map/PineTools.com_files/row-1-column-2.png', // grass
    16: 'assets/map/PineTools.com_files/row-1-column-6.png', // ground
    26: 'assets/map/PineTools.com_files/row-2-column-6.png', // tree top
    35: 'assets/map/PineTools.com_files/row-3-column-5.png', // tree row middle
    36: 'assets/map/PineTools.com_files/row-3-column-6.png', // tree bottom
    67: 'assets/map/PineTools.com_files/row-6-column-7.png', // small grass
    68: 'assets/map/PineTools.com_files/row-6-column-8.png', // small grass 2
    81: 'assets/map/PineTools.com_files/row-8-column-1.png', // big tree top left
    82: 'assets/map/PineTools.com_files/row-8-column-2.png', // big tree top right
    91: 'assets/map/PineTools.com_files/row-9-column-1.png', // big tree bottom left
    92: 'assets/map/PineTools.com_files/row-9-column-2.png', // big tree bottom right
    88: 'assets/map/PineTools.com_files/row-8-column-8.png', // yellow flower
    5: 'assets/map/stone_2_brown1.png',
    25: 'assets/map/PineTools.com_files/row-2-column-5.png', //bush
    104: 'assets/map/PineTools.com_files/row-10-column-4.png', // cactus
    114: 'assets/map/PineTools.com_files/row-11-column-4.png', // plant2
    63: 'assets/map/PineTools.com_files/row-6-column-3.png', //pot broken
    15: 'assets/map/PineTools.com_files/row-1-column-5.png', //water
    131: 'assets/map/PineTools.com_files/row-13-column-1.png', //water left top corner
    132: 'assets/map/PineTools.com_files/row-13-column-2.png', //water right top corner
    1331: 'assets/map/PineTools.com_files/row-13-column-3-1.png', //water middle up
    1341: 'assets/map/PineTools.com_files/row-13-column-4-1.png', //water middle right
    1441: 'assets/map/PineTools.com_files/row-14-column-4-1.png', //water middle down
    1431: 'assets/map/PineTools.com_files/row-14-column-3-1.png', //water middle left
    141: 'assets/map/PineTools.com_files/row-14-column-1.png', //water left bottom corner
    142: 'assets/map/PineTools.com_files/row-14-column-2.png', //water right bottom corner
};

export const LAYERS = [
    [
        [16, 16, 16, 16, 16, 16,  16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
        [16, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1,1, 1, 16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 1, 1, 1, 1, 131, 132, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 1, 1, 1, 131, 15, 1341, 1, 1, 1, 1, 1, 1, 1,1, 1, 16],
        [16, 1, 1, 131, 15, 15, 1341, 1, 1, 1, 1, 1, 1,1,1, 1, 16],
        [16, 1, 1, 141, 15, 15, 15, 132, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 1, 1, 1, 141, 15, 15, 15, 132, 1, 1, 1, 1, 1, 1, 1,  16],
        [16, 1, 1, 1, 1, 141, 1441, 1441, 142, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,16],
        [16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],

    ],
    [
        [35, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 35],
        [35, 35, 35, 35, 35, 35, 67, 68, 1, 1, 1, 1, 1, 1, 88, 88, 35],
        [35, 35, 36, 36, 36, 36, 68, 1, 1, 1, 1, 1,  1, 1, 88, 1, 35],
        [35, 35, 1, 1, 104, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 35],
        [35, 36, 1, 1, 1, 0, 0, 1, 1, 1,  1, 1, 25, 1, 1, 1, 35],
        [35, 1, 1, 1, 0, 0, 0, 1, 1, 1, 67, 68, 68, 1, 1, 1, 35],
        [35, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,  1, 67, 1, 1, 1, 35],
        [35, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,  1, 1, 1, 1, 1, 35],
        [35, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,25, 25, 35],
        [35, 1, 1, 63, 1, 0, 0, 0, 0, 1, 1, 1, 1,  67, 104, 1, 35],
        [35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 35],
        [35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,81, 82,  1, 35],
        [35, 1, 1, 67, 25,  1, 1, 1, 1, 1, 1,  81, 82, 91, 92, 1, 35],
        [35, 26, 1, 88, 25,104, 26, 1, 1, 1, 67,91, 92,  1, 1, 88, 35],
        [35, 35, 26, 25, 68, 67,35, 26, 26, 26, 26, 26,26, 81, 82, 1, 35],
    ],
];

export const MOVE_DIRECTIONS = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
};

export const SOLID_TILES = [15, 25,26,35,36, 63, 104, 114, 81,82,91,92,88, 131, 132, 1311, 133, 1341, 134, 141, 142, 1431, 143, 1441, 144];

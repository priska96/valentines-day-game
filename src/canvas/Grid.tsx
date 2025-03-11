import { MAP_DIMENSIONS, TILE_SIZE } from '@/tile-view/maps/mapData';
import { Line } from 'react-konva';

export const Grid = () => {
    const { COLS, ROWS } = MAP_DIMENSIONS;
    const gridTileLength = TILE_SIZE / 2;
    return (
        <>
            {Array.from(
                { length: MAP_DIMENSIONS.ROWS },
                (value, index) => index
            ).map((row) => {
                return (
                    <Line
                        key={`row-${row}`}
                        x={0}
                        y={row * gridTileLength}
                        points={[
                            0,
                            row * gridTileLength,
                            COLS * 32,
                            row * gridTileLength,
                        ]}
                        stroke="grey"
                        strokeWidth={0.7}
                    />
                );
            })}
            {Array.from(
                { length: MAP_DIMENSIONS.COLS },
                (value, index) => index
            ).map((col) => {
                return (
                    <Line
                        key={`col-${col}`}
                        x={col * gridTileLength}
                        y={0}
                        points={[
                            col * gridTileLength,
                            0,
                            col * gridTileLength,
                            ROWS * 32,
                        ]}
                        stroke="grey"
                        strokeWidth={0.7}
                    />
                );
            })}
        </>
    );
};

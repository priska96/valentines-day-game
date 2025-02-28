import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { MAP_DIMENSIONS, MapMatrixRow, TILE_SIZE } from './maps/mapData';
import { LAYERS, LayersInterface } from './maps/mapImgs';
import { loadMap } from './slices/statusSlice';
import { RootState } from '../store';

import { Image, Group } from 'react-konva';

const MapKonva: React.FC<PropsFromRedux> = ({
    loadMap,
    map,
}: PropsFromRedux) => {
    const { COLS, ROWS } = MAP_DIMENSIONS;

    useEffect(() => {
        if (
            LAYERS[map as keyof LayersInterface][0] &&
            LAYERS[map as keyof LayersInterface][1]
        ) {
            loadMap(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const drawLayer = (grid: MapMatrixRow) => {
        console.log('draw map');
        const rowArray = Array.from({ length: ROWS }, (value, index) => index);
        const colArray = Array.from({ length: COLS }, (value, index) => index);
        return rowArray.map((i) => {
            return colArray.map((j) => {
                const item = grid[i][j];
                if (!item) {
                    // empty tile
                    return null;
                }
                const img = document.querySelector(
                    `#map-tile-img-${item}`
                ) as CanvasImageSource;

                const x = j * TILE_SIZE;
                const y = i * TILE_SIZE;
                return (
                    <Image
                        key={i + '-' + j}
                        image={img}
                        x={x}
                        y={y}
                        width={TILE_SIZE}
                        height={TILE_SIZE}
                    />
                );
            });
        });
    };

    const layers = LAYERS[map as keyof LayersInterface];
    return <Group>{layers.map((_, idx) => drawLayer(layers[idx]))}</Group>;
};

const mapStateToProps = (state: RootState) => ({ map: state.gameStatus.map });
const mapDispatch = { loadMap };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MapKonva);

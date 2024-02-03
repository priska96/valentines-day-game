import React, {useContext, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {LAYERS, LayersInterface, MAP_DIMENSIONS, TILE_SIZE} from './constants';
import CanvasContext from './canvasContext';
import {loadMap} from './slices/statusSlice';
import {RootState} from "../store";


const Map: React.FC<PropsFromRedux> = ({ loadMap, map }: PropsFromRedux) => {
    const ctx = useContext(CanvasContext);
    console.log("map", ctx)
    const {COLS, ROWS} = MAP_DIMENSIONS;

    useEffect(() => {
        console.log('map effect');
        const drawLayer = (grid: number[][])=> {
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLS; j++) {
                    const item = grid[i][j];
                    if (!item) {
                        // empty tile
                        continue;
                    }                
                    const img = document.querySelector(`#map-tile-img-${item}`);
                    const x = j * TILE_SIZE;
                    const y = i * TILE_SIZE;
                    ctx!.map!.drawImage(
                        img as  HTMLCanvasElement,
                        0,
                        0,
                        TILE_SIZE,
                        TILE_SIZE,
                        x,
                        y,
                        TILE_SIZE,
                        TILE_SIZE,
                    );
                }
            }
        };
        if(ctx && ctx.map) {
            drawLayer(LAYERS[map as keyof LayersInterface][0]);
            drawLayer(LAYERS[map as keyof LayersInterface][1]);
            loadMap(true);
        }
    }, [COLS, ROWS, ctx, loadMap, map]);

    return <></>;
};


const mapStateToProps = (state: RootState) => ({map: state.gameStatus.map})
const mapDispatch = { loadMap };
const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Map);

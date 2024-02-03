import React, {useContext, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {LAYERS, LayersInterface, MAP_DIMENSIONS, TILE_SIZE} from './constants';
import CanvasContext from './canvasContext';
import {loadMap} from './slices/statusSlice';
import {RootState} from "../store";

import { Image , Group} from 'react-konva';

const MapKonva: React.FC<PropsFromRedux> = ({ loadMap, map }: PropsFromRedux) => {
    const ctx = useContext(CanvasContext);
    console.log("map", ctx)
    const {COLS, ROWS} = MAP_DIMENSIONS;

    const drawLayer = (grid: number[][])=> {
        console.log("draw map")
        const rowArray = Array.from({ length: ROWS }, (value, index) => index);
        const colArray = Array.from({ length: COLS }, (value, index) => index);
        return rowArray.map(i =>{
            return colArray.map(j=>{
                const item = grid[i][j];
                if (!item) {
                    // empty tile
                    return null;
                }
                const img = document.querySelector(`#map-tile-img-${item}`) as CanvasImageSource;

                const x = j * TILE_SIZE;
                const y = i * TILE_SIZE;
                return( <Image key={i+"-"+j} image={img} x={x} y={y} width={TILE_SIZE} height={TILE_SIZE}/>)
            })
        })
    };

    return (
        <Group>
            {drawLayer(LAYERS[map as keyof LayersInterface][0])}
            {drawLayer(LAYERS[map as keyof LayersInterface][1])}
        </Group>
    );
};


const mapStateToProps = (state: RootState) => ({map: state.gameStatus.map})
const mapDispatch = { loadMap };
const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(MapKonva);

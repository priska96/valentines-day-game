import React, {useContext, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import Grid from './Grid';
import ImagesBuffer from './ImagesBuffer';
import Map from './Map';
import CanvasContext from './canvasContext';
import {MAP_DIMENSIONS, TILE_SIZE, MAP_TILE_IMAGES} from './constants';

import NPC from "./npc/NPC";
import ObjectNPC from "./objectNPC/ObjectNPC";
import BackgroundView from "./BackgroundView";
import {RootState} from "../store";
import Character from "./character/Character";

const TileView :React.FC<PropsFromRedux>  = ({mapImagesLoaded, gameStatus, character}: PropsFromRedux) => {
    const width = MAP_DIMENSIONS.COLS * TILE_SIZE;
    const height = MAP_DIMENSIONS.ROWS * TILE_SIZE;
    const ctx = useContext(CanvasContext);
console.log("tileview",ctx,  Object.keys(mapImagesLoaded).length === Object.keys(MAP_TILE_IMAGES).length)

//@ts-ignore
    useEffect(() => {
            return () => {
                return () => {
                    ctx  &&ctx.map && ctx.map.clearRect(0, 0, ctx.map.canvas.clientWidth, ctx.map.canvas.clientHeight);
                }
            }
        }, [ctx, gameStatus.map])

    return (
        <>
            <BackgroundView/>
            <ImagesBuffer />
            {Object.keys(mapImagesLoaded).length === Object.keys(MAP_TILE_IMAGES).length &&
                <>
                    <Grid width={width} height={height}>
                        <Map />                
                    </Grid>
                </>
            }
            {gameStatus.mapLoaded && <ObjectNPC/>}

            {gameStatus.mapLoaded && <NPC/>}

            {gameStatus.mapLoaded && <Character/>}
        </>
    );
};

const mapStateToProps = ({mapImagesLoaded, gameStatus, character}: RootState) => ({mapImagesLoaded, gameStatus, character});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TileView);

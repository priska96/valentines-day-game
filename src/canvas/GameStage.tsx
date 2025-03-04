import { RootState } from '@/store';
import CharacterKonva from '@/tile-view/character/CharacterKonva';
import ExplosionKonva from '@/tile-view/ExplosionKonva';
import MapKonva from '@/tile-view/MapKonva';
import { MAP_DIMENSIONS, MAP_TILE_IMAGES2 } from '@/tile-view/maps/mapData';
import NPCKonva from '@/tile-view/npc/NPCKonva';
import ObjectNPCKonva from '@/tile-view/objectNPC/ObjectNPCKonva';
import { Stage, Layer, Image } from 'react-konva';
import { connect, ConnectedProps } from 'react-redux';
import { Grid } from './Grid';
import { GameModeEnum } from '@/tile-view/slices/statusSlice';
import AutotileKonva from '@/tile-view/autotile/AutotileKonva';
import { useEffect, useState } from 'react';

const GameStage = ({
    mode,
    mapImagesLoaded,
    backgroundImg,
}: PropsFromRedux) => {
    const currentMode = mode;
    const { COLS, ROWS } = MAP_DIMENSIONS;
    const [bgImg, setBgImg] = useState<string | null>(backgroundImg[0]);

    useEffect(() => {
        if (
            mode &&
            [GameModeEnum.GO_TO_MERMAID_CITY, GameModeEnum.WHIRLPOOL].includes(
                mode
            )
        ) {
            setBgImg(backgroundImg[1]);
        }
    }, [mode, backgroundImg]);
    if (
        Object.keys(mapImagesLoaded).length <
        Object.keys(MAP_TILE_IMAGES2).length - 1
    ) {
        return <></>;
    }
    return (
        <Stage width={COLS * 32} height={ROWS * 32}>
            <Layer name={'backgrounds'}>
                <Image
                    x={0}
                    y={0}
                    image={
                        document.querySelector(
                            bgImg as string
                        ) as CanvasImageSource
                    }
                />
                <MapKonva />
                <Grid />
            </Layer>
            <Layer>
                <CharacterKonva />
            </Layer>
            <NPCKonva />
            <ObjectNPCKonva />
            <AutotileKonva />
            {currentMode === GameModeEnum.VICTORY_EVIL_QUEEN ? (
                <ExplosionKonva />
            ) : null}
        </Stage>
    );
};

const mapStateToProps = (state: RootState) => ({
    mode: state.gameStatus.mode,
    mapImagesLoaded: state.mapImagesLoaded,
    backgroundImg: state.gameStatus.backgroundImg,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GameStage);

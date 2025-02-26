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

const GameStage = ({
    mode,
    mapImagesLoaded,
    backgroundImg,
}: PropsFromRedux) => {
    const currentMode = mode;
    const { COLS, ROWS } = MAP_DIMENSIONS;

    if (
        Object.keys(mapImagesLoaded).length <
        Object.keys(MAP_TILE_IMAGES2).length - 1
    ) {
        return <></>;
    }
    return (
        <Stage width={COLS * 32} height={ROWS * 32}>
            <Layer name={'skyBackground'}>
                <Image
                    x={0}
                    y={0}
                    image={
                        document.querySelector(
                            backgroundImg as string
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

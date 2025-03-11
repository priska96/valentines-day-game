import CharacterKonva from '@/tile-view/character/CharacterKonva';
import ExplosionKonva from '@/tile-view/ExplosionKonva';
import MapKonva from '@/tile-view/MapKonva';
import { MAP_DIMENSIONS, MAP_TILE_IMAGES2 } from '@/tile-view/maps/mapData';
import NPCKonva from '@/tile-view/npc/NPCKonva';
import ObjectNPCKonva from '@/tile-view/objectNPC/ObjectNPCKonva';
import { Stage, Layer, Image } from 'react-konva';
import { Grid } from './Grid';
import AutotileKonva from '@/tile-view/autotile/AutotileKonva';
import { useEffect, useState } from 'react';
import TextureKonva from '@/tile-view/TextureKonva';
import { useRootStore } from '@/store/useRootStore';
import { GameModeEnum } from '@/store/enums';

const GameStage = () => {
    const { gameStatus, mapImages } = useRootStore();
    const { mode, backgroundImg } = gameStatus;
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
        } else {
            setBgImg(backgroundImg[0]);
        }
    }, [mode, backgroundImg]);

    if (
        mapImages &&
        (Object.keys(mapImages).length <
            Object.keys(MAP_TILE_IMAGES2).length - 1 ||
            Object.keys(mapImages).length === 747)
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
                    scale={{ x: 0.7, y: 0.7 }}
                />
                <MapKonva />
                <Grid />
            </Layer>
            <Layer>
                <CharacterKonva />
            </Layer>
            <NPCKonva />
            <Layer>
                <ObjectNPCKonva />
                <AutotileKonva />
                <TextureKonva />
            </Layer>
            {currentMode === GameModeEnum.VICTORY_EVIL_QUEEN ||
            currentMode === GameModeEnum.EXPLOSION ? (
                <ExplosionKonva />
            ) : null}
        </Stage>
    );
};

export default GameStage;

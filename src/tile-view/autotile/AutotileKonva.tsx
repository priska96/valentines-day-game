import React from 'react';
import { Group } from 'react-konva';
import { Autotile } from './Autotile';
import { useRootStore } from '@/store/useRootStore';

const AutotileKonva = () => {
    const {
        autotiles,
        moveAutotile: move,
        gameStatus,
        loadAutotile,
        character,
        setContents,
    } = useRootStore();
    return (
        <Group name="autotile">
            {autotiles.map((elem, idx) => (
                <Autotile
                    key={idx}
                    {...elem}
                    idx={idx}
                    currentMap={gameStatus.map}
                    loadAutotile={loadAutotile}
                    character={character}
                    move={move}
                    mode={gameStatus.mode}
                    setContents={setContents}
                />
            ))}
        </Group>
    );
};

export default AutotileKonva;

import React from 'react';
import { Layer } from 'react-konva';
import { NPC } from './NPC';
import { useRootStore } from '@/store/useRootStore';

const NPCKonva = () => {
    const {
        character,
        npcs,
        moveNPC: move,
        updateNPC,
        gameStatus,
        loadNPC,
        objectNPCs,
        setContents,
    } = useRootStore();
    return (
        <Layer>
            {npcs.map((elem, idx) => (
                <NPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    currentMap={gameStatus.map}
                    loadNPC={loadNPC}
                    character={character}
                    objectNPCs={objectNPCs}
                    move={move}
                    setContents={setContents}
                    allNPC={npcs}
                    mode={gameStatus.mode}
                    updateNPC={updateNPC}
                />
            ))}
        </Layer>
    );
};

export default NPCKonva;

import React from 'react';
import { Group } from 'react-konva';

import { ObjectNPC } from './ObjectNPC';
import { useRootStore } from '@/store/useRootStore';

const ObjectNPCKonva = () => {
    const { gameStatus, loadObject, objectNPCs } = useRootStore();
    return (
        <Group name="object-npc">
            {objectNPCs.map((elem, idx) => (
                <ObjectNPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    loadObject={loadObject}
                    currentMap={gameStatus.map}
                />
            ))}
        </Group>
    );
};

export default ObjectNPCKonva;

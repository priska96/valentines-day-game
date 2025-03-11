import React from 'react';

import { BufferObjectNPC } from './BufferObjectNPC';
import { useRootStore } from '@/store/useRootStore';

const ObjectNPCBuffer = () => {
    const { objectNPCs, bufferImageObjectNPC: bufferImage } = useRootStore();
    return (
        <div className="object-npc-imgs-buffer">
            {objectNPCs.map((elem, idx) => (
                <BufferObjectNPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    bufferImage={bufferImage}
                />
            ))}
        </div>
    );
};

export default ObjectNPCBuffer;

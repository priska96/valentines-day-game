import React from 'react';
import { BufferNPC } from './BufferNPC';
import { useRootStore } from '@/store/useRootStore';

const NPCBuffer = () => {
    const { npcs, bufferImageNPC: bufferImage } = useRootStore();
    return (
        <div className="npc-imgs-buffer">
            {npcs.map((elem, idx) => (
                <BufferNPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    bufferImage={bufferImage}
                />
            ))}
        </div>
    );
};

export default NPCBuffer;

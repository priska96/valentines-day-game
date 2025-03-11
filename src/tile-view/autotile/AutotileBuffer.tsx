import React from 'react';
import { BufferAutotile } from './BufferAutotile';
import { useRootStore } from '@/store/useRootStore';

const AutotileBuffer = () => {
    const { autotiles, bufferImageAutotile: bufferImage } = useRootStore();
    return (
        <div className="npc-imgs-buffer">
            {autotiles.map((elem, idx) => (
                <BufferAutotile
                    key={idx}
                    {...elem}
                    idx={idx}
                    bufferImage={bufferImage}
                />
            ))}
        </div>
    );
};

export default AutotileBuffer;

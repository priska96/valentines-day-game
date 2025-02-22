import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bufferImage } from './slices/npcSlice';
import { RootState } from '../../store';
import { BufferNPC } from './BufferNPC';

const NPCBuffer: React.FC<PropsFromRedux> = (props) => {
    return (
        <div className="npc-imgs-buffer">
            {props.npcs.map((elem, idx) => (
                <BufferNPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    bufferImage={props.bufferImage}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({ ...state.npc });

const mapDispatch = { bufferImage };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedNPCBuffer = connector(NPCBuffer);

export default ConnectedNPCBuffer;

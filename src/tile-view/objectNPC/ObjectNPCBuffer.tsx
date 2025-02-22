import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store';
import { bufferImage } from './slices/objectSlice';
import { BufferObjectNPC } from './BufferObjectNPC';

const ObjectNPCBuffer: React.FC<PropsFromRedux> = (props) => {
    return (
        <div className="object-npc-imgs-buffer">
            {props.objects.map((elem, idx) => (
                <BufferObjectNPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    bufferImage={props.bufferImage}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({ ...state.objectNPC });

const mapDispatch = { bufferImage };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedObjectNPCBuffer = connector(ObjectNPCBuffer);

export default ConnectedObjectNPCBuffer;

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BufferAutotile } from './BufferAutotile';
import { bufferImage } from './slices/autotileSlice';
import { RootState } from '../../store';

const AutotileBuffer: React.FC<PropsFromRedux> = (props) => {
    return (
        <div className="npc-imgs-buffer">
            {props.autotiles.map((elem, idx) => (
                <BufferAutotile
                    key={idx}
                    {...elem}
                    idx={idx}
                    bufferImage={props.bufferImage}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({ ...state.autotile });

const mapDispatch = { bufferImage };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedAutotileBuffer = connector(AutotileBuffer);

export default ConnectedAutotileBuffer;

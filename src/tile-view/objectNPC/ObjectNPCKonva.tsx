import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Layer } from 'react-konva';

import { loadObject } from '../slices/statusSlice';
import { RootState } from '../../store';
import { ObjectNPC } from './ObjectNPC';

const ObjectNPCKonva = (props: PropsFromRedux) => {
    return (
        <Layer>
            {props.objects.map((elem, idx) => (
                <ObjectNPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    loadObject={props.loadObject}
                    currentMap={props.currentMap}
                />
            ))}
        </Layer>
    );
};

const mapStateToProps = (state: RootState) => ({
    ...state.objectNPC,
    currentMap: state.gameStatus.map,
});

const mapDispatch = { loadObject };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedObjectNPCKonva = connector(ObjectNPCKonva);

export default ConnectedObjectNPCKonva;

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Layer } from 'react-konva';
import { move } from './slices/autotileSlice';
import { loadAutotile } from '../slices/statusSlice';
import { RootState } from '../../store';
import { setContents } from '../../game-ui/slices/dialogSlice';
import { Autotile } from './Autotile';

const AutotileKonva = (props: PropsFromRedux) => {
    return (
        <Layer>
            {props.autotiles.map((elem, idx) => (
                <Autotile
                    key={idx}
                    {...elem}
                    idx={idx}
                    currentMap={props.currentMap}
                    loadAutotile={props.loadAutotile}
                    character={props.character}
                    move={props.move}
                    mode={props.mode}
                    setContents={props.setContents}
                />
            ))}
        </Layer>
    );
};
const mapStateToProps = (state: RootState) => ({
    ...state.autotile,
    currentMap: state.gameStatus.map,
    mode: state.gameStatus.mode,
    character: state.character,
});

const mapDispatch = { loadAutotile, move, setContents };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedAutotileKonva = connector(AutotileKonva);

export default ConnectedAutotileKonva;

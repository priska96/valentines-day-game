import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Layer } from 'react-konva';
import { move } from './slices/npcSlice';
import { loadNPC } from '../slices/statusSlice';
import { RootState } from '../../store';
import { setContents } from '../../game-ui/slices/dialogSlice';
import { NPC } from './NPC';

const NPCKonva = (props: PropsFromRedux) => {
    return (
        <Layer>
            {props.npcs.map((elem, idx) => (
                <NPC
                    key={idx}
                    {...elem}
                    idx={idx}
                    currentMap={props.currentMap}
                    loadNPC={props.loadNPC}
                    character={props.character}
                    objectNPC={props.objectNPC}
                    move={props.move}
                    setContents={props.setContents}
                    allNPC={props.allNPC}
                    mode={props.mode}
                />
            ))}
        </Layer>
    );
};
const mapStateToProps = (state: RootState) => ({
    ...state.npc,
    currentMap: state.gameStatus.map,
    mode: state.gameStatus.mode,
    character: state.character,
    objectNPC: state.objectNPC,
    allNPC: state.npc,
});

const mapDispatch = { loadNPC, move, setContents };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedNPCKonva = connector(NPCKonva);

export default ConnectedNPCKonva;

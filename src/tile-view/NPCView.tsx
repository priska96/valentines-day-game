import React, {PropsWithChildren, useContext, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import NpcCanvasContext from './npcCanvasContext';

import NPCS from "./npc/NPC";
import {RootState} from "../store";

const NPCView: React.FC<PropsFromRedux> = ({gameStatus}:PropsFromRedux) => {
    const ctx = useContext(NpcCanvasContext);

    console.log("npcCanvas", ctx)
    useEffect(() => {
            console.log('clear')
            ctx && ctx.clearRect(0, 0, 544, 480);

    }, [ctx, gameStatus.map])

    return (
        <React.Fragment>
            {gameStatus.mapLoaded &&  <NPCS/>}
        </React.Fragment>
    );
};

const mapStateToProps = ({gameStatus, npc}: RootState) => ({gameStatus, npc});

const connector = connect(mapStateToProps)


type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NPCView);

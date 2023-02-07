import React, {useContext, useEffect} from 'react';
import { connect } from 'react-redux';
import NPCCanvasContext from './npccanvasContext';

import NPCS from "./NPC";

const NPCView = ({gameStatus}) => {
    const ctx = useContext(NPCCanvasContext);

    useEffect(() => {
        return () => {
            console.log('clear')
            return () => ctx && ctx.clearRect(0, 0, 544, 480);
        }
    }, [ctx, gameStatus.map])

    return (
        <>
            {gameStatus.mapLoaded &&  <NPCS/>}
        </>
    );
};

const mapStateToProps = ({gameStatus, npc}) => ({gameStatus, npc});

export default connect(mapStateToProps)(NPCView);

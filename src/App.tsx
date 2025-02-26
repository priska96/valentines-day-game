import React from 'react';
import GameUI from './game-ui/GameUI';
import './App.css';
import SimpleDialog from './game-ui/SimpleDialog';
import Battle from './battle/Battle';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';
import BackgroundView from './tile-view/BackgroundView';
import ImagesBuffer from './tile-view/ImagesBuffer';
import CharacterBuffer from './tile-view/character/CharacterBuffer';
import NPCBuffer from './tile-view/npc/NPCBuffer';
import ObjectNPCBuffer from './tile-view/objectNPC/ObjectNPCBuffer';
import GameStage from './canvas/GameStage';
import GameStartScreen from './game-ui/GameStartScreen';
import GameAudio from './game-ui/GameAudio';
import GameEndScreen from './game-ui/GameEndScreen';
import { GameModeEnum } from './tile-view/slices/statusSlice';

function App({ mode }: PropsFromRedux) {
    const currentMode = mode;

    return (
        <main
            className={`content ${currentMode === GameModeEnum.GET_OUT ? ' shake' : ''}`}
        >
            <>
                <SimpleDialog />
                <GameUI />
                <ImagesBuffer />
                <CharacterBuffer />
                <NPCBuffer />
                <ObjectNPCBuffer />
                <BackgroundView />
                <GameStage />
            </>
            <GameAudio mode={currentMode} />
            {currentMode === GameModeEnum.START ? <GameStartScreen /> : ''}
            {currentMode === GameModeEnum.BATTLE ? <Battle /> : ''}
            <GameEndScreen />
        </main>
    );
}
const mapStateToProps = (state: RootState) => ({
    mode: state.gameStatus.mode,
});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);

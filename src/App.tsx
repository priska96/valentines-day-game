import React from 'react';
import GameUI from './game-ui/GameUI';
import SimpleDialog from './game-ui/SimpleDialog';
import Battle from './battle/Battle';
import BackgroundView from './tile-view/BackgroundView';
import ImagesBuffer from './tile-view/ImagesBuffer';
import CharacterBuffer from './tile-view/character/CharacterBuffer';
import NPCBuffer from './tile-view/npc/NPCBuffer';
import ObjectNPCBuffer from './tile-view/objectNPC/ObjectNPCBuffer';
import GameStage from './canvas/GameStage';
import GameStartScreen from './game-ui/GameStartScreen';
import GameAudio from './game-ui/GameAudio';
import GameEndScreen from './game-ui/GameEndScreen';
import AutotileBuffer from './tile-view/autotile/AutotileBuffer';
import TextureView from './tile-view/TextureView';
import { GameModeEnum } from './store/enums';
import { useRootStore } from './store/useRootStore';
import './App.css';

function App() {
    const { gameStatus } = useRootStore();
    const { mode: currentMode } = gameStatus;

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
                <AutotileBuffer />
                <BackgroundView />
                <TextureView />
                <GameStage />
            </>
            <GameAudio />
            {currentMode === GameModeEnum.START ? <GameStartScreen /> : ''}
            {currentMode === GameModeEnum.BATTLE ? <Battle /> : ''}
            <GameEndScreen />
        </main>
    );
}
export default App;

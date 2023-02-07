import React from 'react';

import GameUI from './game-ui/GameUI';
import GameLoop from './tile-view/GameLoop';
import TileView from './tile-view/TileView';

import './App.css';
import SimpleDialog from "./game-ui/SimpleDialog";
import Battle from "./battle/Battle";
import {connect} from "react-redux";

function App(mode) {
    const currentMode = mode.mode;
  return (
    <>
        <header>        
        </header>
        <main className="content">
            <SimpleDialog />
                <>
                    <GameUI />
                    <div id="stage" style={{width: 544, height: 480, backgroundImage: "url('/assets/sky_background.png')"}}>
                    <GameLoop>
                        <TileView />
                    </GameLoop>
                    </div>
                </>
            {currentMode === 'battle' ?
            <Battle/>
                :''
            }
        </main>
        <footer>
        </footer>
    </>
  );
}
const mapStateToProps = (state) => ({mode:state.gameStatus.mode})

export default connect(mapStateToProps)(App);

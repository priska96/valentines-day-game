import React from 'react';

import GameUI from './game-ui/GameUI';
import GameLoop from './tile-view/GameLoop';
import TileView from './tile-view/TileView';

import './App.css';
import styles from './stylesApp.module.css';
import SimpleDialog from "./game-ui/SimpleDialog";
import Battle from "./battle/Battle";
import {connect} from "react-redux";
import {onGameEnd} from "./tile-view/slices/statusSlice";

function App({mode, onGameEnd}) {
    const currentMode = mode;
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
            {currentMode === 'start' ?
                <div className={styles.gameOverContainer}>
                    <div className={styles.gameOver}>~~The Rescue~~</div>
                    <div className={styles.startGameButtonContainer}>
                        <span className={styles.startGameButton}
                              onClick={()=> {
                                  onGameEnd({mode: 'world', winner: undefined, selectedOpponentIdx: 0})
                              }}
                        >
                            Start
                        </span>
                    </div>
                    <div>Instructions:
                        <ul>
                            <li>use <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> to navigate</li>
                            <li>use <kbd>Enter</kbd> and <kbd>Mouse</kbd> to cause events</li>
                        </ul>
                    </div>
                </div>
                :''
            }
            {currentMode === 'battle' ?
            <Battle/>
                :''
            }
            {currentMode === 'game-over' ?
                <div className={styles.gameOverContainer}>
                    <div className={styles.gameOver}>Game Over</div>
                </div>
                :''
            }
            {currentMode === 'game-won' ?
                <div className={styles.gameOverContainer}>
                    <div className={styles.gameOver}>Victory!!<br/>You finished the game!</div>
                </div>
                :''
            }
        </main>
        <footer>
        </footer>
    </>
  );
}
const mapStateToProps = (state) => ({mode:state.gameStatus.mode})
const mapDispatch = {onGameEnd}
export default connect(mapStateToProps, mapDispatch)(App);

import React from 'react';
import GameUI from './game-ui/GameUI';

import './App.css';
import styles from './stylesApp.module.css';
//import SimpleDialog from "./game-ui/SimpleDialog";
//import Battle from "./battle/Battle";
import {connect, ConnectedProps} from "react-redux";
import {onGameEnd} from "./tile-view/slices/statusSlice";
import {setContents} from './game-ui/slices/dialogSlice'
import Sky from "./images/sky_background.png"
import Reward from "./images/message.mp4"
import {RootState} from "./store";
import {Layer, Stage} from 'react-konva';
import MapKonva from "./tile-view/MapKonva";
import BackgroundView from "./tile-view/BackgroundView";
import ImagesBuffer from "./tile-view/ImagesBuffer";
import {MAP_TILE_IMAGES} from "./tile-view/constants";
import CharacterBuffer from "./tile-view/character/CharacterBuffer";
import CharacterKonva from "./tile-view/character/CharacterKonva";
import NPCBuffer from "./tile-view/npc/NPCBuffer";
import NPCKonva from "./tile-view/npc/NPCKonva";
import ObjectNPCBuffer from "./tile-view/objectNPC/ObjectNPCBuffer";
import ObjectNPCKonva from "./tile-view/objectNPC/ObjectNPCKonva";
import SimpleDialog from "./game-ui/SimpleDialog";


function App({mode, mapImagesLoaded, onGameEnd, setContents}: PropsFromRedux) {
  const currentMode = mode;

  return (
      <>
        <header>
        </header>
        <main className="content">
          <SimpleDialog />
          <>
            <GameUI />

              <BackgroundView/>
              <ImagesBuffer />
              <CharacterBuffer />
              <NPCBuffer />
              <ObjectNPCBuffer />
            {Object.keys(mapImagesLoaded).length === Object.keys(MAP_TILE_IMAGES).length &&
                <Stage width={544} height={480}>
                    <Layer>
                        <MapKonva/>
                    </Layer>
                    <Layer>
                        <CharacterKonva/>
                    </Layer>
                    <NPCKonva/>
                    <ObjectNPCKonva/>
              </Stage>
            }
          {/*  <div id="stage" style={{width: 544, height: 480, backgroundImage: Sky}}>
              <GameLoop>

                <TileView />

              </GameLoop>
            </div>*/}
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
          {/*{currentMode === 'battle' ?
              <Battle/>
              :''
          }*/}
          {currentMode === 'game-over' ?
              <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>Game Over</div>
              </div>
              :''
          }
          {currentMode === 'game-won' ?
              <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>Victory!!<br/>You finished the game!</div>
                <div className={styles.startGameButtonContainer}>
                        <span className={styles.startGameButton}
                              onClick={()=> {
                                setContents({open: true, title: 'Please be my Valentine forever!!!', text: Reward, openerId: '', action: 'video'});
                              }}
                        >
                            Open Reward
                        </span>
                </div>
              </div>
              :''
          }
        </main>
        <footer>
        </footer>
      </>
  );
}
const mapStateToProps = (state: RootState) => ({mode:state.gameStatus.mode, mapImagesLoaded:state.mapImagesLoaded})
const mapDispatch = {onGameEnd, setContents}



const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App);

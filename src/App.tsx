import React from 'react';
import GameUI from './game-ui/GameUI';

import './App.css';
import styles from './stylesApp.module.css';
import SimpleDialog from "./game-ui/SimpleDialog";
import Battle from "./battle/Battle";
import {connect, ConnectedProps} from "react-redux";
import {onGameEnd} from "./tile-view/slices/statusSlice";
import {setContents} from './game-ui/slices/dialogSlice'
import Reward from "./images/message2.mp4"
import SpecialReward from "./images/IMG_5230.jpeg"
import {RootState} from "./store";
import {Layer, Stage, Image, Line} from 'react-konva';
import MapKonva from "./tile-view/MapKonva";
import BackgroundView from "./tile-view/BackgroundView";
import ImagesBuffer from "./tile-view/ImagesBuffer";
import CharacterBuffer from "./tile-view/character/CharacterBuffer";
import CharacterKonva from "./tile-view/character/CharacterKonva";
import NPCBuffer from "./tile-view/npc/NPCBuffer";
import NPCKonva from "./tile-view/npc/NPCKonva";
import ObjectNPCBuffer from "./tile-view/objectNPC/ObjectNPCBuffer";
import ObjectNPCKonva from "./tile-view/objectNPC/ObjectNPCKonva";
import {MAP_DIMENSIONS, MAP_TILE_IMAGES2, TILE_SIZE} from "./tile-view/mapImgs";
import ExplosionKonva from "./tile-view/ExplosionKonva";
import MagicSpellSound from "./assets/magic-spell-sound.mp3";
import BackgroundMusic from "./assets/background.mp3";

function App({mode, mapImagesLoaded,backgroundImg, onGameEnd, setContents}: PropsFromRedux) {
  const currentMode = mode;
    const {COLS, ROWS} = MAP_DIMENSIONS;
    const gridTileLength = TILE_SIZE/2

  return (
        <main className={`content ${currentMode === 'get-out' ? " shake" : ""}`}>
          <>
              <SimpleDialog/>
                <GameUI />

              <ImagesBuffer />
              <CharacterBuffer />
              <NPCBuffer />
              <ObjectNPCBuffer />
              <BackgroundView/>
            {Object.keys(mapImagesLoaded).length >= Object.keys(MAP_TILE_IMAGES2).length-1 &&
                <Stage width={COLS*32} height={ROWS*32}>
                    <Layer name={"skyBackground"}>
                        <Image
                            x={0}
                            y={0}
                            image={document.querySelector(backgroundImg)}
                        />
                        <MapKonva/>
                        {Array.from({ length: MAP_DIMENSIONS.ROWS}, (value, index) => index)
                            .map((row)=>{
                                return(
                                    <Line
                                        key={`row-${row}`}
                                        x={0}
                                        y={row*gridTileLength}
                                        points={[0,row*gridTileLength,COLS*32,row*gridTileLength]}
                                        stroke="grey"
                                        strokeWidth={0.7}
                                    />
                                )}
                            )}
                        {Array.from({ length: MAP_DIMENSIONS.COLS}, (value, index) => index)
                            .map((col)=>{
                                return(
                                    <Line
                                        key={`col-${col}`}
                                        x={col*gridTileLength}
                                        y={0}
                                        points={[col*gridTileLength,0,col*gridTileLength, ROWS*32]}
                                        stroke="grey"
                                        strokeWidth={0.7}
                                    />
                                )}
                            )}
                    </Layer>
                    <Layer>
                        <CharacterKonva/>
                    </Layer>
                    <NPCKonva/>
                    <ObjectNPCKonva/>
                    {currentMode === 'victory-evil-queen'
                        ?
                        <ExplosionKonva/>
                        :null
                    }
              </Stage>
            }
          </>
            {currentMode === 'victory-evil-queen'
                ?
                <audio id="audio" loop autoPlay>
                    <source src={MagicSpellSound} type="audio/mp3"/>
                </audio> : null
            }

            {!['start','victory-evil-queen', 'battle', 'game-over', 'game-over-hole', 'game-won'].includes(currentMode as string)
                ?
                <audio id="audio" loop autoPlay>
                    <source src={BackgroundMusic}  type="audio/mp3"/>
                </audio> : null
            }
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
            {currentMode === 'game-over-hole' ?
                <div className={styles.gameOverContainer}>
                    <div className={styles.gameOver}>Game Over <br/><br/>the Hero died from the fall in the hole...</div>
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
                    <span className={styles.startGameButton}
                          onClick={()=> {
                              setContents({open: true, title: 'Please be my Valentine forever!!!', text: SpecialReward, openerId: '', action: 'photo'});
                          }}
                    >
                            Open Special Reward
                        </span>
                </div>
              </div>
              :''
          }
        </main>
  );
}
const mapStateToProps = (state: RootState) => (
    {
        mode:state.gameStatus.mode,
        mapImagesLoaded:state.mapImagesLoaded,
        backgroundImg: state.gameStatus.backgroundImg
    })
const mapDispatch = {onGameEnd, setContents}



const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App);

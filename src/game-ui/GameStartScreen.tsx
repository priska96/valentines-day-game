import { MAP_TILE_IMAGES2 } from '@/tile-view/maps/mapData';
import ConnectedLoadGameButton from './LoadGameButton';
import styles from '../stylesApp.module.css';
import { useRootStore } from '@/store/useRootStore';
import { GameModeEnum } from '@/store/enums';
import LoadingIndicator from './LoadindIndicator';

const GameStartScreen = () => {
    const { mapImages, onGameEnd } = useRootStore();
    return (
        <div className={styles.gameOverContainer}>
            <div className={styles.gameOver}>~~The Rescue~~</div>

            {mapImages &&
            (Object.keys(mapImages).length >=
                Object.keys(MAP_TILE_IMAGES2).length - 1 ||
                Object.keys(mapImages).length === 753) ? (
                <div>
                    <div className={styles.startGameButtonContainer}>
                        <span
                            className={styles.startGameButton}
                            onClick={() => {
                                onGameEnd({
                                    mode: GameModeEnum.WORLD,
                                    winner: undefined,
                                    selectedOpponentIdx: 0,
                                });
                            }}
                        >
                            Start
                        </span>
                    </div>

                    <ConnectedLoadGameButton />
                </div>
            ) : (
                <LoadingIndicator />
            )}
            <div>
                Instructions:
                <ul>
                    <li>
                        use <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>,{' '}
                        <kbd>D</kbd> to navigate
                    </li>
                    <li>
                        use <kbd>Enter</kbd> and <kbd>Mouse</kbd> to cause
                        events
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GameStartScreen;

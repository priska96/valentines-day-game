import { MAP_TILE_IMAGES2 } from '@/tile-view/maps/mapData';
import ConnectedLoadGameButton from './LoadGameButton';
import { RootState } from '@/store';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../stylesApp.module.css';
import { onGameEnd } from '@/tile-view/slices/statusSlice';

const GameStartScreen = ({ mapImagesLoaded, onGameEnd }: PropsFromRedux) => {
    return (
        <div className={styles.gameOverContainer}>
            <div className={styles.gameOver}>~~The Rescue~~</div>
            <div className={styles.startGameButtonContainer}>
                <span
                    className={styles.startGameButton}
                    onClick={() => {
                        onGameEnd({
                            mode: 'world',
                            winner: undefined,
                            selectedOpponentIdx: 0,
                        });
                    }}
                >
                    Start
                </span>
            </div>

            {Object.keys(mapImagesLoaded).length >=
                Object.keys(MAP_TILE_IMAGES2).length - 1 && (
                <ConnectedLoadGameButton />
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

const mapStateToProps = (state: RootState) => ({
    mapImagesLoaded: state.mapImagesLoaded,
});

const mapDispatch = { onGameEnd };
const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GameStartScreen);

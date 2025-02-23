import { RootState } from '@/store';
import { connect, ConnectedProps } from 'react-redux';
import styles from '../stylesApp.module.css';
import { setContents } from './slices/dialogSlice';
import Reward from '../images/message2.mp4';
import SpecialReward from '../images/IMG_5230.jpeg';

const GameEndScreen = ({ mode, setContents }: PropsFromRedux) => {
    if (mode === 'game-over') {
        return (
            <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>Game Over</div>
            </div>
        );
    } else if (mode === 'game-over-hole') {
        return (
            <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>
                    Game Over <br />
                    <br />
                    the Hero died from the fall in the hole...
                </div>
            </div>
        );
    } else if (mode === 'game-won') {
        return (
            <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>
                    Victory!!
                    <br />
                    You finished the game!
                </div>
                <div className={styles.startGameButtonContainer}>
                    <span
                        className={styles.startGameButton}
                        onClick={() => {
                            setContents({
                                open: true,
                                title: 'Please be my Valentine forever!!!',
                                text: Reward,
                                openerId: '',
                                action: 'video',
                            });
                        }}
                    >
                        Open Reward
                    </span>
                    <span
                        className={styles.startGameButton}
                        onClick={() => {
                            setContents({
                                open: true,
                                title: 'Please be my Valentine forever!!!',
                                text: SpecialReward,
                                openerId: '',
                                action: 'photo',
                            });
                        }}
                    >
                        Open Special Reward
                    </span>
                </div>
            </div>
        );
    }
    return <></>;
};

const mapStateToProps = (state: RootState) => ({
    mode: state.gameStatus.mode,
});
const mapDispatch = { setContents };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GameEndScreen);

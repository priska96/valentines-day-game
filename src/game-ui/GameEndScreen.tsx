import styles from '../stylesApp.module.css';
import Reward from '../images/message2.mp4';
import SpecialReward from '../images/IMG_5230.jpeg';
import { useRootStore } from '@/store/useRootStore';
import { DialogActionEnum, GameModeEnum } from '@/store/enums';

const GameEndScreen = () => {
    const { gameStatus, setContents } = useRootStore();
    const { mode } = gameStatus;
    if (mode === GameModeEnum.GAME_OVER) {
        return (
            <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>Game Over</div>
            </div>
        );
    } else if (mode === GameModeEnum.GAME_OVER_HOLE) {
        return (
            <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>
                    Game Over <br />
                    <br />
                    the Hero died from the fall in the hole...
                </div>
            </div>
        );
    } else if (mode === GameModeEnum.GAME_OVER_UNDERWATER) {
        return (
            <div className={styles.gameOverContainer}>
                <div className={styles.gameOver}>
                    Game Over <br />
                    <br />
                    the Hero died being unable to breath under water...
                </div>
            </div>
        );
    } else if (mode === GameModeEnum.GAME_WON) {
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
                                action: DialogActionEnum.VIDEO,
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
                                action: DialogActionEnum.PHOTO,
                            });
                        }}
                    >
                        Open Special Reward
                    </span>
                </div>
            </div>
        );
    } else if (mode === GameModeEnum.GAME_WON_CHAPTER3_REWARD) {
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
                                title: 'Thanks for playing the last game!',
                                text: Reward,
                                openerId: '',
                                action: DialogActionEnum.PHOTO,
                            });
                        }}
                    >
                        Open Letter
                    </span>
                </div>
            </div>
        );
    }
    return <></>;
};

export default GameEndScreen;

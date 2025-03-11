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
                                text: `Hey Jihoon, \n
                                thanks for playing the last game! I know, it's been quite difficult between us, but I hope you enjoyed the game. 
                                I was thinking a lot whether to finish the game or not and if I would finish it whether I should give it to you. 
                                I know, you want to be free and and move on with your life and I'm sorry for interrupting and confusing you again like this. 
                                I just can't stop thinking about you and I'm sorry for how things ended up between us. 
                                I really love you a lot and I know it's going to take sometime for me to get over you. So I hope you can understand me... 
                                I really wish you would give me and us another chance, like how I gave you another chance, too... But I know, too much has happened between us and it's not easy to forget and forgive.
                                I hope, you can forgive me for not treating you nicely and always nagging about you and how you live your life. You always say you understand why I did that but I know it wasn't nice of me to do that. Even if it was out of love, it was the wrong way to do it. 
                                I wish that you can find happiness and love in your life. I pray for you that you still continue to persue God and Jesus in your life and that you see that only God can set you free from fear and anxiety. I pray that God will always be with you and give you strength and courage to face your fears and take risks. 
                                May God help you with your trauma and help you to heal from it. I hope you can find peace and joy in your life and that you can find a nice job in the future. 
                                I wish you all the best in your life. I really mean that.
                                I know we had our differences, fights and our ups and downs but I never once regretted loving you or dating you. I still believe and have lots of hope for us. But I also know that I can't force you to love me or be with me.
                                That's why I decided to give you the last game and the last letter. I hope you can understand me and my feelings. I hope you can forgive me for my mistakes and that you can see that I really love you a lot. I want to do better and be more patient and understanding with you. I know there are many things I need to fix about myself and I hope you would give me a chance to prove to you that I'm not so scary to live with and that I can be nice and loving too.
                                It's only been roughly 5years that we've dated and to think both of us will always stay the same is actually ridiculous. Of course we will change, especially if we want to be better for the other one. It's a huge motivation if you want to change out of love.\n
                                PS:  I still hope that you would come pick me up from the airport when I come to Korea and that we can spend as much time as possible together.\n
                                But it's probaly only going to be a dream of mine ^^ and that's okay.\n
                                Thanks for reading the letter until the end. Have a blessed life and take care of yourself.\n
                                In love,\n
                                Priska\n\n
                                Or maybe in the future we can just be friends at least...
                                `,
                                openerId: '',
                                action: DialogActionEnum.LETTER,
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

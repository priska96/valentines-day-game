import { useRootStore } from '@/store/useRootStore';
import BackgroundMusic from '../assets/background.mp3';
import MagicSpellSound from '../assets/magic-spell-sound.mp3';
import { GameModeEnum } from '@/store/enums';

const GameAudio = () => {
    const { gameStatus } = useRootStore();
    const { mode } = gameStatus;

    const source =
        mode === GameModeEnum.VICTORY_EVIL_QUEEN
            ? MagicSpellSound
            : BackgroundMusic;

    if (
        [
            GameModeEnum.START,
            GameModeEnum.VICTORY_EVIL_QUEEN,
            GameModeEnum.BATTLE,
            GameModeEnum.GAME_OVER,
            GameModeEnum.GAME_OVER_HOLE,
            GameModeEnum.GAME_WON,
        ].includes(mode as GameModeEnum)
    ) {
        return <></>;
    }
    return (
        <audio id="audio" loop autoPlay>
            <source src={source} type="audio/mp3" />
        </audio>
    );
};

export default GameAudio;

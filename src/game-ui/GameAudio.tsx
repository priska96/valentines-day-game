import { RootState } from '@/store';
import { connect, ConnectedProps } from 'react-redux';
import BackgroundMusic from '../assets/background.mp3';
import MagicSpellSound from '../assets/magic-spell-sound.mp3';
import { GameModeEnum } from '@/tile-view/slices/statusSlice';

const GameAudio = ({ mode }: PropsFromRedux) => {
    console.log(mode);

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

const mapStateToProps = (state: RootState) => ({
    mode: state.gameStatus.mode,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GameAudio);

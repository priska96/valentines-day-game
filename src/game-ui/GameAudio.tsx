import { RootState } from '@/store';
import { connect, ConnectedProps } from 'react-redux';
import BackgroundMusic from '../assets/background.mp3';
import MagicSpellSound from '../assets/magic-spell-sound.mp3';

const GameAudio = ({ mode }: PropsFromRedux) => {
    const currentMode = mode;

    if (currentMode === 'victory-evil-queen') {
        return (
            <audio id="audio" loop autoPlay>
                <source src={MagicSpellSound} type="audio/mp3" />
            </audio>
        );
    }

    if (
        [
            'start',
            'victory-evil-queen',
            'battle',
            'game-over',
            'game-over-hole',
            'game-won',
        ].includes(currentMode as string)
    ) {
        return <></>;
    }
    return (
        <audio id="audio" loop autoPlay>
            <source src={BackgroundMusic} type="audio/mp3" />
        </audio>
    );
};

const mapStateToProps = (state: RootState) => ({
    mode: state.gameStatus.mode,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GameAudio);

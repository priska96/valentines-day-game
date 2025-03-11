import { RootStoreObjects } from '@/store/types';
import { useRootStore } from '@/store/useRootStore';
import { Button } from '@mui/material';

const SaveGameButton = () => {
    const {
        character,
        npcs,
        autotiles,
        objectNPCs,
        mapImages,
        dialog,
        gameStatus,
    } = useRootStore();

    const state = {
        character,
        npcs,
        autotiles,
        objectNPCs,
        mapImages,
        dialog,
        gameStatus,
    } as RootStoreObjects;

    const handleSaveState = () => {
        const jsonString = JSON.stringify(state, null, 4);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'game-state.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button
            size="small"
            variant="contained"
            className="game-ui__save_btn"
            onClick={handleSaveState}
        >
            Save Game
        </Button>
    );
};

export default SaveGameButton;

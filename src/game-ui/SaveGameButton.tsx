import { RootState } from '@/store';
import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const SaveGameButton = () => {
    const state = useSelector((state: RootState) => state);

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

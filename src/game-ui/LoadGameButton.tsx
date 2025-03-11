import React, { useRef } from 'react';
import styles from '../stylesApp.module.css';
import { useRootStore } from '@/store/useRootStore';
import { RootStoreObjects } from '@/store/types';

const LoadGameButton = () => {
    const {
        updateCharacterState,
        updateNPCState,
        updateStatusState,
        updateObjectNPCState,
        updateDialogState,
        updateAutotileState,
    } = useRootStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleLoadState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedState = JSON.parse(
                    e.target?.result as string
                ) as RootStoreObjects;
                updateStatusState(importedState.gameStatus);
                updateObjectNPCState(importedState.objectNPCs);
                updateNPCState(importedState.npcs);
                updateCharacterState(importedState.character);
                updateDialogState(importedState.dialog);
                updateAutotileState(importedState.autotiles);
                alert('State loaded successfully!');
            } catch (error) {
                alert('Invalid JSON file.');
                console.error(error);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={styles.loadGameButtonContainer}>
            <span
                className={styles.loadGameButton}
                onClick={() => {
                    inputRef.current?.click();
                }}
            >
                Load Game
                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept="application/json"
                    onChange={handleLoadState}
                />
            </span>
        </div>
    );
};

export default LoadGameButton;

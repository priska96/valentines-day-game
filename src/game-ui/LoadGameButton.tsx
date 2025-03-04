import React, { useRef } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { updateStatusState } from '../tile-view/slices/statusSlice';
import { updateObjectNPCState } from '../tile-view/objectNPC/slices/objectSlice';
import { updateNPCState } from '../tile-view/npc/slices/npcSlice';
import { updateCharacterState } from '../tile-view/character/slices/characterSlice';
import { updateDialogState } from './slices/dialogSlice';
import styles from '../stylesApp.module.css';
import { RootState } from '@/store';
import { updateAutotileState } from '@/tile-view/autotile/slices/autotileSlice';

const LoadGameButton = ({
    updateStatusState,
    updateObjectNPCState,
    updateNPCState,
    updateCharacterState,
    updateDialogState,
    updateAutotileState,
}: PropsFromRedux) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleLoadState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedState: RootState = JSON.parse(
                    e.target?.result as string
                ) as RootState;
                dispatch(updateStatusState(importedState.gameStatus));
                dispatch(updateObjectNPCState(importedState.objectNPC));
                dispatch(updateNPCState(importedState.npc));
                dispatch(updateCharacterState(importedState.character));
                dispatch(updateDialogState(importedState.dialog));
                dispatch(updateAutotileState(importedState.autotile));
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
const mapDispatch = {
    updateStatusState,
    updateObjectNPCState,
    updateNPCState,
    updateCharacterState,
    updateDialogState,
    updateAutotileState,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedLoadGameButton = connector(LoadGameButton);

export default ConnectedLoadGameButton;

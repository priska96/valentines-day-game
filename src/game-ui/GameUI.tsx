import React from 'react';
import SaveGameButton from './SaveGameButton';
import { useRootStore } from '@/store/useRootStore';
import { ObjectNPC } from '@/store/types';

const GameUI = () => {
    const { character, updatePlayerSummary, updateInventoryItemInUse } =
        useRootStore();
    const { heroClass, playerSummary, portrait, inventory } = character;

    const handleOnClickItem = (item: ObjectNPC) => {
        if (item.healing > 0) {
            const newHealth =
                playerSummary.health + item.healing > playerSummary.maxHealth
                    ? playerSummary.maxHealth
                    : playerSummary.health + item.healing;
            updatePlayerSummary({
                updates: {
                    health: newHealth,
                },
            });
        }
        if (item.action !== '') {
            console.log(item.action);
            updateInventoryItemInUse({ id: item.id });
        }
    };

    return (
        <div className="game-ui">
            <div className="game-ui__avatar" />
            <img src={portrait} alt={`portrait_${playerSummary.name}`} />
            <div className="game-ui__info">
                <p>Name: {playerSummary.name}</p>
                <p>Class: {heroClass}</p>
                <p>Level: {playerSummary.level}</p>
                <p>
                    Health: {playerSummary.health}/ {playerSummary.maxHealth}
                </p>
                <p className="game-ui__inventory">
                    Inventory:
                    <br />
                    {inventory.map((item, idx) => {
                        let className = '';
                        if (item.healing > 0) {
                            className = 'healingItem';
                        }
                        if (item.action !== '') {
                            className = 'actionItem';
                        }
                        return (
                            <span key={idx}>
                                <span
                                    className={className}
                                    onClick={() => handleOnClickItem(item)}
                                >
                                    {item.item}
                                    {item.inUse ? ' (In Use)' : ''}
                                </span>
                                <br />
                            </span>
                        );
                    })}
                </p>
            </div>
            <SaveGameButton />
        </div>
    );
};

export default GameUI;

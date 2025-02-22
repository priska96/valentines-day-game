import React from 'react';
import styles from './stylesBattleMenu.module.css';

interface BattleMenuProps {
    onAttack: () => void;
    onMagic: () => void;
    onHeal: () => void;
}
export const BattleMenu = ({ onAttack, onMagic, onHeal }: BattleMenuProps) => (
    <div className={styles.main}>
        <div onClick={onAttack} className={styles.option}>
            Attack
        </div>
        <div onClick={onMagic} className={styles.option}>
            Magic
        </div>
        <div onClick={onHeal} className={styles.option}>
            Heal
        </div>
    </div>
);

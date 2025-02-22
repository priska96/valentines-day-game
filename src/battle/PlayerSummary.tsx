import React from 'react';
import styles from './stylesPlayerSummary.module.css';
import { Bar } from './bar/Bar';

interface PlayerSummaryProps {
    main: boolean;
    name?: string;
    level?: number;
    health?: number;
    maxHealth?: number;
}
export const PlayerSummary = ({
    main,
    name,
    level,
    health,
    maxHealth,
}: PlayerSummaryProps) => (
    <div
        className={styles.main}
        style={{ backgroundColor: main ? 'wheat' : 'wheat' }}
    >
        <div className={styles.info}>
            <div className={styles.name}>{name}</div>
            <div className={styles.level}>Lvl {level}</div>
        </div>

        <div className={styles.health}>
            <Bar label="HP" value={health} maxValue={maxHealth} />
        </div>
    </div>
);

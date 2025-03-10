import { dialogs } from '@/tile-view/dialog_utils';
import { TILE_SIZE } from '@/tile-view/maps/mapData';
import { Sprite } from 'konva/lib/shapes/Sprite';
import { SetContentsPayload, UpdateNPCPayload } from '@/store/types';

interface AnimateProps {
    spriteRef: React.RefObject<Sprite | null>;
    animate: string;
    setContents: (payload: SetContentsPayload) => void;
    updateNPC?: (payload: UpdateNPCPayload) => void;
}

export const animateFallDownEvilKing = ({
    spriteRef,
    animate,
    setContents,
}: AnimateProps) => {
    if (spriteRef && spriteRef.current && animate === 'evil-king-fall-down') {
        spriteRef.current.to({
            x: 10 * TILE_SIZE,
            y: 12 * TILE_SIZE,
            duration: 1,
            onUpdate: () => {
                spriteRef.current!.rotate(45);
            },
            onFinish: () =>
                setTimeout(() => {
                    if (setContents) {
                        setContents(
                            (dialogs.piscesTown['npc-3'].evilKingFellDown
                                .content as SetContentsPayload) ??
                                ({} as SetContentsPayload)
                        );
                    }
                }, 200),
        });
    }
};

export const animateWalkToDad = ({
    spriteRef,
    animate,
    setContents,
}: AnimateProps) => {
    if (spriteRef && spriteRef.current && animate === 'walk-to-dad') {
        spriteRef.current.to({
            x: 8 * TILE_SIZE,
            y: 14 * TILE_SIZE,
            duration: 0.3,
            onUpdate: () => {
                spriteRef.current!.start();
            },
            onFinish: () => {
                spriteRef.current!.to({
                    x: 8 * TILE_SIZE,
                    y: 15 * TILE_SIZE,
                    duration: 0.3,
                    onUpdate: () => {
                        spriteRef.current!.start();
                    },
                    onFinish: () => {
                        spriteRef.current!.to({
                            x: 7 * TILE_SIZE,
                            y: 12 * TILE_SIZE,
                            duration: 0.8,
                            onUpdate: () => {
                                spriteRef.current!.start();
                            },
                            onFinish: () => {
                                spriteRef.current!.stop();
                                if (setContents) {
                                    setContents(
                                        (dialogs.piscesTown['npc-2'].beforeFight
                                            .content as SetContentsPayload) ??
                                            ({} as SetContentsPayload)
                                    );
                                }
                            },
                        });
                    },
                });
            },
        });
    }
};

export const animateSeerComesOut = ({
    spriteRef,
    animate,
    setContents,
}: AnimateProps) => {
    if (spriteRef && spriteRef.current && animate === 'seer-comes-out') {
        spriteRef.current.to({
            x: 8 * TILE_SIZE,
            y: 11 * TILE_SIZE,
            duration: 0.3,
            onUpdate: () => {
                spriteRef.current!.start();
            },
            onFinish: () => {
                spriteRef.current!.stop();
                setTimeout(() => {
                    if (setContents) {
                        setContents(
                            (dialogs.piscesTownMelted['npc-10'].chapter3
                                .content as SetContentsPayload) ??
                                ({} as SetContentsPayload)
                        );
                    }
                }, 200);
            },
        });
    }
};

export const animateGoesBack = ({
    spriteRef,
    animate,
    updateNPC,
    setContents,
}: AnimateProps) => {
    if (spriteRef && spriteRef.current && animate === 'seer-goes-back') {
        spriteRef.current.to({
            x: 8 * TILE_SIZE,
            y: 8 * TILE_SIZE,
            duration: 0.3,
            onUpdate: () => {
                spriteRef.current!.start();
            },
            onFinish: () => {
                spriteRef.current!.stop();
                setTimeout(() => {
                    if (updateNPC) {
                        updateNPC({
                            idx: [10],
                            updates: {
                                'data-10': {
                                    map: [],
                                },
                            },
                        });
                    }
                    if (setContents) {
                        setContents(
                            (dialogs.piscesTownMelted['npc-4'].restoreBalance
                                .content as SetContentsPayload) ??
                                ({} as SetContentsPayload)
                        );
                    }
                }, 200);
            },
        });
    }
};

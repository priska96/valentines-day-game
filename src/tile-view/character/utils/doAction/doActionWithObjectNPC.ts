import { DialogActionEnum } from '@/game-ui/slices/dialogSlice';
import { Autotile } from '@/tile-view/autotile/slices/autotileSlice';
import { NPC } from '@/tile-view/npc/slices/npcSlice';
import { ObjectNPC } from '@/tile-view/objectNPC/slices/objectSlice';
import { DoActionParams } from '../../types/DoActionParams';

export const doActionWithOpbjectNPC = ({
    otherThing,
    setContents,
}: { otherThing: ObjectNPC | NPC | Autotile } & Pick<
    DoActionParams,
    'setContents'
>) => {
    const res = { success: false };
    if (otherThing.type === 'objectNPC') {
        if ((otherThing as ObjectNPC).tookItem) {
            setContents({
                open: true,
                title: 'Nothing!',
                text: `Here is nothing to take from.`,
                openerId: otherThing.id,
                action: DialogActionEnum.DEFAULT,
                continue: false,
            });
        } else {
            setContents({
                open: true,
                title: 'Item found!',
                text: `You found ${(otherThing as ObjectNPC).item}!`,
                openerId: otherThing.id,
                action: DialogActionEnum.DEFAULT,
                continue: false,
            });
        }
        res.success = true;
        return res;
    }
    return res;
};

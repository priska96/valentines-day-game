import { Autotile, NPC, ObjectNPC } from '@/store/types';
import { DoActionParams } from '../../types/DoActionParams';
import { DialogActionEnum } from '@/store/enums';

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
            });
        } else {
            setContents({
                open: true,
                title: 'Item found!',
                text: `You found ${(otherThing as ObjectNPC).item}!`,
                openerId: otherThing.id,
                action: DialogActionEnum.DEFAULT,
            });
        }
        res.success = true;
        return res;
    }
    return res;
};

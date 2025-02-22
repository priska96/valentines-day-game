import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { HEROES_SPRITE, HEROES_SPRITE_NAKED } from '../../constants';
import { bufferImage } from './slices/characterSlice';
import { loadCharacter } from '../slices/statusSlice';
import { fullyGeared } from '../utils';
import { RootState } from '../../store';

const CharacterBuffer: React.FC<PropsFromRedux> = ({
    inventory,
    bufferImage,
}: PropsFromRedux) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const img =
        fullyGeared(inventory) === 3 ? HEROES_SPRITE : HEROES_SPRITE_NAKED;

    return (
        <div className="character-images-buffer">
            <img
                id="character"
                alt="character"
                ref={imgRef}
                onLoad={() =>
                    bufferImage({ heroImg: `#${imgRef.current!.id}` })
                }
                className="images-buffer"
                src={img}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({ ...state.character });

const mapDispatch = { loadCharacter, bufferImage };

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CharacterBuffer);

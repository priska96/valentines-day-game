import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {MAP_TILE_IMAGES} from './constants';
import {bufferMapImage} from './slices/mapImagesSlice';

const ImagesBuffer = ({ bufferMapImage }:PropsFromRedux) => {
    return (
        <div className="images-buffer">
        {
            Object.keys(MAP_TILE_IMAGES).map(key => {
                return (
                    <img
                        key={`map-tile-img-${key}`} 
                        id={`map-tile-img-${key}`} 
                        src={`${MAP_TILE_IMAGES[key]}`}
                        alt={`map-tile-${key}`}
                        onLoad={() => { bufferMapImage(MAP_TILE_IMAGES[key]); }}
                    />
                );
            })
        }
        </div>
    )
}


const mapDispatch = { bufferMapImage };

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ImagesBuffer);

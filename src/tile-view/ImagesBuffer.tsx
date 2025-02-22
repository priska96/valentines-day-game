import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { MAP_TILE_IMAGES2 } from './maps/mapData';
import { bufferMapImage } from './slices/mapImagesSlice';

const ImagesBuffer = ({ bufferMapImage }: PropsFromRedux) => {
    return (
        <div className="images-buffer">
            {Object.keys(MAP_TILE_IMAGES2).map((key) => {
                return (
                    <div
                        style={{ position: 'relative' }}
                        key={`map-tile-img-${key}`}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                zIndex: 2,
                                color: 'red',
                            }}
                        >
                            {key}
                        </span>
                        <img
                            key={`map-tile-img-${key}`}
                            id={`map-tile-img-${key}`}
                            src={`${MAP_TILE_IMAGES2[key]}`}
                            alt={`map-tile-${key}`}
                            onLoad={() => {
                                bufferMapImage(MAP_TILE_IMAGES2[key]);
                                console.log('done');
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const mapDispatch = { bufferMapImage };

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ImagesBuffer);

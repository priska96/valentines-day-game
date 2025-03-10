import React from 'react';
import { MAP_TILE_IMAGES2 } from './maps/mapData';
import { useRootStore } from '@/store/useRootStore';

const ImagesBuffer = () => {
    const { bufferMapImage } = useRootStore();
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

export default ImagesBuffer;

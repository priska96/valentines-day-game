import React, { useEffect, useState } from 'react';
import { MAP_TILE_IMAGES2 } from './maps/mapData';
import { useRootStore } from '@/store/useRootStore';

const BATCH_SIZE = 70; // Adjust batch size if needed
const INTERVAL_DELAY = 200; // Delay between each batch (milliseconds)

const ImagesBuffer = () => {
    const { bufferMapImage } = useRootStore();
    const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
    const imageKeys = Object.keys(MAP_TILE_IMAGES2);

    useEffect(() => {
        let batchIndex = 0;

        const loadNextBatch = () => {
            const startIdx = batchIndex * BATCH_SIZE;
            const endIdx = startIdx + BATCH_SIZE;
            const currentBatch = imageKeys.slice(startIdx, endIdx);

            currentBatch.forEach((key) => {
                const img = new Image();
                img.src = MAP_TILE_IMAGES2[key];
                img.onload = () => {
                    bufferMapImage(MAP_TILE_IMAGES2[key]);
                    setLoadedKeys((prev) => [...prev, key]);
                };
                img.onerror = () => console.error(`Failed to load ${key}`);
            });

            batchIndex++;

            if (startIdx < imageKeys.length) {
                setTimeout(loadNextBatch, INTERVAL_DELAY);
            }
        };

        loadNextBatch();
    }, []);

    return (
        <div className="images-buffer">
            {loadedKeys.map((key) => (
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
                        src={MAP_TILE_IMAGES2[key]}
                        alt={`map-tile-${key}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default ImagesBuffer;

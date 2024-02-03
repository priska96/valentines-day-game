import React, {useContext, useEffect} from 'react';

import CanvasContext from './canvasContext';
import {TILE_SIZE} from './constants';

const Grid : React.FC<{width: number, height: number, children: JSX.Element}> = ({width, height, children}: {width: number, height: number, children: JSX.Element}) => {
    const ctx = useContext(CanvasContext);

    useEffect(() => {
        if(ctx &&  ctx.map) {
            for (let i = 0; i < height; i++) {
                const y = i * TILE_SIZE;
                ctx.map.beginPath();
                ctx.map.moveTo(0, y);
                ctx.map.lineTo(width, y);
                ctx.map.stroke();
                ctx.map.closePath();
            }
            for (let j = 0; j < width; j++) {
                const x = j * TILE_SIZE;
                ctx.map.beginPath();
                ctx.map.moveTo(x, 0);
                ctx.map.lineTo(x, height);
                ctx.map.stroke();
                ctx.map.closePath();
            }
        }
    }, [ctx, height, width]);

    return children;
}

export default Grid;

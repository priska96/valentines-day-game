import React from 'react';

const CanvasContext = React.createContext<{
    map: CanvasRenderingContext2D | null;
    hero: CanvasRenderingContext2D | null;
} | null>(null);

export default CanvasContext;

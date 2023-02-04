import React, {useEffect, useContext, useRef} from 'react';
import {connect} from 'react-redux';

import CanvasContext from './canvasContext';
import {OBJECT_NPC_SPRITE} from '../constants';
import {TILE_SIZE} from './constants';
import {bufferImage} from './slices/objectSlice';
import {loadObject} from './slices/statusSlice';

const ObjectNPC = ({id, x, y, objectImg, idx,  loadObject, bufferImage, tookItem}) => {
    const ctx = useContext(CanvasContext);
    const imgRef = useRef(null);

    useEffect(() => {
        if (objectImg) {
            ctx.drawImage(
                document.querySelector(objectImg),
                0* 32,
                0* 32,
                32,
                32 ,
                x * TILE_SIZE,
                y * TILE_SIZE,
                32,
                32,
            );
            loadObject({idx: idx, val:true});
        }
        return ()=>{}
    }, [ctx, loadObject, tookItem]);

    return (
        <img
            key={id}
            id={id}
            alt="objectNPC"
            ref={imgRef}
            onLoad={
                () => {
                    bufferImage({idx: idx, objectImg: `#${imgRef.current.id}`})
                }
            }
            className="images-buffer"
            src={!tookItem?  OBJECT_NPC_SPRITE[id][0] :  OBJECT_NPC_SPRITE[id][1]}
        />
    );
};


const ObjectNPCs = (props) => {
    return(
        <div>
            {props.objects.map((elem, idx)=>{
               return ObjectNPC({...elem, idx, bufferImage:props.bufferImage, loadObject: props.loadObject})
            })}
        </div>
    );
};

const mapStateToProps = (state) => (state.objectNPC);

const mapDispatch = {loadObject, bufferImage};

export default connect(mapStateToProps, mapDispatch)(ObjectNPCs);
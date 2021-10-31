import React, {Component, Fragment, useState} from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';




const DynamicText = (props) => {

    const [zHook, setZHook] = useState(-1);

    let textStyle = {
        position: 'absolute',
        top: props.top, // bc of borders on rect
        left: props.left,
        width: props.width,
        height: props.height,
        font: 'sans-serif',
        fontWeight: '900',
        fontSize: '40px',
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: zHook,
        padding: 0,
    }

    

    let activateBlock = () => {
        console.log(textStyle);
        console.log(textStyle.zIndex);

        setZHook(5);
    }

    return (
        <input style={textStyle} onClick={activateBlock} />
    );

};

export default DynamicText;

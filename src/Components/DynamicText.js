import { COMMENT_KEYS } from '@babel/types';
import React, {Component, Fragment, useState} from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';




const DynamicText = (props) => {

    // const [zHook, setZHook] = useState(-1);
    const [textValue, setInput] = useState("");

    let editabletextStyle = {
        position: 'absolute',
        top: props.top, // bc of borders on rect
        left: props.left,
        width: props.width,
        height: props.height,
        font: 'sans-serif',
        fontWeight: '900',
        fontSize: '40px',
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: 5,
        padding: 0,
    }

    let textStyle = {
        position: 'absolute',
        top: props.top, // bc of borders on rect
        left: props.left,
        width: props.width,
        height: props.height,
        font: 'sans-serif',
        fontSize: '40px',
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: -1,
        padding: 0,
    }

    let renderText;

    if(props.isEditable) {
        console.log("this is editable")
        // setZHook(5);
        renderText = (<input style={editabletextStyle} onInput={e => setInput(e.target.value)} value={textValue} />);
    }
    else {
        console.log("not editable")
        // setZHook(-1);
        renderText = (<p style={textStyle}>{textValue}</p>);
    }

    return renderText

};

export default DynamicText;

import { COMMENT_KEYS } from '@babel/types';
import React, {Component, Fragment, useState, useRef} from 'react';
import ContentEditable from 'react-contenteditable'



const DynamicText = (props) => {

    // const [zHook, setZHook] = useState(-1);
    const [textValue, setInput] = useState("");

    let editabletextStyle = {
        position: 'absolute',
        top: props.top, // bc of borders on rect
        left: props.left,
        width: props.width,
        height: props.height,
        fontFamily: 'Helvetica, sans-serif',
        textAlign: 'center',
        fontSize: '40px',
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: 5,
        padding: 0,
        margin:0,
    }

    let textStyle = {
        position: 'absolute',
        top: props.top, // bc of borders on rect
        left: props.left,
        width: props.width,
        height: props.height,
        fontFamily: 'Helvetica, sans-serif',
        textAlign: 'center',
        display: 'inline-block',
        fontSize: '40px',
        border: '1px solid transparent',
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: -1,
        padding: 0,
        margin:0,
        
    }

    const text = useRef('<p>okay</p>');

	const handleChange = e => {
		text.current = e.target.value;
	};

	const handleBlur = () => {
		console.log(text.current);
	};

  	return <ContentEditable
				html={text.current}
				onChange={handleChange} 
				style={textStyle}
			/>

    // let renderText;

    // if(props.isEditable) {
    //     renderText = (<textarea autoFocus style={editabletextStyle} onInput={e => setInput(e.target.value)} value={textValue} />);
    // }
    // else {
    //     renderText = (<p style={textStyle}>{textValue}</p>);
    // }

    // return renderText

};

export default DynamicText;

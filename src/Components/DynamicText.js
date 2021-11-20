import { COMMENT_KEYS } from '@babel/types';
import React, {Component, Fragment, useState, useRef} from 'react';
import ContentEditable from 'react-contenteditable'



const DynamicText = (props) => {

    let textStyle = {
        position: 'absolute',
        top: props.top, // bc of borders on rect
        left: props.left,
        width: props.width,
        height: props.height,
        fontFamily: 'Helvetica, sans-serif',
        textAlign: 'center',
        display: 'inline-block',
        fontSize: '60px',
        border: '1px solid transparent',
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: -1,
        padding: 0,
        margin:0,
        
    }

	if(props.isEditable) {
		textStyle.zIndex = 0;
	}

    const text = useRef('edit me');

	const handleChange = e => {
		text.current = e.target.value;
	};

	// const handleBlur = () => {
	// 	console.log("blur", text.current);
	// };

  	return (
		  <>
			 <ContentEditable
				html={text.current}
				onChange={handleChange} 
				style={textStyle}
				tagName='p'
				disabled={!props.isEditable}
			/>
		  </>
	  );
};

export default DynamicText;

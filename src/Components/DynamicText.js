import { COMMENT_KEYS } from '@babel/types';
import React, {Component, Fragment, useState, useRef, useMemo} from 'react';
import ContentEditable from 'react-contenteditable'

// Import the Slate editor factory.
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

//									 __    __    __
//									(__)  (__)  (__)
//									|  |  |  |  |  |
//									|  |  |  |  |  |
//									|  |  |  |  |  |
//									|  |  |  |  |  |
//									|  |  |  |  |  |
//									|  |  |  |  |  |
//									|  |  |  |  |  |
//									|  |  |  |  |p |
//									|  |  |  |  |k |
//									|  |  |__|  |w |
//									|  |  |   \ |  |
//									\  |  |____\|  |
//									 \ |           |
//									  \|___________|

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

	
    let text = useRef(props.textContent ? props.textContent : props.initialText)

	const handleChange = e => {
		text.current = e.target.value;
		props.updateTextContent(props.uuidkey, text.current);
	};

	const handleBlur = () => {
		console.log("blur", text.current);
	};

  	return (
		  <>
			 <ContentEditable
				html={text.current}
				onChange={handleChange} 
				onBlur={handleBlur}
				style={textStyle}
				tagName='p'
				disabled={!props.isEditable}
			/>
		  </>
	  );
};

export default DynamicText;

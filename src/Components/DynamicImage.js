import React, {Component, Fragment} from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';

//          __
//         / /\
//        / /  \
//       / /    \__________
//      / /      \        /\
//     /_/        \      / /
//  ___\ \      ___\____/_/_
// /____\ \    /___________/\
// \     \ \   \           \ \
//  \     \ \   \____       \ \
//   \     \ \  /   /\       \ \
//    \   / \_\/   / /        \ \
//     \ /        / /__________\/
//      /        / /     /
//     /        / /     /
//    /________/ /\    /
//    \________\/\ \  /
//                \_\/
// 

const DynamicImage = (props) => {

    let imgStyle = {
        position: 'absolute',
        top: props.top + 1, // bc of borders on rect
        left: props.left + 1,
        width: props.width,
        height: props.height,
        transform: 'rotate(' + props.rotateAngle + 'deg)',
        zIndex: -1,
    }

    return (
        <img src={props.dataUrl} style={imgStyle} />
    );

};

export default DynamicImage;

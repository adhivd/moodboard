import React, {useMemo, useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';


function FileDropZone(props) {

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let verticalMiddle = Math.floor(w/2)
    console.log("middle", verticalMiddle)

    let style = {
        width: '1px',
        height: '100%',
        backgroundColor: 'purple',
        position: 'absolute',
        left: verticalMiddle + 'px',
    }

return (
	<>
		{/* <div style={style} /> */}
	</>
  );
}

export default FileDropZone;
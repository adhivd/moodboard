import React, {useMemo, useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
	alignItems: 'center',
	height: '100%',
	width: '100%',
	position: 'fixed',
	zIndex: -9999,
	borderWidth: 2,
	borderRadius: 2,
	borderColor: 'transparent',
	borderStyle: 'dashed',
	outline: 'none',
	transition: 'border .24s ease-in-out'
};

const activeStyle = {
	borderColor: '#2196f3'
};

const acceptStyle = {
	borderColor: '#00e676'
};

const rejectStyle = {
	borderColor: '#ff1744'
};

function FileDropZone(props) {

	const [files, setFiles] = useState([]);

	useEffect(() => {
		props.uploadFiles(files);
	}, [files]);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		open,
		acceptedFiles,
	} = useDropzone(
		{
			noClick: true,
    		noKeyboard: true,
			accept: 'image/*',
			onDrop: acceptedFiles => {
				setFiles(acceptedFiles.map(file => Object.assign(file, {
					preview: URL.createObjectURL(file)
				})));
			}
		});

	props.sendOpenFunction(open);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

//   console.log("getRootProps:", getRootProps())
//   console.log("getInputProps:", getInputProps())
  

  return (
    <div className="dropZone">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
      </div>
    </div>
  );
}

export default FileDropZone;
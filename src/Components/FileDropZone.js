import React, {useMemo, useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	height: '100%',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
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
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

export default FileDropZone;
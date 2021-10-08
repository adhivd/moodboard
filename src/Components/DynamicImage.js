import React, {Component, Fragment} from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';




function DynamicImage extends Component {
    constructor(props) {
        super(props);
        }
        
        render() {

            let content;

            if(this.state.contentType =="img") {
                content = <img src={this.state.dataUrl} />
            }

            const {width, top, left, height, rotateAngle} = this.state
            return (
                    <img
                        style={imgStyle}


                    />
            )
        }

}

export default DynamicImage;

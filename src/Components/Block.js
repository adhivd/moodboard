import React, {Component, Fragment} from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';
import DynamicImage from './DynamicImage';




class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            rotateAngle: 0,
            contentType: props.contentType,
            dataUrl: props.dataUrl,
          }
          
        console.log(this.state);

        }
        
      
        handleResize = (style, isShiftKey, type) => {
          // type is a string and it shows which resize-handler you clicked
          // e.g. if you clicked top-right handler, then type is 'tr'
          let { top, left, width, height } = style
          top = Math.round(top)
          left = Math.round(left)
          width = Math.round(width)
          height = Math.round(height)
          this.setState({
            top,
            left,
            width,
            height
          })

          

          console.log(style)

        }

        handleRotate = (rotateAngle) => {
          this.setState({
            rotateAngle
          })
        }
      
        handleDrag = (deltaX, deltaY) => {
          this.setState({
            left: this.state.left + deltaX,
            top: this.state.top + deltaY
          })
        }
      
        render() {

        let content;

        

        const {width, top, left, height, rotateAngle} = this.state

        if(this.state.contentType =="img") {
            content = <DynamicImage 
                            left={left}
                            top={top}
                            width={width}
                            height={height}
                            dataUrl={this.state.dataUrl}
                        />
        }


          return (
            <Fragment>
                <ResizableRect
                    left={left}
                    top={top}
                    width={width}
                    height={height}
                    rotateAngle={rotateAngle}
                    // aspectRatio={false}
                    // minWidth={10}
                    // minHeight={10}
                    zoomable='n, w, s, e, nw, ne, se, sw'
                    // rotatable={true}
                    // onRotateStart={this.handleRotateStart}
                    onRotate={this.handleRotate}
                    // onRotateEnd={this.handleRotateEnd}
                    // onResizeStart={this.handleResizeStart}
                    onResize={this.handleResize}
                    // onResizeEnd={this.handleUp}
                    // onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                    // onDragEnd={this.handleDragEnd}
                />
                {content}
            </Fragment> 
          )
        }

}

export default Block;

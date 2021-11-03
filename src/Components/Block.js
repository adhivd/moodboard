import React, {Component, Fragment} from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';
import DynamicImage from './DynamicImage';
import DynamicText from './DynamicText';
import './../style/Canvas.scss';






class Block extends Component {
	constructor(props) {
			super(props);

			var img = new Image();
			let height;
			let width;

			img.onload = () => { // hmm should fix this at some point: https://stackoverflow.com/questions/50162522/cant-call-setstate-on-a-component-that-is-not-yet-mounted
					this.setState({
							height: img.height,
							width: img.width,
					})
			}

			img.src = props.dataUrl;

			this.state = {
					width: 100,
					height: 100,
					uuidkey: this.props.uuidkey,
					top: props.initTop,
					left: props.initLeft,
					rotateAngle: 0,
					contentType: props.contentType,
					dataUrl: props.dataUrl,
				}          
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

		handleClick = (e) => {

			this.props.setFocusedBlock(e);

			// this.setState({
			// 	focused: !this.state.focused,
			// });
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
					rotateAngle={rotateAngle}
					dataUrl={this.state.dataUrl}
				/>
			}
			else if(this.state.contentType =="text") {
				content = <DynamicText
					left={left}
					top={top}
					width={width}
					height={height}
					rotateAngle={rotateAngle}
				/>
			}

			// 🧘‍♀️🧘‍♀️🧘‍♀️ focus stuff
			// the idea here is that if the block receives focus, it should remove the class that disables the focus styling

			let focusClass = "notFocused";
			if(this.props.focusedBlockKey == this.state.uuidkey) {
				focusClass = "";
			}

			return (
				<div
					onClick={this.handleClick}
					className={focusClass}
					uuidkey={this.props.uuidkey}
				>
					{content}
					<ResizableRect
						left={left}
						top={top}
						width={width}
						height={height}
						rotateAngle={rotateAngle}
						isFocused={this.focused}
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
				</div> 
			)
		}

}

export default Block;

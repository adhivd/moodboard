import React, {Component, Fragment } from 'react';
import Draggable from 'react-draggable';
import ResizableRect from 'react-resizable-rotatable-draggable';
import DynamicImage from './DynamicImage';
import DynamicText from './DynamicText';
import OutsideAlerter from './OutsideAlerter';
import './../style/Canvas.scss';

class Block extends Component {
	constructor(props) {
			super(props);

			var img = new Image();
			let height
			let width;

			// if cond: the block was copied, then width/height will equal copied block w/h
			// else cond: loads the image, and meanwhile sets a default width/height
			if(props.width && props.height) {
				width = props.width;
				height = props.height;
			}
			else {
				img.onload = () => { // hmm should fix this at some point: https://stackoverflow.com/questions/50162522/cant-call-setstate-on-a-component-that-is-not-yet-mounted
					this.setState({
							height: img.height,
							width: img.width,
					})
				}

				// should probably figure out a way to just get img width / height before
				if(props.contentType == "img" || props.contentType=="gif") {
					width = 100;
					height = 100;
				}
				else if(props.contentType == "text") {
					width = 250;
					height = 100;
				}
			}
			
			img.src = props.dataUrl;

			this.state = {
					width: width,
					height: height,
					uuidkey: this.props.uuidkey,
					focusedBlockKey: this.props.focusedBlockKey,
					top: props.top,
					left: props.left,
					rotateAngle: this.props.rotateAngle,
					contentType: props.contentType,
					dataUrl: props.dataUrl,
					editable: false,
					clickTimer: null,
				}          
		}

		componentDidUpdate(prevProps, prevState) {
            if (prevProps.focusedBlockKey !== this.props.focusedBlockKey && prevProps.focusedBlockKey == this.state.uuidkey) {
				this.setState({
					editable: false,
				})
            }

			if(prevState.editable != this.state.editable) {
				this.props.toggleTextEditMode(this.state.editable);
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
			}, () => {
				this.props.updateWidthHeight(this.state.uuidkey, width, height)
			})


		}

		handleRotate = (rotateAngle) => {
			this.setState({
				rotateAngle
			}, () => {
				this.props.updateRotateAngle(this.state.uuidkey, rotateAngle);
				console.log("rotated", rotateAngle);
			})
		}
	
		handleDrag = (deltaX, deltaY) => {

			console.log("I am called");
			this.setState({
				left: this.state.left + deltaX,
				top: this.state.top + deltaY
			}, () => {
				this.props.updateLeftTopBlockLocation(this.state.uuidkey, this.state.left, this.state.top,);
			})
		}

		// onClickHandler = event => {
		// 	clearTimeout(this.state.timer);
		// 	if (event.detail === 1) {
		// 		timer = setTimeout(this.props.onClick, 200)
		// 	} else if (event.detail === 2) {
		// 		this.props.onDoubleClick()
		// 	}
		// }

		handleClick = (e) => {
			// console.log("click event", e)
			clearTimeout(this.state.clickTimer);
			if(e.target.classList.contains("resizable-handler") 
				|| (e.target.nodeName == "I" && e.target.parentNode.classList.contains("rotate"))) {
				return	
			}

			this.props.setFocusedBlock(e);

			// double click logic for text blocks
			if(this.state.contentType == "text") {
				if(e.detail == 1 && !this.state.editable) {
					this.setState({
						clickTimer: setTimeout(() => {}, 500),
						editable: false,
					})
				}
				else if(e.detail == 2) {
					this.setState({
						editable: true,
					})
				}
			}

			
		}
		
		render() {

			let content;

			const {width, top, left, height, rotateAngle} = this.state

			let isFocused = this.props.focusedBlockKey == this.state.uuidkey;

			if(this.state.contentType =="img" || this.state.contentType=="gif" ) {
				content = <DynamicImage 
					left={left}
					top={top}
					width={width}
					height={height}
					rotateAngle={rotateAngle}
					dataUrl={this.state.dataUrl}
					isFocused={isFocused}
					uuidkey={this.props.uuidkey}
				/>
			}
			else if(this.state.contentType =="text") {
				content = <DynamicText
					left={left}
					top={top}
					width={width}
					height={height}
					rotateAngle={rotateAngle}
					isEditable={this.state.editable}
					isFocused={isFocused}
					uuidkey={this.props.uuidkey}
					textContent={this.props.textContent}
					updateTextContent={this.props.updateTextContent}
					initialText={this.props.initialText}
				/>
			}


			// 🧘‍♀️🧘‍♀️🧘‍♀️ focus stuff
			// the idea here is that if the block receives focus, it should remove the class that disables the focus styling

			let focusClass = "notFocused";
			if(isFocused && !this.state.editable) {
				focusClass = "";
			}

			return (
				<div
					onClick={this.handleClick}
					className={focusClass}
					uuidkey={this.props.uuidkey}
				>
					<OutsideAlerter
						uuidkey={this.props.uuidkey}
						removeAllFocus={this.props.removeAllFocus}
					>
						{/* <BlockToolBox 
						
						/> */}
						{content}
						<ResizableRect
							left={left}
							top={top}
							width={width}
							height={height}
							rotateAngle={rotateAngle}
							isFocused={isFocused}
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
						
					</OutsideAlerter>
				</div> 
			)
		}

}

export default Block;

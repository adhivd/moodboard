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
					focusedBlockKey: this.props.focusedBlockKey,
					top: props.initTop,
					left: props.initLeft,
					rotateAngle: 0,
					contentType: props.contentType,
					dataUrl: props.dataUrl,
					editable: true,
					clickTimer: null,
				}          
		}

		componentDidUpdate(prevProps, prevState) {
            if (prevProps.focusedBlockKey !== this.props.focusedBlockKey && prevProps.focusedBlockKey == this.state.uuidkey) {
                console.log("asdjfalksdjf")
				this.setState({
					editable: false,
				})
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

		// onClickHandler = event => {
		// 	clearTimeout(this.state.timer);
		// 	if (event.detail === 1) {
		// 		timer = setTimeout(this.props.onClick, 200)
		// 	} else if (event.detail === 2) {
		// 		this.props.onDoubleClick()
		// 	}
		// }

		handleClick = (e) => {
			clearTimeout(this.state.clickTimer);
			if(e.target.classList.contains("resizable-handler") 
				|| e.target.nodeName == "I") {
				return	
			}

			this.props.setFocusedBlock(e);

			if(e.detail == 1) {
				this.setState({
					clickTimer: setTimeout(() => { console.log("yuh bb")}, 200),
					editable: false,
				})
			}
			else if(e.detail == 2) {
				console.log("oh yepppppp");
				this.setState({
					editable: true,
				})
			}
			// make sure the click is on the BLOCK. not a handler
			// TODO: rewrite clicking logic so that it's less spread out across the app


			// console.log("this is thie click")

			// let k = e.target.parentNode.attributes.uuidkey.value;

			// // handle text block example
			// if(this.props.contentType == 'text' && this.props.focusedBlockKey == this.state.uuidkey) {
			// 	// console.log("hmmm something should happen here")
				
			// }

			

			// this.setState({
			// 	focused: !this.state.focused,
			// });
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

						{/* { TODO: IMPLEMENT RESIZABLE RECT AROUND THE CONTENT LMFAO} */}
					</OutsideAlerter>
				</div> 
			)
		}

}

export default Block;

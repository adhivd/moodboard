import React, {Component, useEffect } from 'react';
import Toolkit from './Toolkit'
import Draggable from 'react-draggable';
import Block from './Block';
import FileDropZone from './FileDropZone';

import { v4 as uuidv4 } from 'uuid';
import './../style/Canvas.scss';


class Canvas extends Component {

    constructor(props) {
        super(props);

        // figure out browser current width / height
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        
        this.state = {
            activeBlockRef: null,
            browserWidth: width,
            browserHeight: height,
            blockMap: {},
            nextLeft: 100,
            nextTop: 100,
            focusedBlockKey : null,
            lastCopiedBlockKey: null,
            textEditMode: false,
            openFunction: null,
            initialText: "edit me"
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyboardDetect, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyboardDetect, false);
    }

    toggleTextEditMode = (val) => {
        this.setState({
            textEditMode: val,
        })
    }

    getBlock = (uuid) => {
        return this.state.blockMap[uuid]
    }

    updateTextContent = (uuid, textContent) => {
        // let blockCopy = this.getBlock(uuid);
        // blockCopy.textContent = textContent;
        // this.state.blockMap[uuid] = blockCopy;

        this.setState(prevState => ({
            blockMap: {
              ...prevState.blockMap,           // copy all other key-value pairs of blockMap object
            [uuid]: {                         // specific object of blockMap object
                ...prevState.blockMap[uuid],   // copy all block key-value pairs
                textContent: textContent          // update value of specific textContent key
              }
            }
        }))
    }

    updateLeftTopBlockLocation = (uuid, left, top) => {
        this.setState(prevState => ({
            blockMap: {
              ...prevState.blockMap,           // copy all other key-value pairs of blockMap object
            [uuid]: {                         // specific object of blockMap object
                ...prevState.blockMap[uuid],   // copy all block key-value pairs
                left: left,          
                top: top,
              }
            }
        }))
    } 

    keyboardDetect = (e) => {
            // console.log("detect", e)

            // delete
            if((e.keyCode == 8 || e.keyCode === 46) 
                    && this.state.focusedBlockKey != null 
                    && !this.state.textEditMode) {
                delete this.state.blockMap[this.state.focusedBlockKey];
                this.setState({
                    focusedBlockKey: null
                })
            }

            // cmd + c
            else if((e.key == "c" && e.metaKey) && this.state.focusedBlockKey != null) {
                console.log(this.state.blockMap[this.state.focusedBlockKey]);
                this.setState(prevState => ({
                    lastCopiedBlockKey: prevState.focusedBlockKey,
                    nextLeft: prevState.blockMap[prevState.focusedBlockKey].left + 50,
                    nextTop: prevState.blockMap[prevState.focusedBlockKey].top + 50
                }))
            }

            // cmd + v
            else if((e.key == "v" && e.metaKey) && this.state.focusedBlockKey != null) {
                console.log(this.state.blockMap)
                this.copyBlock(this.state.lastCopiedBlockKey)
                // let block = this.state.blockMap[]
                // this.addBlock({},{})
                // this.setState({
                    
                // })
            }
    }

    setFocusedBlock = (e) => {
        let k;
        // script to "swim" up the HTML DOM until you find a div tag w/ uuidkey for the block
        let finder = e.target;
        while(!finder.attributes.uuidkey) {
            finder = finder.parentNode;
        }

        k = finder.attributes.uuidkey.value;

        this.setState({
            focusedBlockKey: k,
        })        
    }

    removeAllFocus = () => {
        this.setState({
            focusedBlockKey: null,
        });
    }

    copyBlock = (uuid) => {
        let id = uuidv4();
        let blockToCopy = this.getBlock(uuid);

        let newBlockData = {
            contentType: blockToCopy.contentType,
            dataUrl: blockToCopy.dataUrl,
            uuidkey: id,
            textContent: blockToCopy.textContent,
            left: this.state.nextLeft,
            top: this.state.nextTop,
        };

        // copy copy copy
        let prevBlockMap = this.state.blockMap;
        let left = this.state.nextLeft;
        let top = this.state.nextTop;

        // push to list + map
        prevBlockMap[id] = newBlockData;

        // set state
        this.setState({
            blockMap: prevBlockMap,
            nextLeft: left + 50,
            nextTop: top + 50,
            focusedBlockKey: id,
        });
    }

    addBlock = (type, dataUrl) => {
        let id = uuidv4();
        let newBlockData = {
            contentType: type,
            dataUrl: dataUrl,
            uuidkey: id,
            textContent: this.state.initialText,
            left: this.state.nextLeft,
            top: this.state.nextTop,
        }
        
        // copy blockmap + left + top data from state
        let prevBlockMap = this.state.blockMap;
        let left = this.state.nextLeft; // can probably just move this to state I think
        let top = this.state.nextTop;

        // push to list + map
        prevBlockMap[id] = newBlockData;

        // set state
        this.setState({
            blockMap: prevBlockMap,
            nextLeft: left + 50,
            nextTop: top + 50,
            focusedBlockKey: id,
        });
    }

    uploadFiles = (files) => {
        if(files[0]) {
            this.addBlock("img", files[0].preview);
        }
        
    }

    sendOpenFunction = (open) => {
        if(!this.state.openFunction) {
            this.setState({
                openFunction: open,
            })
        }
    }
   

    render() {

        let renderBlocks = [];

        //  this part is a WIP
        for (let k in this.state.blockMap) {
            let block = this.state.blockMap[k];

            renderBlocks.push(<Block     
                                    contentType={block.contentType}
                                    dataUrl={block.dataUrl}
                                    left={block.left}
                                    top={block.top}
                                    updateLeftTopBlockLocation={this.updateLeftTopBlockLocation}
                                    setFocusedBlock={this.setFocusedBlock}
                                    removeAllFocus={this.removeAllFocus}
                                    focusedBlockKey={this.state.focusedBlockKey}
                                    key={block.uuidkey}
                                    uuidkey={block.uuidkey}
                                    toggleTextEditMode={this.toggleTextEditMode}
                                    textContent={block.textContent}
                                    updateTextContent={this.updateTextContent}
                                    initialText={this.state.initialText}
                                />)
        }

        // 😵 commented out for now since .map isn't a thing for objects
        // let blockList = this.state.blockMap.map(
        //     (block) => {
                
        //     }
        // )

        return (
            <div>
                <Toolkit 
                    addBlock={this.addBlock}
                    receiveOpenFunction={this.state.openFunction}
                />
                {renderBlocks}
                <FileDropZone 
                    uploadFiles={this.uploadFiles}
                    sendOpenFunction={this.sendOpenFunction}
                />
            </div>
        );
    }    

}

export default Canvas;

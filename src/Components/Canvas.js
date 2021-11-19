import React, {Component, useEffect } from 'react';
import Toolkit from './Toolkit'
import Draggable from 'react-draggable';
import Block from './Block';
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
            lastLeft: 100,
            lastTop: 100,
            focusedBlockKey : null,
            textEditMode: false,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.deleteDetect, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.deleteDetect, false);
    }

    toggleTextEditMode = (val) => {
        this.setState({
            textEditMode: val,
        })
    }

    deleteDetect = (e) => {
            if((e.keyCode == 8 || e.keyCode === 46) 
                    && this.state.focusedBlockKey != null 
                    && !this.state.textEditMode) {
                delete this.state.blockMap[this.state.focusedBlockKey];
                this.setState({
                    focusedBlockKey: null
                })
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

    addBlock = (type, dataUrl) => {
        let id = uuidv4();
        let newBlockData = {
            contentType: type,
            dataUrl: dataUrl,
            uuidkey: id,
        }
        
        // copy copy copy
        let prevBlockMap = this.state.blockMap;
        let left = this.state.lastLeft; // can probably just move this to state I think
        let top = this.state.lastTop;

        // push to list + map
        prevBlockMap[id] = newBlockData;

        // set state
        this.setState({
            blockMap: prevBlockMap,
            lastLeft: left + 50,
            lastTop: top + 50,
            focusedBlockKey: id,
        });
    }
   

    render() {

        let renderBlocks = [];

        //  this part is a WIP
        for (let k in this.state.blockMap) {
            let block = this.state.blockMap[k];

            renderBlocks.push(<Block     
                                    contentType={block.contentType}
                                    dataUrl={block.dataUrl}
                                    initLeft={this.state.lastLeft}
                                    initTop={this.state.lastTop}
                                    setFocusedBlock={this.setFocusedBlock}
                                    removeAllFocus={this.removeAllFocus}
                                    focusedBlockKey={this.state.focusedBlockKey}
                                    key={block.uuidkey}
                                    uuidkey={block.uuidkey}
                                    toggleTextEditMode={this.toggleTextEditMode}
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
                
                />
                {renderBlocks}
            </div>
        );
    }    

}

export default Canvas;

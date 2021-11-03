import React, {Component} from 'react';
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
            focusedBlockKey : null
        }
    }

    setFocusedBlock = (e) => {
        let k = e.target.parentNode.attributes.uuidkey.value;

        this.setState({
            focusedBlockKey: k,
        }, () => {
            console.log("focused key set", k);
            console.log("elements: ", this.state.blockMap);
        })
        
        // ideally some code in here that finds the element in the blockMap and edits the "FOCUSED" key?
    }

    addBlock = (type) => {
        console.log("block added", type);
        let id = uuidv4();
        let newBlockData = {
            contentType: type,
            dataUrl: "https://media.giphy.com/media/kEEd75zRpcgBidBttQ/giphy-downsized-large.gif",
            uuidkey: id,
        }
                        // old: block component data
                        // <Block 
                        //     contentType={type}
                        //     dataUrl="https://media.giphy.com/media/kEEd75zRpcgBidBttQ/giphy-downsized-large.gif"
                        //     initLeft={this.state.lastLeft}
                        //     initTop={this.state.lastTop}
                        //     setFocusedBlock={this.setFocusedBlock}
                        //     focusedBlockKey={this.state.focusedBlockKey}
                        //     key={id}
                        //     uuidkey={id}
                        // />
        
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
        }, () => {
            console.log("blockmap updated:", this.state.blockMap);
        });
    }
   

    render() {

        let renderBlocks = [];

        //  this part is a WIP
        for (let k in this.state.blockMap) {
            let block = this.state.blockMap[k];
            console.log("block in for loop: ", block)

            renderBlocks.push(<Block     
                                    contentType={block.contentType}
                                    dataUrl={block.dataUrl}
                                    initLeft={this.state.lastLeft}
                                    initTop={this.state.lastTop}
                                    setFocusedBlock={this.setFocusedBlock}
                                    focusedBlockKey={this.state.focusedBlockKey}
                                    key={block.uuidkey}
                                    uuidkey={block.uuidkey}
                                />)
        }

        console.log("renderBlocks array: ", renderBlocks);

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

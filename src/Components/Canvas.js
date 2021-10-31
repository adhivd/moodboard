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
            blockList: [],
            blockMap: {},
            lastLeft: 100,
            lastTop: 100,
            focusedBlockKey : null
        }
    }

    setFocusedBlock = (e) => {
        console.log("event", e);

        console.log(e.target.parentNode.attributes.uuidkey.value);

        let k = e.target.parentNode.attributes.uuidkey.value;

        console.log("block found:", this.state.blockMap[k], this.state.blockMap);
        
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
        let newBlock = <Block 
                            contentType={type}
                            dataUrl="https://media.giphy.com/media/kEEd75zRpcgBidBttQ/giphy-downsized-large.gif"
                            initLeft={this.state.lastLeft}
                            initTop={this.state.lastTop}
                            setFocusedBlock={this.setFocusedBlock}
                            focusedBlockKey={this.state.focusedBlockKey}
                            key={id}
                            uuidkey={id}
                        />
        
        // copy copy copy
        let prevBlockList = this.state.blockList;
        let prevBlockMap = this.state.blockMap;
        let left = this.state.lastLeft;
        let top = this.state.lastTop;

        // push to list + map
        prevBlockList.push(newBlock);
        prevBlockMap[id] = newBlock;

        // set state
        this.setState({
            blockList: prevBlockList,
            blockMap: prevBlockMap,
            lastLeft: left + 50,
            lastTop: top + 50,
        }, () => {
            // set focus here?
            console.log("BLOCKMAP IS IN", this.state.blockMap);
        });
    }
   

    render() {

        let blockList = this.state.blockList;

        return (
            <div>
                <Toolkit 
                    addBlock={this.addBlock}
                
                />
                {blockList.map((el) => {
                    console.log("el: ", el);
                    // if(el.key == this.state.focusedBlockKey) {
                    //     el.props.isFocused = true;
                    // }
                    return el;
                })}
            </div>
        );
    }    

}

export default Canvas;

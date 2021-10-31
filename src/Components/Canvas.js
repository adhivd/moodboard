import React, {Component} from 'react';
import Toolkit from './Toolkit'
import Draggable from 'react-draggable';
import Block from './Block';
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
            lastLeft: 100,
            lastTop: 100
        }
    }

    addBlock = (type) => {
        console.log("block added", type);
        let newBlock = <Block 
                            contentType={type}
                            dataUrl="https://media.giphy.com/media/kEEd75zRpcgBidBttQ/giphy-downsized-large.gif"
                            initLeft={this.state.lastLeft}
                            initTop={this.state.lastTop}
                        />
        
        let prevBlockList = this.state.blockList;
        let left = this.state.lastLeft;
        let top = this.state.lastTop;
        prevBlockList.push(newBlock);
        this.setState({
            blockList: prevBlockList,
            lastLeft: left + 50,
            lastTop: top + 50,
        }, () => {
            console.log(this.state.blockList);
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
                    return el;
                })}
            </div>
        );
    }    

}

export default Canvas;

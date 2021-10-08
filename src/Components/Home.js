import React, {Component} from 'react';
import Draggable from 'react-draggable';
import Block from './Block';





class Home extends Component {

    constructor(props) {
        super(props);
        


        this.getXY = this.getXY.bind(this);     
    }

    componentDidMount() {
        // document.getElementById('example').setAttribute('draggable', false);
    }

    getXY = (el) => {
        console.log(el);
        // var rect = el.getBoundingClientRect();
        // console.log('X: ' + rect.x + ', ' + 'Y: ' + rect.y);
    }
   

    render() {
        return (
            <div>
                <Block 
                    contentType="img"
                    dataUrl="https://media.giphy.com/media/kEEd75zRpcgBidBttQ/giphy-downsized-large.gif"
                />
                <Draggable>
                    <p>Hello</p>

                </Draggable>
            </div>
        )
    }    

}

export default Home;

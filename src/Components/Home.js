import React, {Component} from 'react';
import Draggable from 'react-draggable';





class Home extends Component {

    constructor(props) {
        super(props);
        


        this.getXY = this.getXY.bind(this);     
    }

    componentDidMount() {
        document.getElementById('example').setAttribute('draggable', false);
    }

    getXY = (el) => {
        console.log(el);
        // var rect = el.getBoundingClientRect();
        // console.log('X: ' + rect.x + ', ' + 'Y: ' + rect.y);
    }
   

    render() {
        return (
            <Draggable>
                <img src="https://i.giphy.com/media/cb22OXcPqwmg8/giphy.webp" className="box" id="example" onClick={this.getXY} />
            </Draggable>
        )
    }    

}

export default Home;

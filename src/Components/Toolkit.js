import React, {Component, Fragment} from 'react';
import plus from '../content/img/plus.png';
import text from '../content/img/text.png';
import img from '../content/img/img.png';



class Toolkit extends Component {

    constructor(props) {
        super(props);

    }

    addImage = () => {
        this.props.addBlock('img');
    }
    
    addText = () => {
        this.props.addBlock('text');
    }
    

    render() {


        return (
            <div className="toolkit">
                <div className="action add" onClick={this.addImage}>
                    <img src={img} />
                </div>
                <div className="action add" onClick={this.addText}>
                    <img src={text} />
                </div>
            </div>
        );
    } 

}

export default Toolkit;

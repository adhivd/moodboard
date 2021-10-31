import React, {Component, Fragment} from 'react';
import plus from '../content/img/plus.png';




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
                    <img src={plus} />
                </div>
                <div className="action add" onClick={this.addText}>
                    <img src={plus} />
                </div>
            </div>
        );
    } 

}

export default Toolkit;

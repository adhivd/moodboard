import React, {Component, Fragment} from 'react';
import GiphyTool from './GiphyTool';
import plus from '../content/img/plus.png';
import text from '../content/img/text.png';
import img from '../content/img/img.png';
import gif from '../content/img/gif.png'

import './../style/Canvas.scss';


class Toolkit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            giphyModalOpen: false,
        }

    }

    addImage = () => {
        this.props.addBlock('img');
    }
    
    addText = () => {
        this.props.addBlock('text');
    }

    openGiphyModal = () => {
        this.setState({
            giphyModalOpen: !this.state.giphyModalOpen,
        });
    }

    addGif = (dataUrl) => {
        this.props.addBlock('gif', dataUrl);
        console.log("url: ", dataUrl)
        // images.original.url
    }

    render() {
        let giphyModal;

        if(this.state.giphyModalOpen) {
            giphyModal = <GiphyTool 
                addGif={this.addGif}
            />
        }

        return (
            <>
                <div className="toolkit">
                    <div className="action add" onClick={this.addImage}>
                        <img src={img} />
                    </div>
                    <div className="action add" onClick={this.addText}>
                        <img src={text} />
                    </div>
                    <div className="action add" onClick={this.openGiphyModal}>
                        <img src={gif} />
                    </div>
                </div>
                {giphyModal}
            </>
        );
    } 

}

export default Toolkit;

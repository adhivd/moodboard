import React, {Component, Fragment} from 'react';
import addImage from '../content/img/plus.png';




const Toolkit = (props) => {

    return (
        <div className="toolkit">
            <div className="action add" onClick={props.addBlock}>
                <img src={addImage} />
            </div>
        </div>
    );

};

export default Toolkit;

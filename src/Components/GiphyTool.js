import React, {Component, Fragment, useEffect, useState} from 'react';
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Gif,
  Grid,
} from "@giphy/react-components";

import './../style/Canvas.scss';


const GiphyTool = (props) => {
    const gf = new GiphyFetch('CIrQN6CNRXqOEdMvR537mAlxGdjwhYLn')

    const [input, setInput] = useState('kanye west');
    const [fetchGifs, setFetchGifts] = useState(() => {});


    console.log("1", input, fetchGifs);

    useEffect(() => {
        console.log("2", input, fetchGifs)
        const res = (offset) => gf.search(input, { offset, limit: 10 })
        setFetchGifts(res);
        console.log("3", input, fetchGifs);
    }, [input])
    // const fetchGifs = (offset) => gf.search(input, { offset, limit: 10 });
    
    // useEffect(() => {
    //     fetchGifs = (offset) => gf.search(input, { offset, limit: 10 });
    // }, [input]);

    const [width, setWidth] = useState('300');
    
    let onGifClick = () => { console.log("booyah")}

    console.log("4", input, fetchGifs)
    
    return (
        <div className="giphyModal">
            <input value={input} onInput={e => setInput(e.target.value)} />
            <Grid
                onGifClick={onGifClick}
                fetchGifs={fetchGifs}
                width={width}
                columns={1}
                gutter={6}
            />
        </div>
    );

};


function GridDemo({ onGifClick }) {
    
  }

export default GiphyTool;

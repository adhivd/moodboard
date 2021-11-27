import React, {Component, Fragment, useEffect, useState} from 'react';
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Gif,
  Grid,
} from "@giphy/react-components";
import search from '../content/img/search.png'
import ReactGiphySearchbox from 'react-giphy-searchbox'

 

import './../style/Canvas.scss';

// |     .-.
// |    /   \         .-.
// |   /     \       /   \       .-.     .-.     _   _
// +--/-------\-----/-----\-----/---\---/---\---/-\-/-\/\/---
// | /         \   /       \   /     '-'     '-'
// |/           '-'         '-'


const GiphyTool = (props) => {

    // man all this shit was useless. couldn't figure out how to do it with hooks

    // const [state, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);
    

    // const gf = new GiphyFetch('CIrQN6CNRXqOEdMvR537mAlxGdjwhYLn')

    // const [input, setInput] = useState('kanye west');
    // useEffect(() => {
    //     console.log("input hcanged:", input);
    // }, [input])
    
    // // console.log("I was run here", input);
    // const testfetchGifs = (offset) => gf.search(input, { offset, limit: 10 });
    // console.log("testfetch: ", input, testfetchGifs);
    // // useEffect(() => {
    // //     fetchGifs = (offset) => gf.search(input, { offset, limit: 10 });
    // // }, [input]);

    // const [width, setWidth] = useState('300');
    
    // let onGifClick = () => { console.log("booyah")}

    const [library, setLibrary] = useState('gifs');
    
    const [place, setPlace] = useState('GIFs');

    useEffect(() => {
        if(library == "gifs") {
            setPlace('GIFs');
        }
        else {
            setPlace('Stickers');
        }
    }, [library])

    let placeholder = 'Search for ' + place;

    
    
    return (
        <div className="giphyModal">
            <div className="gifStickerSwitcher">
                <div 
                    className={"option" + ((library == 'gifs') ? ' selected' : '')}
                    onClick={() => setLibrary('gifs')}
                >
                        GIFs
                </div>
                <div 
                    className={"option" + ((library == 'stickers') ? ' selected' : '')}
                    onClick={() => setLibrary('stickers')}
                >
                    Stickers
                </div>

            </div>
            {/* <div className="search">
                <input value={input} onInput={e => setInput(e.target.value)} />
                <div 
                    className="searchButton" 
                    onClick={() => {
                        forceUpdate();
                    }
                
                }>
                    <img src={search} />
                </div>
            </div>

            <Grid
                onGifClick={onGifClick}
                fetchGifs={testfetchGifs}
                input={input}
                width={width}
                columns={1}
                gutter={6}
            /> */}
            <ReactGiphySearchbox 
                masonryConfig={[
                    { columns: 1, imageWidth: 310, gutter: 5 },
                ]}
                apiKey="CIrQN6CNRXqOEdMvR537mAlxGdjwhYLn" // Required: get your on https://developers.giphy.com
                onSelect={item => {
                    console.log("dataUrl top level", item.images.original.url);
                    props.addGif(item.images.original.url)}
                }
                gifListHeight={'430px'}
                placeholder={placeholder}
                library={library}
                // searchPlaceholder={'kanye west'}

            />
        </div>
    );

};


function GridDemo({ onGifClick }) {
    
  }

export default GiphyTool;

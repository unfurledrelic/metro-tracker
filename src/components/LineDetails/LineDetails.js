import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import json from '../../key.json';
import Line from './Line';

const defaultState = {Lines: []}

function LineDetails(props) {
    const [lineStatus, setLineStatus] = useState(defaultState);
    const [lineStatusRetrieved, setLineStatusRetrieved] = useState(false);
    const location = useLocation();

    async function fetchMetroLines() {
        console.log(lineStatusRetrieved);
        console.log(lineStatus);
        if (lineStatusRetrieved === true) {
            console.log("line status already retrieved");
            return;
        }
        const response = await fetch('https://api.wmata.com/Rail.svc/json/jLines?api_key=' + json['api-key']);
        const data = await response.json();
        
        console.log(data)
        setLineStatus(data);
        setLineStatusRetrieved(true);
    }
    useEffect(() => {fetchMetroLines()}, []);
    

    const shrink = (location.pathname == '/lines' || location.pathname == '/lines/') ? "" : "shrink"

    return (<span className={shrink}> {lineStatusRetrieved ? 
            (lineStatus.Lines.map((item) => {
                console.log(item);
                return <Line key={item.LineCode} lineData={item}/>
                }) 
            ) : "Loading..."} 
        </span>)
}

export default React.memo(LineDetails);
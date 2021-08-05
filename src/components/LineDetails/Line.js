import React, { useState } from 'react';
import json from '../../key.json';
import { Link, useParams, useLocation } from 'react-router-dom';
import './Line.css'

function Line(props) {

    const [stationsFetched, setStationsFetched] = useState(false);
    const [stations, setStations] = useState({});
    const [stationsShown, setStationsShown] = useState(false);
    const [displayedStation, setDisplayedStation] = useState(-1);
    const { lineId } = useParams();
    const location = useLocation();
    console.log(lineId);

    async function fetchLineStations() {
        const response = await fetch('https://api.wmata.com/Rail.svc/json/jStations?LineCode=' + props.lineData.LineCode,
            { 
                method: 'get', 
                headers: new Headers({
                'api_key' : json['api-key']
                })
            }
        );
        const data = await response.json();

        console.log(data);
        setStations(data);
        setStationsFetched(true);
    }

    function toggleShowStations() {
        if (!stationsFetched) {
            fetchLineStations();
        }

        setStationsShown(!stationsShown);
    }

    //this should toggle the display, i think...
    function goToTop() {
        window.scrollTo(0, 0);
    }

    return (<React.Fragment>
        <div onClick={toggleShowStations} className={`${props.lineData.LineCode} metroLine`}>{props.lineData.DisplayName}</div>
        
        {!stationsFetched && stationsShown && <div></div>}

        {stationsFetched && stationsShown && 
         (<div className="stationList">
             {stations.Stations.map((item, index) => {
                    return <Link to={`/lines/${item.LineCode1}/${item.Code}`} onClick={goToTop}>{item.Name}</Link>
        })}</div>)}
    </React.Fragment>);
}

export default Line;
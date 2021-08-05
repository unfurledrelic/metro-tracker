import React, { useState, useEffect } from 'react';
import json from '../../key.json';
import { Link, useHistory } from 'react-router-dom';
import './Map.css';
import MapDot from './MapDot.js';

function Map(props) {
    const history = useHistory();

    const [routeSelection, setRouteSelection] = useState(false);
    const [selections, setSelections] = useState([]);
    const [hoveredStation, setHoveredStation] = useState("");

    const [stationStatus, setStationStatus] = useState();
    const [stationStatusRetrieved, setStationStatusRetrieved] = useState(false);
    
    
    const [minLat, setMinLat] = useState(0);
    const [maxLat, setMaxLat] = useState(0);
    const [minLon, setMinLon] = useState(0);
    const [maxLon, setMaxLon] = useState(0);

    async function fetchMetroStations() {
        if (stationStatusRetrieved == true) {
            console.log("line status already retrieved");
        }
        const response = await fetch('https://api.wmata.com/Rail.svc/json/jStations?api_key=' + json['api-key']);
        const data = await response.json();
        
        console.log(data)
        setStationStatus(data);
        setStationStatusRetrieved(true);

        let minLat = data.Stations[0].Lat;
        let maxLat = data.Stations[0].Lat;
        let minLon = data.Stations[0].Lon;
        let maxLon = data.Stations[0].Lon;
        
        for (let station of data.Stations) {
            if (station.Lat > maxLat) {
                maxLat = station.Lat;
            }
            if (station.Lat < minLat) {
                minLat = station.Lat;
            }
            if (station.Lon > maxLon) {
                maxLon = station.Lon;
            }
            if (station.Lon < minLon) {
                minLon = station.Lon;
            }
        }
        //i actually want a square map. that way the scaling is easier. it'll look better, too
        setMaxLat(maxLat);
        setMaxLon(maxLon);
        setMinLon(minLon);
        setMinLat(minLat);

        console.log(`min lat,long: ${minLat} ${minLon} max lat,long ${maxLat} ${maxLon}`)

    }
    useEffect(() => {fetchMetroStations()}, []);
    
    function addToSelection(stationCode) {
        if (routeSelection == true) {
            console.log(selections);
            if (selections.length == 0) {
                setSelections([stationCode])
            }
            if (selections.length == 1) {
                setSelections([...selections, stationCode])
                history.push(`/routeFinder?from=${selections[0].Code}?to=${stationCode.Code}`)
            }
        }
    }

    return (stationStatusRetrieved ?        
            <React.Fragment>
                <div className="title"> Washington, DC Metro Map: select a station to get details! </div>
                <div className="map" style={
                {width: (maxLon - minLon) * 1140 + 25, 
                height: (maxLat - minLat) * 1550 + 25, 
                }}>
                    {stationStatus.Stations.map((item, index) => {
                        return <MapDot setStation={setHoveredStation} selectionMode={routeSelection} addToSelection={addToSelection} item={item} minLon={minLon} maxLat={maxLat}/>
                    })} 
                </div>
                <div className="mapDetails">
                    <div> {hoveredStation} </div>
                    <div> Selection mode: {routeSelection ? "Route selection" : "Station selection"} 
                        <button onClick={() => {setRouteSelection(!routeSelection)}}> Swap mode </button> 
                    </div>
                    <div> {routeSelection ? `Current selections: ${selections[0] ? selections[0].Name : "?"} -> ${selections[1] ? selections[1].Name : "?"}` : ``} </div>
                </div>
            </React.Fragment> : "");
}

export default React.memo(Map);
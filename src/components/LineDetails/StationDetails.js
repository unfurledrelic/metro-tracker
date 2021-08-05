import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import json from '../../key.json';

function StationDetails() {
    let [ stationDetails, setStationDetails ] = useState({});
    let [ togetherStation1, setTogetherStation1] = useState({});
    let [ togetherStation2, setTogetherStation2] = useState({});
    let { stationId } = useParams();
    let history = useHistory();

    useEffect(() => {fetchLineStation()}, [stationId]);

    async function fetchStation(id) {
        const response = await fetch('https://api.wmata.com/Rail.svc/json/jStationInfo?StationCode=' + id,
            { 
                method: 'get', 
                headers: new Headers({
                'api_key' : json['api-key']
                })
            }
        );
        const data = await response.json();
        return data;
    }

    async function fetchLineStation() {
        let data = await fetchStation(stationId);
        console.log(data);
        setStationDetails(data);

        if (data.StationTogether1) {
            let newStation = await fetchStation(data.StationTogether1);
            console.log(newStation);
            setTogetherStation1(newStation);
        } else {
            setTogetherStation1({});
        }

        if (data.StationTogether2) {
            let newStation = await fetchStation(data.StationTogether2);
            console.log(newStation);
            setTogetherStation2(newStation);
        } else {
            setTogetherStation2({});
        }
    }

    return <span className="stationDetails">
        <h2 className="title"> {stationDetails.Name} </h2>
        <h4 className="address"> {stationDetails.Address?.Street} </h4>
        <div className="lines"> 
            Line(s): {[stationDetails, togetherStation1, togetherStation2].map((item) => {return (
                <React.Fragment>
                {item.LineCode1 ? <div class={`${item.LineCode1} dot`}/> : ""} 
                {item.LineCode2 ? <div class={`${item.LineCode2} dot`}/> : ""}
                {item.LineCode3 ? <div class={`${item.LineCode3} dot`}/> : ""}
                {item.LineCode4 ? <div class={`${item.LineCode4} dot`}/> : ""}
                </React.Fragment>)} 
            )}
        </div>
        <button onClick={() => {history.push("/lines")}}> Back </button>
    </span>
}

export default StationDetails;
import { Link } from "react-router-dom";
import { useState } from 'react';

function MapDot(props) {
    let [showFront, setShowFront] = useState(false);

    let item = props.item;
    let minLon = props.minLon;
    let maxLat = props.maxLat;

    let className = item.LineCode1; 
    className += (item.LineCode2 ? " " + item.LineCode2 : ""); 
    className += (item.LineCode3 ? " " + item.LineCode3 : "");
    className += (item.LineCode4 ? " " + item.LineCode4 : ""); 
    
    function mouseOver() {
        props.setStation(item.Name);
        setShowFront(true);
    }

    function mouseOut() {
        props.setStation("");
        setShowFront(false);
    }

    
    function selectionModeOnClick(event) {
        if (props.selectionMode == true) {
            event.preventDefault();
            props.addToSelection(item);
        }
    }

    return <div onMouseOver={mouseOver} onMouseOut={mouseOut} className={`${className} dot`} style={{zIndex: (showFront ? "100" : ""), position: 'fixed', marginLeft: (item.Lon - minLon) * 1140, marginTop: (item.Lat - maxLat) * -1550}}>
        <Link onClick={selectionModeOnClick} to={`/lines/${item.LineCode1}/${item.Code}`}> </Link>
    </div>
}

export default MapDot;
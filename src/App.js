import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  Link
} from "react-router-dom";
import { useState, useEffect } from 'react';
import json from './key.json';
import Line from './components/LineDetails/Line';
import Map from './components/Map/Map';
import LineDetails from './components/LineDetails/LineDetails';
import StationDetails from './components/LineDetails/StationDetails';
import Header from './components/Header';

function App() {
  //0-based selection
  const [selectedPage, setSelectedPage] = useState(1);
  console.log("rerendering!");
  return (
    <Router>
      <div className="App">
        <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
        
         {/* the router here causes an issue - the map and linedetails are rerendering every time they load. dont think i want that.. or maybe I
          TODO:
          let map select multiple stations then send you to the route finder page
          route finder page
          tracking issues across the metro station 
         */}
        <Switch>
         
          <Route path="/map" exact>
            <Map></Map>
          </Route>

          <Route path="/lines">
            <LineDetails></LineDetails>

            <Route path="/lines/:line/:stationId"> 
              <StationDetails></StationDetails>
            </Route>
          </Route>
          
          <Route path="/routeFinder">
            Coming soon...
          </Route>

          <Route path="/issues">
            Coming soon...
          </Route>

          <Route exact path="/">
            <Redirect to="/lines" />
          </Route>
          <Route>
           404: No page found. Click <Link to="/">here</Link> to go to the main page.
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

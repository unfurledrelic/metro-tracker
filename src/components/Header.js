import './Header.css';

import { NavLink } from 'react-router-dom';

function Header(props) {
    return <div className="Header">
        <span>MetroHunter</span>
        <NavLink to='/map' activeClassName="selected">Map</NavLink>
        <NavLink to='/lines' activeClassName="selected">Lines</NavLink>
        <NavLink to="/routeFinder" activeClassName="selected">Route Finder</NavLink>
        <NavLink to='/issues' activeClassName="selected">Interruptions</NavLink>
    </div>
}

export default Header;
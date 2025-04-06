import React from 'react';
import './BottomNav.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookAtlas, faDiagramSuccessor, faHome, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/bonus" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faBookAtlas} />
                <span>Portfolio</span>
            </NavLink>
            <NavLink to="/profile" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faPeopleGroup} />
                <span>Team</span>
            </NavLink>
        </nav>
    );
}

export default BottomNav;
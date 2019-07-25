import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

class NavBar extends Component {
    render() {
        return (
            <nav className="nav-bar">
                <div className="wrapper">
                    <Link to="/">
                        <i className="fab fa-instagram" />
                    </Link>

                    <Link to="/new">
                        <i className="fas fa-camera" />
                    </Link>
                </div>
            </nav>
        );
    }
}

export default NavBar
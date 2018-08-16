import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './header.css'

class Header extends Component {

    render() {
        return (
            <header >
                <nav className={'container center-div-vertical'}>
                    <div id='box-title'>
                        <h1>Finances</h1>
                    </div>
                    <div className={'nav-container center-div-vertical'}>
                        <ul>
                            <div>
                                <li><Link to="/revenues">Revenues</Link></li>
                                <li><Link to="/">Expenses</Link></li>
                                <li><Link to="/">Sources</Link></li>
                                <li><Link to="/">Reports</Link></li>
                            </div>
                        </ul>
                    </div>
                </nav>
            </header>

        );
    }
}

export default Header
import React from 'react';

import './top-nav.css';

export default function TopNav(props) {
    return (
        <nav>
            <ul className="clearfix">
                <li>
                    <a className="what" href="#" onClick={(e) => props.handleToggleHelp(e)}>
                        What?
                    </a>
                </li>
                <li>
                    <a className="new" href="#" onClick={() => props.handleNewGame()}>
                        + New Game
                    </a>
                </li>
            </ul>
        </nav>
    );
}


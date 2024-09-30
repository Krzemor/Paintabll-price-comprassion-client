import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Paintball Hunter</h1>
            <nav>
                <ul>
                    <li><Link to="/">Strona główna</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

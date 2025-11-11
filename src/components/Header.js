// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={styles.header}>
            <Link to="/" style={styles.logo}>
                LIVELY / 살뜰
            </Link>
            <nav>
                <Link to="/booking" style={styles.navLink}>예약</Link>
                <Link to="/mypage" style={styles.navLink}>마이</Link>
                <span style={styles.navLink}>알림</span>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
        fontSize: '1rem',
        cursor: 'pointer'
    }
};

export default Header;
// src/components/Footer.js

import React from 'react';

function Footer() {
    return (
        <footer style={styles.footer}>
            <p>&copy; {new Date().getFullYear()} LIVELY/살뜰. All rights reserved.</p>
            <p>AI 기반 통합 생활 서비스 플랫폼</p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#ccc',
        padding: '15px',
        textAlign: 'center',
        fontSize: '0.8rem',
    }
};

export default Footer;

import React from 'react';
import Breadcrumb from '../Components/breadcrumb/Breadcrumb';
import LoggerTabel from './SearchLoggerTabel/Tabel';

import './style.css';

const Home = () => {
    return (
        <main id="main" role="main">
            <Breadcrumb />
            <LoggerTabel />
        </main>
    )
}

export default Home;
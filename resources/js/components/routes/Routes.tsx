import React from 'react';
import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';
import Main from '../views/Main';

export const Routes = () => {
    return (
        <Router>
            <Route path="/" element={<Main />} />
        </Router>
    )
}

export default Routes;
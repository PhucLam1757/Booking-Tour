import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AccountPage from '../../page/Client/Profile';

const ClientAccountPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
        customerData && customerData.ctm_rl === 'user' ?
            <AccountPage />
            :
            <Navigate to="/login" />
    )
};

export default ClientAccountPrivateRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import LoginPage from "../../page/Login";

const LoginPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <Navigate to="/admin" /> :
                <LoginPage {...props} />
            )
    )
};

export default LoginPrivateRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import SignUpPage from "../../page/SignUp";

const SignUpPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <Navigate to="/admin" /> :
                <SignUpPage {...props} />
            )
    )
};

export default SignUpPrivateRoute;
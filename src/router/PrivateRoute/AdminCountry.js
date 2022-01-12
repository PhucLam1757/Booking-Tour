import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminCountry from "../../page/Admin/Country";

const AdminCountryPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminCountry {...props} /> :
                <Navigate to="/login" />
            )
    )
};

export default AdminCountryPrivateRoute;
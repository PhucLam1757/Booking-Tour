import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminPlace from "../../page/Admin/Place";

const AdminPlacePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminPlace {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminPlacePrivateRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ListPlaceAndCountry from "../../page/Admin/Place";

const AdminPlacePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <ListPlaceAndCountry {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminPlacePrivateRoute;
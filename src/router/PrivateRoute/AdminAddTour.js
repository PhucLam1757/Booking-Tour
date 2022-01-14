import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminAddTour from "../../page/Admin/AddTour";

const AdminAddTourPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminAddTour {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminAddTourPrivateRoute;
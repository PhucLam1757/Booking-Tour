import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminTour from "../../page/Admin/Tour";

const AdminTourPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminTour {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminTourPrivateRoute;
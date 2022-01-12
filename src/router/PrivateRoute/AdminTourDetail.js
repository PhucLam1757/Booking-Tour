import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminTourDetail from "../../page/Admin/TourDetail";

const AdminTourDetailPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminTourDetail {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminTourDetailPrivateRoute;
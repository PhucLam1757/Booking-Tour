import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminTourType from "../../page/Admin/TourType";

const AdminTourTypePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminTourType {...props} /> :
                <Navigate to="/login" />
            )
    )
};

export default AdminTourTypePrivateRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminDashboard from "../../page/Admin/Dashboard";

const AdminDashboardPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminDashboard {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminDashboardPrivateRoute;
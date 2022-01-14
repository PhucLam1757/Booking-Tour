import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminContact from "../../page/Admin/Contact";

const AdminContactPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminContact {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminContactPrivateRoute;
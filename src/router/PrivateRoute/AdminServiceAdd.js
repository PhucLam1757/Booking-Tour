import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminServiceAddNew from "../../page/Admin/ServiceAddNew";

const AdminServiceAddPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminServiceAddNew {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminServiceAddPrivateRoute;
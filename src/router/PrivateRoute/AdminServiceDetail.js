import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminServiceDetail from "../../page/Admin/ServiceDetail";

const AdminServiceDetailPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminServiceDetail {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminServiceDetailPrivateRoute;
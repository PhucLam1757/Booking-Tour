import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminHandbookDetail from "../../page/Admin/HandbookDetail";

const AdminHandbookDetailPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminHandbookDetail {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminHandbookDetailPrivateRoute;
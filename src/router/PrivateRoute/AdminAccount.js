import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminAccount from "../../page/Admin/Account";

const AdminAccountPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminAccount {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminAccountPrivateRoute;
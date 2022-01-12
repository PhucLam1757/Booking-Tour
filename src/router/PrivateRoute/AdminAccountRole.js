import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminAccountRole from "../../page/Admin/AccountRole";

const AdminAccountRolePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminAccountRole {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminAccountRolePrivateRoute;
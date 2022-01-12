import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminBankPage from "../../page/Admin/Banking";

const AdminBankingPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminBankPage {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminBankingPrivateRoute;
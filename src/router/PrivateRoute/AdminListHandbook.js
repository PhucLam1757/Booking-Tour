import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminListHandbook from "../../page/Admin/ListHandbook";

const AdminListHandbookPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminListHandbook {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminListHandbookPrivateRoute;
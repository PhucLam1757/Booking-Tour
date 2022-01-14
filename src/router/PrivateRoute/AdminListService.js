import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminListService from "../../page/Admin/ListService";

const AdminListServicePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminListService {...props} /> :
                <Navigate to="/login" />
            )
    )
};

export default AdminListServicePrivateRoute;
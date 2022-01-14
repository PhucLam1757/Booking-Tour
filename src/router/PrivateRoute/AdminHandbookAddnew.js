import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminHandbookAddNew from "../../page/Admin/HandbookAddnew";

const AdminHandbookAddPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminHandbookAddNew {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminHandbookAddPrivateRoute;
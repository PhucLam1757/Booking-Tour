import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminBlog from "../../page/Admin/Blog";

const AdminBlogPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminBlog {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminBlogPrivateRoute;
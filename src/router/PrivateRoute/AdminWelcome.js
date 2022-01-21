import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import WelComePage from '../../page/Admin/WelCome';


const AdminWelcomePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <WelComePage {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminWelcomePrivateRoute;
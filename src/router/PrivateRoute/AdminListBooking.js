import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminListBooking from "../../page/Admin/ListBooking";

const AdminListBookingPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_rl === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_rl !== 'user' ?
                <AdminListBooking {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminListBookingPrivateRoute;
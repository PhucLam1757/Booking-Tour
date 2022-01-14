import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminBookingDetail from "../../page/Admin/BookingDetail";

const AdminBookingDetailPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminBookingDetail {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminBookingDetailPrivateRoute;
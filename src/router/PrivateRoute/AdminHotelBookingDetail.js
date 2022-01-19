import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminHotelBookingDetailPage from "../../page/Admin/HotelBookingDetail";

const AdminHotelBookingDetailPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminHotelBookingDetailPage {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminHotelBookingDetailPrivateRoute;
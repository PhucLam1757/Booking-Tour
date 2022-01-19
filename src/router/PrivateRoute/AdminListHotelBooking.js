import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminListHotelBooking from "../../page/Admin/ListHotelBooking";

const AdminListHotelBookingPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminListHotelBooking {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminListHotelBookingPrivateRoute;
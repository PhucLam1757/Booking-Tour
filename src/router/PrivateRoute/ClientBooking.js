import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import BookingPage from "../../page/Client/Booking";

const ClientBookingPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
        customerData && customerData.ctm_rl === 'user' ?
            <BookingPage to="/" />
            :
            <Navigate to="/login" />
    )
};

export default ClientBookingPrivateRoute;
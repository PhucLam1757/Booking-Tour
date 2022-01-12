import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import BookingPage from "../../page/Client/Booking";

const ClientBookingPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    console.log('customerData: ', customerData)
    return (
        customerData && customerData.ctm_rl === 'user' ?
            <BookingPage/>
            :
            <Navigate to="/login" />
    )
};

export default ClientBookingPrivateRoute;
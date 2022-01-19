import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminHotel from "../../page/Admin/Hotel";

const AdminHotelPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminHotel {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminHotelPrivateRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminUpdateHotel from "../../page/Admin/UpdateHotel";

const AdminUpdateHotelPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminUpdateHotel {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminUpdateHotelPrivateRoute;
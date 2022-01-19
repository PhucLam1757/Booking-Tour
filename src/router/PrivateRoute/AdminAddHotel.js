import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminAddHotel from "../../page/Admin/AddHotel";

const AdminAddHotelPrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminAddHotel {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminAddHotelPrivateRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminHotelRevenue from "../../page/Admin/HotelRevenue";

const AdminHotelRevenuePrivateRoute = (props) => {
    let customerData = JSON.parse(sessionStorage.getItem('user_data'))
    return (
            customerData && customerData.ctm_role === 'user' ?
                <Navigate to="/" />
            : (
                customerData && customerData.ctm_role !== 'user' ?
                <AdminHotelRevenue {...props} />:
                <Navigate to="/login" />
            )
    )
};

export default AdminHotelRevenuePrivateRoute;
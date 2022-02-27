import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router, Route, Routes, Navigate
} from "react-router-dom";

import ClientLayout from '../../layout/ClientLayout'
import HomePage from '../../page/Client/HomePage'
import LoginPrivateRoute from "../PrivateRoute/LoginRouter";
import SignUpPrivateRoute from "../PrivateRoute/SignUpRouter";
import Blog from "../../page/Client/Blog";
import ContactPage from "../../page/Client/Contact";
import ServicePage from "../../page/Client/Service";
import BlogDetail from "../../page/Client/BlogDetail";
import AdminLayout from "../../layout/AdminLayout";
import Tour from "../../page/Client/Tour";
import TourDetail from "../../page/Client/TourDetail";
import ServiceDetail from "../../page/Client/ServiceDetail";
import AdminDashboardPrivateRoute from '../PrivateRoute/AdminDashboardRouter';
import AdminAccountRolePrivateRoute from '../PrivateRoute/AdminAccountRole';
import AdminAccountPrivateRoute from '../PrivateRoute/AdminAccount';
import AdminContactPrivateRoute from '../PrivateRoute/AdminContact';
import AdminBlogPrivateRoute from '../PrivateRoute/AdminBlog';
import AdminPlacePrivateRoute from '../PrivateRoute/AdminPlace';
import AdminTourPrivateRoute from '../PrivateRoute/AdminTour';
import AdminAddTourPrivateRoute from '../PrivateRoute/AdminAddTour';
import AdminTourDetailPrivateRoute from '../PrivateRoute/AdminTourDetail';
import AdminListServicePrivateRoute from '../PrivateRoute/AdminListService';
import AdminServiceDetailPrivateRoute from '../PrivateRoute/AdminServiceDetail';
import AdminServiceAddPrivateRoute from '../PrivateRoute/AdminServiceAdd'
import AdminHandbookDetailPrivateRoute from "../PrivateRoute/AdminHandBookDetail";
import AdminListHandbookPrivateRoute from '../PrivateRoute/AdminListHandbook';
import AdminHandbookAddPrivateRoute from '../PrivateRoute/AdminHandbookAddnew'
import AdminBankingPrivateRoute from '../PrivateRoute/AdminBanking'
import AdminListBookingPrivateRoute from '../PrivateRoute/AdminListBooking'
import AdminBookingDetailPrivateRoute from '../PrivateRoute/AdminBookingDetail';
import AdminWelcomePrivateRoute from '../PrivateRoute/AdminWelcome'
import BookingPage from "../../page/Client/Booking";
import AccountPage from '../../page/Client/Profile';
import BookingDetailPage from '../../page/Client/BookingDetail';
import HandbookDetailPage from '../../page/Client/HandbookDetail';

export default function MainApp(props) {
    return (
        <Router>
            <Routes>
                <Route exact path="/"
                    element={
                        <ClientLayout {...props} >
                            <HomePage />
                        </ClientLayout>
                    }
                />

                <Route exact path="/blog"
                    element={
                        <ClientLayout {...props} >
                            <Blog />
                        </ClientLayout>
                    }
                />

                <Route exact path="/blog/:blogId"
                    element={
                        <ClientLayout {...props} >
                            <BlogDetail />
                        </ClientLayout>
                    }
                />

                <Route exact path="/contact"
                    element={
                        <ClientLayout {...props} >
                            <ContactPage />
                        </ClientLayout>
                    }
                />

                <Route exact path="/service"
                    element={
                        <ClientLayout {...props} >
                            <ServicePage />
                        </ClientLayout>
                    }
                />

                <Route exact path="/service/:serviceId"
                    element={
                        <ClientLayout {...props} >
                            <ServiceDetail />
                        </ClientLayout>
                    }
                />

                <Route exact path="/handbook/:handbookId"
                    element={
                        <ClientLayout {...props} >
                            <HandbookDetailPage />
                        </ClientLayout>
                    }
                />

                <Route exact path="/tour"
                    element={
                        <ClientLayout {...props} >
                            <Tour {...props} />
                        </ClientLayout>
                    }
                />

                <Route exact path="/booking-detail/:bookingId"
                    element={
                        <ClientLayout {...props} >
                            <BookingDetailPage {...props} />
                        </ClientLayout>
                    }
                />

                <Route exact path="/tour/:tourId"
                    element={
                        <ClientLayout {...props} >
                            <TourDetail />
                        </ClientLayout>
                    }
                />

                <Route exact path="/tour/:tourId/booking"
                    element={
                        <ClientLayout {...props} >
                            <BookingPage />
                        </ClientLayout>
                    }
                />

                <Route exact path="/login"
                    element={
                        <LoginPrivateRoute {...props} />
                    }
                />

                <Route exact path="/signup"
                    element={
                        <SignUpPrivateRoute {...props} />
                    }
                />

                <Route exact path="/account"
                    element={
                        <ClientLayout {...props} >
                            <AccountPage {...props} />
                        </ClientLayout>
                    }
                />

                {/*---------------------------------------------*/}

                <Route exact path="/admin"
                    element={
                        <AdminLayout {...props} >
                            <AdminWelcomePrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour-revenue"
                    element={
                        <AdminLayout {...props} >
                            <AdminDashboardPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/blog"
                    element={
                        <AdminLayout {...props} >
                            <AdminBlogPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/service"
                    element={
                        <AdminLayout {...props} >
                            <AdminListServicePrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/service/:serviceId"
                    element={
                        <AdminLayout {...props} >
                            <AdminServiceDetailPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/service/addnew"
                    element={
                        <AdminLayout {...props} >
                            <AdminServiceAddPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/handbook"
                    element={
                        <AdminLayout {...props} >
                            <AdminListHandbookPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/handbook/:handbookId"
                    element={
                        <AdminLayout {...props} >
                            <AdminHandbookDetailPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/handbook/addnew"
                    element={
                        <AdminLayout {...props} >
                            <AdminHandbookAddPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/contact"
                    element={
                        <AdminLayout {...props} >
                            <AdminContactPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/account-role"
                    element={
                        <AdminLayout {...props} >
                            <AdminAccountRolePrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/account"
                    element={
                        <AdminLayout {...props} >
                            <AdminAccountPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/place"
                    element={
                        <AdminLayout {...props} >
                            <AdminPlacePrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour"
                    element={
                        <AdminLayout {...props} >
                            <AdminTourPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour/addtour"
                    element={
                        <AdminLayout {...props} >
                            <AdminAddTourPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour/:id"
                    element={
                        <AdminLayout {...props} >
                            <AdminTourDetailPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/banking"
                    element={
                        <AdminLayout {...props} >
                            <AdminBankingPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/booking"
                    element={
                        <AdminLayout {...props} >
                            <AdminListBookingPrivateRoute />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/booking/:bookingId"
                    element={
                        <AdminLayout {...props} >
                            <AdminBookingDetailPrivateRoute />
                        </AdminLayout>
                    }
                />
            </Routes>
        </Router>
    );
}
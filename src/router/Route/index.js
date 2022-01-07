import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router, Route, Routes, Navigate
} from "react-router-dom";

import ClientLayout from '../../layout/ClientLayout'
import HomePage from '../../page/Client/HomePage'
import SignUpPage from "../../page/SignUp";
import LoginPage from "../../page/Login";
import Blog from "../../page/Client/Blog";
import ContactPage from "../../page/Client/Contact";
import ServicePage from "../../page/Client/Service";
import BlogDetail from "../../page/Client/BlogDetail";
import AdminLayout from "../../layout/AdminLayout";
import AdminDashboard from "../../page/Admin/Dashboard";
import AdminAccountRole from "../../page/Admin/AccountRole";
import AdminAccount from '../../page/Admin/Account';
import AdminContact from "../../page/Admin/Contact";
import AdminBlog from "../../page/Admin/Blog";
import AdminTourType from '../../page/Admin/TourType';
import AdminCountry from '../../page/Admin/Country';
import AdminPlace from "../../page/Admin/Place";
import AdminTour from "../../page/Admin/Tour";
import AdminAddTour from '../../page/Admin/AddTour';
import AdminTourDetail from '../../page/Admin/TourDetail';
import Tour from "../../page/Client/Tour";
import TourDetail from "../../page/Client/TourDetail";

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

                <Route exact path="/tour"
                    element={
                        <ClientLayout {...props} >
                            <Tour />
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

                <Route exact path="/login"
                    element={
                        <LoginPage {...props} />
                    }
                />

                <Route exact path="/signup"
                    element={
                        <SignUpPage {...props} />
                    }
                />

                <Route exact path="/admin"
                    element={
                        <AdminLayout {...props} >
                            <AdminDashboard />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/blog"
                    element={
                        <AdminLayout {...props} >
                            <AdminBlog />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/contact"
                    element={
                        <AdminLayout {...props} >
                            <AdminContact />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/account-role"
                    element={
                        <AdminLayout {...props} >
                            <AdminAccountRole />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/account"
                    element={
                        <AdminLayout {...props} >
                            <AdminAccount />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour-type"
                    element={
                        <AdminLayout {...props} >
                            <AdminTourType />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/country"
                    element={
                        <AdminLayout {...props} >
                            <AdminCountry />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/place"
                    element={
                        <AdminLayout {...props} >
                            <AdminPlace />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour"
                    element={
                        <AdminLayout {...props} >
                            <AdminTour />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour/addtour"
                    element={
                        <AdminLayout {...props} >
                            <AdminAddTour />
                        </AdminLayout>
                    }
                />

                <Route exact path="/admin/tour/:id"
                    element={
                        <AdminLayout {...props} >
                            <AdminTourDetail />
                        </AdminLayout>
                    }
                />
            </Routes>
        </Router>
    );
}
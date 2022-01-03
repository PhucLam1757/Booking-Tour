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
import AdminLayout from "../../layout/AdminLayout";
import AdminDashboard from "../../page/Admin/Dashboard";
import AdminAccountRole from "../../page/Admin/AccountRole";
import AdminAccount from '../../page/Admin/Account';
import AdminContact from "../../page/Admin/Contact";
import AdminBlog from "../../page/Admin/Blog";
import AdminTourType from '../../page/Admin/TourType';
import AdminCountry from '../../page/Admin/Country';

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

            </Routes>
        </Router>
    );
}
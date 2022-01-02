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
            </Routes>
        </Router>
    );
}
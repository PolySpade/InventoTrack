import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Sidebar from '../components/layout/Sidebar';
import Inventory from '../pages/Inventory';
import Orders from '../pages/Orders';
import Expenses from '../pages/Expenses';
import Reports from '../pages/Reports';
import Preferences from '../pages/Preferences';
import Dashboard from '../pages/Dashboard';
import Suppliers from '../pages/Suppliers';
import AccountBar from '../components/layout/AccountBar';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import AboutUs from '../pages/AboutUs';
import TermsConditions from '../pages/TermsConditions';

// Layout for authenticated routes
const AuthenticatedLayout = () => {
    return (
        <div className='flex flex-row min-h-full z-10'>
            <Sidebar />
            <AccountBar />
            <div className="flex-1 z-0">
                <Outlet />
            </div>
        </div>
    );
};

// Layout for unauthenticated routes
const UnauthenticatedLayout = () => {
    return (
        <div className='flex flex-col min-h-full z-10'>
            <div className="flex-1 z-0">
                <Outlet />
            </div>
        </div>
    );
};

const AppRoutes = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [roleData, setRoleData] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const authUser = useAuthUser();

    const getRoleData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/roles/`);
            setRoleData(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [API_URL]);

    useEffect(() => {
        getRoleData();
    }, [getRoleData]);

    useEffect(() => {
        if (authUser) {
            const role_id = authUser.role_id; // Assuming authUser is a function returning user info
            const findRole = roleData.find((role) => role._id === role_id);
            setPermissions(findRole ? findRole.permissions : []);
        }
    }, [authUser, roleData]);

    const ProtectedRoute = ({ element, permission }) => {
        return permissions.includes(permission) ? element : <Home />;
    };

    return (
        <Router>
            <Routes>
                <Route element={<UnauthenticatedLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<AuthenticatedLayout />}>
                    <Route element={<AuthOutlet fallbackPath="/login" />}>
                        <Route path="/inventory" element={<ProtectedRoute element={<Inventory />} permission="inventory" />} />
                        <Route path="/orders" element={<ProtectedRoute element={<Orders />} permission="orders" />} />
                        <Route path="/orders/:status" element={<ProtectedRoute element={<Orders />} permission="orders" />} />
                        <Route path="/orders/:status/:status" element={<ProtectedRoute element={<Orders />} permission="orders" />} />
                        <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} permission="expenses" />} />
                        <Route path="/reports" element={<ProtectedRoute element={<Reports />} permission="reports" />} />
                        <Route path="/preferences" element={<Preferences />} />
                        <Route path="/suppliers" element={<ProtectedRoute element={<Suppliers />} permission="suppliers" />} />
                        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} permission="dashboard" />} />
                        <Route path="*" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/terms-and-conditions" element={<TermsConditions />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;

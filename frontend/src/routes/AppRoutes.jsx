import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import Sidebar from '../components/layout/Sidebar/Sidebar';

const Layout = () => {
    const location = useLocation();
    console.log(location.hash)
    return (
        <div className='flex flex-row h-full'>
            <Sidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;

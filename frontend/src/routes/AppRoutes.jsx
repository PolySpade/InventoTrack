import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import Sidebar from '../components/layout/Sidebar/Sidebar';

const AppRoutes = () => {
    return (
        <Router>
            <div className='flex flex-row h-full'>

            <Routes>
                <Route element={(
                    <>
                        <Sidebar />
                        <div className="flex-1">
                            <Outlet />
                        </div>
                    </>
                )}>

                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="*" element={<Home />} />

                </Route>
                
            </Routes>
            </div>
        </Router>
    );
};

export default AppRoutes;


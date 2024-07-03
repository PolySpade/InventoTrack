
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import Sidebar from '../components/layout/Sidebar';
import Inventory from '../pages/Inventory';
import Orders from '../pages/Orders';
import Expenses from '../pages/Expenses';
import Reports from '../pages/Reports';

const Layout = () => {
    return (
        <div className='flex flex-row min-h-full z-10'>
            <Sidebar />
            <div className="flex-1 z-0">
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
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/expenses" element={<Expenses />}/>
                    <Route path="/reports" element={<Reports />}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;

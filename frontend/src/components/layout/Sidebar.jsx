import React, { createContext, useState, useContext, useEffect } from "react";
import {
  ArchiveIcon,
  CreditCardIcon,
  GearIcon,
  GraphIcon,
  HomeIcon,
  PackageIcon,
  ContainerIcon,
  SignInIcon,
  SignOutIcon,
} from "@primer/octicons-react";
import {
  logo_white,
} from "../../assets/logo";
import { useLocation, Link } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from "axios";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const SidebarContext = createContext();

const Sidebar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [roleData, setRoleData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };

  const getRoleData = () => {
    axios
      .get(`${API_URL}/roles/`, { headers })
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRoleData();
  }, []);

  useEffect(() => {
    if (authUser) {
      const role_id = authUser.role_id;
      const findRole = role_id ? roleData.find((role) => role._id === role_id) : null;
      setPermissions(findRole ? findRole.permissions : []);
    }
  }, [authUser, roleData]);

  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <SidebarContext.Provider value={{ expanded, pathname }}>
      <aside id="sidebar" className="top-0 left-0 min-h-screen z-50">
        <div className="h-full flex flex-col py-4 overflow-y-auto overflow-x-clip bg-neutral">
          <div className="p-2">
            <div className="flex items-center justify-center p-2">
              <Link to="/">
              <img src={logo_white} className="h-6"></img>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <ul className="menu menu-lg rounded-box text-base-300">
              {permissions.includes('dashboard') && (
                <SidebarItem
                  icon={<HomeIcon size={24} />}
                  text="Dashboard"
                  link="/dashboard"
                />
              )}
              {permissions.includes('orders') && (
                <SidebarItem
                  icon={<PackageIcon size={24} />}
                  text="Orders"
                  link="/orders"
                />
              )}
              {permissions.includes('inventory') && (
                <SidebarItem
                  icon={<ArchiveIcon size={24} />}
                  text="Inventory"
                  link="/inventory"
                />
              )}
              {permissions.includes('expenses') && (
                <SidebarItem
                  icon={<CreditCardIcon size={24} />}
                  text="Expenses"
                  link="/expenses"
                />
              )}
              {permissions.includes('suppliers') && (
                <SidebarItem
                  icon={<ContainerIcon size={24} />}
                  text="Suppliers"
                  link="/suppliers"
                />
              )}
              {permissions.includes('reports') && (
                <SidebarItem
                  icon={<GraphIcon size={24} />}
                  text="Reports"
                  link="/reports"
                />
              )}
              <SidebarItem
                icon={<GearIcon size={24} />}
                text="Preferences"
                link="/preferences"
              />
            </ul>
          </div>
          <div
            className={`flex items-center ${
              expanded ? "justify-end pr-3" : "justify-center"
            }`}
          >
            <button
              className="p-1.5 cursor-pointer text-base-300"
              onClick={() => setExpanded((curr) => !curr)}
            >
              {expanded ? <SignInIcon size={20} /> : <SignOutIcon size={20} />}
            </button>
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

const SidebarItem = ({ icon, text, link }) => {
  const { expanded } = useContext(SidebarContext);
  const { pathname } = useContext(SidebarContext);
  const isActive = pathname === link;
  console.log(isActive);
  return (
    <Link to={link}>
      <div className={`static flex group items-center text-base-300`}>
        <li className={`py-2 w-full`}>
          <div
            className={`p-3 ${
              isActive ? "bg-base-100" : "group-hover:bg-base-100"
            }`}
          >
            <span className="m-0 text-base-300">{icon}</span>
            {expanded && (
              <span className="ml-2 text-base text-base-300">{text}</span>
            )}
          </div>
        </li>
        {!expanded && (
          <div className="absolute invisible ml-20 group-hover:visible rounded-md p-1 text-white opacity-20 group-hover:bg-neutral transition-opacity group-hover:opacity-100 group-hover:ease-in-out duration-200 ">
            {text}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Sidebar;

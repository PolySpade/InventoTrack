import React, { createContext, useState, useContext } from "react";
import {
  ArchiveIcon,
  ArrowRightIcon,
  ContainerIcon,
  CreditCardIcon,
  GearIcon,
  GraphIcon,
  HomeIcon,
  InfoIcon,
  KebabHorizontalIcon,
  PackageIcon,
  PeopleIcon,
  PersonAddIcon,
  PersonFillIcon,
  PersonIcon,
  SignInIcon,
  SignOutIcon,
} from "@primer/octicons-react";
import {
  logo_default,
  logo_default_text,
  logo_white,
  logo_white_text,
} from "../../assets/logo";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SidebarContext.Provider value={{ expanded, pathname }}>
      <aside id="sidebar" className="top-0 left-0 min-h-screen z-50">
        <div className="h-full flex flex-col py-4 overflow-y-auto overflow-x-clip bg-neutral">
          <div className="p-2">
            <div className="flex items-center justify-center p-2">
              <img src={logo_white} className="h-6"></img>
            </div>
          </div>
          <div className="flex-1">
            <ul className="menu menu-lg rounded-box text-base-300">
              <SidebarItem
                icon={<HomeIcon size={24} />}
                text="Dashboard"
                link="/dashboard"
              />
              <SidebarItem
                icon={<PackageIcon size={24} />}
                text="Orders"
                link="/orders"
              />
              <SidebarItem
                icon={<ArchiveIcon size={24} />}
                text="Inventory"
                link="/inventory"
              />
              <SidebarItem
                icon={<CreditCardIcon size={24} />}
                text="Expenses"
                link="/expenses"
              />
              <SidebarItem
                icon={<ContainerIcon size={24} />}
                text="Suppliers"
                link="/suppliers"
              />
              <SidebarItem
                icon={<GraphIcon size={24} />}
                text="Reports"
                link="/reports"
              />
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
  // ${isActive ? `bg-base-100` : `group-hover:bg-base-100`}
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

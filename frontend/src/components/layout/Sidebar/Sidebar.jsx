import React, { createContext, useState, useContext } from "react";
import { ArchiveIcon, ArrowRightIcon, CreditCardIcon, GearIcon, GraphIcon, HomeIcon, InfoIcon, KebabHorizontalIcon, PackageIcon, PeopleIcon, PersonIcon, SignInIcon, SignOutIcon } from "@primer/octicons-react";
import { logo_default, logo_default_text, logo_white, logo_white_text } from "../../../assets/logo";

const SidebarContext = createContext();

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside id="sidebar" className="top-0 left-0 h-screen">
        <div className="h-full flex flex-col py-4 overflow-y-auto overflow-x-clip bg-neutral">
          <div className="p-2">
          <div className="flex items-center justify-center p-2">
            <img src={logo_white} className="h-6"></img>
          </div>
          </div>
          <div className="flex-1">
            <ul className="daisy-menu daisy-menu-lg rounded-box text-base-300">
              <SidebarItem icon={<HomeIcon size={24}/>} text="Home" />
              <SidebarItem icon={<PackageIcon size={24}/>} text="Orders" />
              <SidebarItem icon={<ArchiveIcon size={24}/>} text="Inventory" />
              <SidebarItem icon={<CreditCardIcon size={24}/>} text="Expenses" />
              <SidebarItem icon={<GraphIcon size={24} />} text="Reports" />
              <SidebarItem icon={<GearIcon size={24} />} text="Preferences" />
            </ul>
          </div>
          <div className={`flex items-center ${expanded ? "justify-end pr-3" : "justify-center"}`}>
          <button className="p-1.5 cursor-pointer" onClick={() => setExpanded((curr) => !curr)}>
              {expanded ? <SignInIcon size={20} /> : <SignOutIcon size={20} />}
          </button>
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

const SidebarItem = ({ icon, text }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="pb-4">
      <a className="p-3 hover:bg-base-100">
        {icon }
        {expanded && <span className=" text-base">{text}</span>}
      </a>
    </li>
  );
};

export default Sidebar;

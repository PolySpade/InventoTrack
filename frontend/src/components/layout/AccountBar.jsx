import React from "react";
import { PersonIcon } from "@primer/octicons-react";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const AccountBar = () => {
    const authUser = useAuthUser()
    const signOut = useSignOut();
    const navigate = useNavigate();
    const handleLogOut = () => {
        signOut();
        navigate("/login");
    }
    let name;
    if(authUser){
      name = authUser.name;
    }else{
      name = "N/A"
    }


  return (
    <div className="absolute top-0 right-0 p-6 pr-10 flex items-center space-x-4 z-50">
      <div className="dropdown dropdown-left">
        <label tabIndex={0} className="bg-base-200 rounded-full p-2 shadow-md cursor-pointer tooltip tooltip-bottom" data-tip={name}>
          <PersonIcon size={24} className="text-white" />
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-primary text-white rounded-box w-52">
          <li><a onClick={handleLogOut}>Logout</a></li>
        </ul>
      </div>

      
    </div>
  );
};

export default AccountBar;

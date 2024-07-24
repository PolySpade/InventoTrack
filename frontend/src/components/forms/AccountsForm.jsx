import React, { useContext, useState, useEffect } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";
import {
  MailIcon,
  KeyIcon,
  EyeIcon,
  EyeClosedIcon,
  PersonIcon,
} from "@primer/octicons-react";
import { logo_default_text } from "../../assets/logo";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const AccountsForm = ({ onClose }) => {
  const API_URL =import.meta.env.VITE_API_URL;
  const { accounts, roleTypes, refreshData } = useContext(PreferencesContext);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [newRole, setNewRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [roleData, setRoleData] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let user_email, user_role;
  const authUser = useAuthUser()
  if(authUser){
    user_email = authUser.email;
    user_role = authUser.role_id;
  }else{
    user_email = "N/A"
    user_role = "N/A"
  }
  const selectedAccountData = accounts.find( (account) => account._id === selectedAccount);
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  const setEdit = () => {
    if (selectedAccount) {
      setEditMode((prev) => !prev);
    }
    setError("");
    if(selectedAccountData){
      setNewRole(selectedAccountData.role._id);
    }

  };

  const setAdd = () => {
    setAddMode((prev) => !prev);
    setError("");
    getRoleData();
  };

  const handleHide = () => {
    setHidePass(!hidePass);
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

  const handleEdit = async () => {
    const _id = selectedAccountData._id;
    let hasError = false;   


    let history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Changed Role for ${selectedAccountData.email}`
    }

    
    if (!newRole) {
      setError("Role is blank");
      hasError = true;
    } else {  
      const roleData = { role: newRole };
      try {
        const respons = await axios.put(`${API_URL}/accounts/editRole/${_id}`, roleData, { headers });
        const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
 
      } catch (error) {
        setError(error.response.data.message);
        hasError = true;
      }
    }

    history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Changed Password for ${selectedAccountData.email}`
    }

    if (newPassword) {
      const passwordData = { password: newPassword };
      try {
        const response = await axios.put(`${API_URL}/accounts/editPassword/${_id}`, passwordData, { headers });
        const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      } catch (error) {
        setError(error.response.data.message);
        hasError = true;
      }
    }

    if (!hasError) {
      refreshData();
      onClose();
    }
  };

  const handleDelete = async () => {
    const _id = selectedAccountData._id;
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted Account of ${selectedAccountData.email}`
    }
    if(selectedAccountData.email === user_email){
      setError("You cannot delete yourself!")
      return
    }
    
    try {
      const res = await axios.delete(`${API_URL}/accounts/DeleteAccount/${_id}`, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (formData.get('role') === null) {
      setError('Select A Role!');
    } else if (formData.get('name') === null) {
      setError("Input your name!");
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else if (formData.get('email') === null) {
      setError("Input your email!");
    } else {
      setError("");
      const data = {
        email: formData.get("email"),
        name: formData.get('name'),
        password: newPassword,
        role: formData.get('role')
      };
      console.log(data)
      try {
        const response = await axios.post(`${API_URL}/accounts/CreateAccount`, data, { headers });
        if (response.status === 201) {
          refreshData();
          onClose();
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="z-20 w-96 bg-neutral py-4 px-5">
        {!editMode && !addMode && (
          <div>
            <div className="text-white mb-7">
              <label className="text-xs" htmlFor="accounts">
                Accounts
              </label>
              <select
                id="accounts"
                className="input input-bordered w-full"
                onChange={(e) => setSelectedAccount(e.target.value)}
                value={selectedAccount}
              >
                <option disabled value="">
                  Select Account
                </option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-evenly">
              <button className="btn text-white" onClick={onClose}>
                Cancel
              </button>
              <button className="btn text-white" onClick={setEdit}>
                Edit
              </button>
              <button className="btn text-white" onClick={setAdd}>
                Create Account
              </button>
            </div>
          </div>
        )}
        {editMode && selectedAccountData && (
          <div className="text-white">
            <label className="text-xs" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className="input input-bordered w-full mb-4"
              onChange={(e) => setNewRole(e.target.value)}
              value={newRole}
            >
              <option disabled value="">
                Select Role
              </option>
              {roleTypes.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.roleName}
                </option>
              ))}
            </select>
            <label className="text-xs" htmlFor="password">
              New Password (optional: leave blank)
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered w-full mb-4"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <div className="flex justify-evenly mt-5">
              <button className="btn text-white" onClick={setEdit}>
                Cancel
              </button>
              <button className="btn text-white" onClick={handleEdit}>
                Save
              </button>
              <button className="btn text-white bg-error border-none" onClick={() =>
    document.getElementById("my_modal_1").showModal()
  }>
                Delete
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Warning!</h3>
                  <p className="py-4 pb-0">
                    This action will delete an account!
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn bg-error text-white border-none">
                        Cancel
                      </button>
                    </form>
                    <button
                      className="btn text-white border-none"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
            <p className="text-sm text-error flex justify-center mt-2">{error}</p>
          </div>
        )}
        {addMode && (
          <div className="text-white">
            <form className="my-auto flex justify-center" onSubmit={handleAdd}>
              <div className="flex flex-col text-primary justify-center items-center w-full">
                <img src={logo_default_text} width={345} alt="Logo" />
                <div className="pt-4 space-y-4 w-full max-w-xs">
                  <div className="flex justify-center text-lg font-semibold text-white">
                    Create Account
                  </div>

                  <div className="my-2 flex flex-col">
                    <label className="text-xs" htmlFor="warehouse">
                      Role
                    </label>
                    <select name="role" id="role" className="input input-bordered w-full max-w-xs bg-white">
                      <option disabled selected value="">
                        Select a Role
                      </option>
                      {roleData.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.roleName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="input input-bordered flex items-center gap-2 bg-white">
                    <PersonIcon size={16} />
                    <input name="name" type="name" className="grow border-none" placeholder="Name" />
                  </label>

                  <label className="input input-bordered flex items-center gap-2 bg-white">
                    <MailIcon size={16} />
                    <input name="email" type="email" className="grow border-none" placeholder="Email" />
                  </label>

                  <label className="input input-bordered flex items-center gap-2 bg-white">
                    <KeyIcon size={16} />
                    <input
                      name="password"
                      type={hidePass ? "password" : "text"}
                      className="grow border-none"
                      placeholder="Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="button" onClick={handleHide} className="mb-1">
                      {hidePass ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </label>

                  <label className="input input-bordered flex items-center gap-2 bg-white">
                    <KeyIcon size={16} />
                    <input
                      type={hidePass ? "password" : "text"}
                      className="grow border-none"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" onClick={handleHide} className="mb-1">
                      {hidePass ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </label>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <div className="flex flex-col justify-center">
                    <button
                      type="submit"
                      className="btn btn-secondary px-10 text-white transition ease-in-out delay-150 hover:bg-base-200 hover:-translate-y-1 hover:scale-105 mt-3" 
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsForm;

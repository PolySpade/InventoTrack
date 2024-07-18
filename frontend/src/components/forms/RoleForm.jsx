import React, { useContext, useState, useEffect } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";

const RoleForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { accounts, roleTypes, refreshData } = useContext(PreferencesContext);
  const [selectedRole, setSelectedRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [error, setError] = useState("");
  const [permissions, setPermissions] = useState({
    inventory: false,
    expenses: false,
    reports: false,
    orders: false,
    dashboard: false,
    cog: false,
    roleManagement: false,
    modifyExpensesType: false,
    modifyProductCategory: false,
    modifyWarehouses: false,
    modifyCouriers: false,
    recordsHistory: false,
    modifyAccounts: false,
    modifyPlatforms: false
  });

  const selectedRoleType = roleTypes.find(item => item._id === selectedRole);

  useEffect(() => {
    refreshRolePerm();
  }, [selectedRoleType]);

  const refreshRolePerm = () => {
    if (selectedRoleType) {
      setNewRole(selectedRoleType.roleName);
      setPermissions({
        inventory: selectedRoleType.permissions.includes("inventory"),
        expenses: selectedRoleType.permissions.includes("expenses"),
        reports: selectedRoleType.permissions.includes("reports"),
        orders: selectedRoleType.permissions.includes("orders"),
        dashboard: selectedRoleType.permissions.includes("dashboard"),
        cog: selectedRoleType.permissions.includes("cog"),
        roleManagement: selectedRoleType.permissions.includes("roleManagement"),
        modifyExpensesType: selectedRoleType.permissions.includes("modifyExpensesType"),
        modifyProductCategory: selectedRoleType.permissions.includes("modifyProductCategory"),
        modifyWarehouses: selectedRoleType.permissions.includes("modifyWarehouses"),
        modifyCouriers: selectedRoleType.permissions.includes("modifyCouriers"),
        recordsHistory: selectedRoleType.permissions.includes("recordsHistory"),
        modifyAccounts: selectedRoleType.permissions.includes("modifyAccounts"),
        modifyPlatforms: selectedRoleType.permissions.includes("modifyPlatforms")
      });
    }
  }

  const resetRolePerm = () => {
    setPermissions({
      inventory: false,
      expenses: false,
      reports: false,
      orders: false,
      dashboard: false,
      cog: false,
      roleManagement: false,
      modifyExpensesType: false,
      modifyProductCategory: false,
      modifyWarehouses: false,
      modifyCouriers: false,
      recordsHistory: false,
      modifyAccounts: false,
      modifyPlatforms: false
    })
  }


  const setEdit = () => {
    if(selectedRole){
      setEditMode((prev) => !prev)
    }
    setError("")
    refreshRolePerm();
  }

  const setAdd = () => {
    setAddMode((prev) => !prev) 
    setError("")
    resetRolePerm();
  }

  const handleEdit = async () => {
    if (selectedRoleType && selectedRoleType.roleName.toLowerCase() === "admin") {
      setError("Cannot edit the admin role");
      return;
    }
  
    const data = {
      roleName: newRole,
      permissions: Object.keys(permissions).filter(key => permissions[key]),
    };
  
    if (!newRole.trim()) {
      setError("Role name cannot be blank");
      return;
    }
  
    if (data.permissions.length === 0) {
      setError("At least one permission must be selected");
      return;
    }
  
    const isInRolesType = roleTypes.some(role => role.roleName === newRole && role._id !== selectedRoleType._id);
  
    if (isInRolesType) {
      setError("Existing Role Type");
      return;
    }
  
    const _id = selectedRoleType._id;
    try {
      const response = await axios.put(`${API_URL}/roles/EditRole/${_id}`, data);
      refreshData();
      onClose();
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  
  const handleDelete = async () => {
    if (selectedRoleType && selectedRoleType.roleName.toLowerCase() === "admin") {
      setError("Cannot delete the admin role");
      return;
    }
    const _id = selectedRoleType._id;

    const isInProductsData = accounts.some(account => account.role._id === _id);

    if (isInProductsData) {
      setError("Cannot delete this role type because it is associated with existing account.");
      return;
    }
    try {
      const response = await axios.delete(`${API_URL}/roles/DeleteRole/${_id}`);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAdd = async () => {
    const data = {
      roleName: newRole,
      permissions: Object.keys(permissions).filter(key => permissions[key]),
    };
    if (!newRole.trim()) {
      setError("Role name cannot be blank");
      return;
    }
  
    if (data.permissions.length === 0) {
      setError("At least one permission must be selected");
      return;
    }
    const isInRolesType = roleTypes.some(role => role.roleName === newRole);

    if (isInRolesType) {
      setError("Existing Role Type");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/roles/CreateRole`, data);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleCheckboxChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.value]: e.target.checked,
    });
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-20 w-96 bg-neutral py-4 px-5">
        { (!editMode && !addMode) && (
        <div>
          <div className="text-white mb-7">
            <label className="text-xs" htmlFor="roles">
              Role Types
            </label>
            <select
              id="roles"
              className="input input-bordered w-full"
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole}
            >
              <option disabled value="">
                Select Role Type
              </option>

              {roleTypes.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.roleName}
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
              Add
            </button>
          </div>
        </div>
        )}
        {editMode && selectedRoleType  && (
        <div className="text-white">
          <input 
            id={selectedRoleType._id} 
            value={newRole}
            className="input input-bordered w-full"
            onChange={(e) => setNewRole(e.target.value)} 
          />
          <div className="mt-2 space-y-3">
            <p>Page Access</p>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="dashboard" checked={permissions.dashboard} onChange={handleCheckboxChange} />
              <p className="ml-2">Dashboard</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="orders" checked={permissions.orders} onChange={handleCheckboxChange} />
              <p className="ml-2">Orders</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="inventory" checked={permissions.inventory} onChange={handleCheckboxChange} />
              <p className="ml-2">Inventory</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="expenses" checked={permissions.expenses} onChange={handleCheckboxChange} />
              <p className="ml-2">Expenses</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="reports" checked={permissions.reports} onChange={handleCheckboxChange} />
              <p className="ml-2">Reports</p>
            </div>

            <p>Sensitive Information</p>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="cog" checked={permissions.cog} onChange={handleCheckboxChange} />
              <p className="ml-2">Cost of Goods</p>
            </div>
            <p>Preferences</p>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyExpensesType" checked={permissions.modifyExpensesType} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Expenses Type</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyProductCategory" checked={permissions.modifyProductCategory} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Product Category</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyWarehouses" checked={permissions.modifyWarehouses} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Warehouses</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyCouriers" checked={permissions.modifyCouriers} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Couriers</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyPlatforms" checked={permissions.modifyPlatforms} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Platforms</p>
            </div>

            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="roleManagement" checked={permissions.roleManagement} onChange={handleCheckboxChange} />
              <p className="ml-2">Role Management</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="recordsHistory" checked={permissions.recordsHistory} onChange={handleCheckboxChange} />
              <p className="ml-2">Records History</p>
            </div>

            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyAccounts" checked={permissions.modifyAccounts} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Accounts</p>
            </div>
            
          </div>
          <div className="flex justify-evenly mt-5">
            <button className="btn text-white" onClick={setEdit}>
              Cancel
            </button>
            <button className="btn text-white" onClick={handleEdit}>
              Save
            </button>
            <button className="btn text-white bg-error border-none" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <p className="text-sm text-error flex justify-center mt-2">{error}</p>
        </div>
        )}
        {addMode  && (
        <div className="text-white">
          <input 
          placeholder="Input Role Name"
            className="input input-bordered w-full"
            onChange={(e) => setNewRole(e.target.value)} 
          />

<div className="mt-2 space-y-3">
            <p>Page Access</p>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="dashboard" checked={permissions.dashboard} onChange={handleCheckboxChange} />
              <p className="ml-2">Dashboard</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="orders" checked={permissions.orders} onChange={handleCheckboxChange} />
              <p className="ml-2">Orders</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="inventory" checked={permissions.inventory} onChange={handleCheckboxChange} />
              <p className="ml-2">Inventory</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="expenses" checked={permissions.expenses} onChange={handleCheckboxChange} />
              <p className="ml-2">Expenses</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="reports" checked={permissions.reports} onChange={handleCheckboxChange} />
              <p className="ml-2">Reports</p>
            </div>

            <p>Sensitive Information</p>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="cog" checked={permissions.cog} onChange={handleCheckboxChange} />
              <p className="ml-2">Cost of Goods</p>
            </div>
            <p>Preferences</p>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyExpensesType" checked={permissions.modifyExpensesType} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Expenses Type</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyProductCategory" checked={permissions.modifyProductCategory} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Product Category</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyWarehouses" checked={permissions.modifyWarehouses} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Warehouses</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyCouriers" checked={permissions.modifyCouriers} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Couriers</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyPlatforms" checked={permissions.modifyPlatforms} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Platforms</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="roleManagement" checked={permissions.roleManagement} onChange={handleCheckboxChange} />
              <p className="ml-2">Role Management</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="recordsHistory" checked={permissions.recordsHistory} onChange={handleCheckboxChange} />
              <p className="ml-2">Records History</p>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" className="checkbox checkbox-secondary" value="modifyAccounts" checked={permissions.modifyAccounts} onChange={handleCheckboxChange} />
              <p className="ml-2">Modify Accounts</p>
            </div>
          </div>


          <div className="flex justify-evenly mt-5">
            <button className="btn text-white" onClick={setAdd}>
              Cancel
            </button>
            <button className="btn text-white" onClick={handleAdd}>
              Publish
            </button>
          </div>
          <p className="text-sm text-error flex justify-center mt-2">{error}</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default RoleForm;


//TODO: do not delete your own self, always have one admin available
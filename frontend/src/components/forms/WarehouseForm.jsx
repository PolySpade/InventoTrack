import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const WarehouseForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { productsData, warehouseTypes, refreshData } = useContext(PreferencesContext);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  
  const [newWarehouse, setNewWarehouse] = useState("");
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

  const selectedWarehouseType = warehouseTypes.find(item => item._id === selectedWarehouse);


  const setEdit = () => {
    if(selectedWarehouse){
      setEditMode((prev) => !prev)
    }
    setError("")
  }

  const setAdd = () => {
    setAddMode((prev) => !prev)
    setError("")
  }

  const handleEdit = async () => {
    const data = {
      name: newWarehouse
    }
    
    if (!newWarehouse) {
      setError("Input is Blank");
      return;
    }

    const isInWarehousesType = warehouseTypes.some(warehouse => warehouse.name === newWarehouse);

    if (isInWarehousesType) {
      setError("Existing Warehouse Type");
      return;
    }
    
    
    const _id = selectedWarehouseType._id


    const old_name = warehouseTypes.find(war => war._id === _id).name;

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Edited Warehouse: ${old_name} to ${newWarehouse}`
    }

    try {
      const response = await axios.put(`${API_URL}/warehouses/EditWarehouse/${_id}`, data, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      refreshData();
      onClose();
    } catch (error) {
       setError(error.response.data.message);
    }
  }
  

  const handleDelete = async () => {
    const _id = selectedWarehouseType._id

    const isInProductsData = productsData.some(product => product.warehouse._id === _id);

    if (isInProductsData) {
      setError("Cannot delete this warehouse type because it is associated with existing product.");
      return;
    }
    const old_name = warehouseTypes.find(war => war._id === _id).name;

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted Warehouse: ${old_name}`
    }

    try {
      const response = await axios.delete(`${API_URL}/warehouses/DeleteWarehouse/${_id}`, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
  
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAdd = async () => {
    if (!newWarehouse) {
      setError("Input is Blank");
      return;
    }
    const data = {
      name: newWarehouse
    }
    const isInWarehousesType = warehouseTypes.some(warehouse => warehouse.name === newWarehouse);

    if (isInWarehousesType) {
      setError("Existing Warehouse Type");
      return;
    }


    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Added a Warehouse: ${newWarehouse}`
    }

    try {
      const response = await axios.post(`${API_URL}/warehouses/CreateWarehouse`,data, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
  
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }

  }

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
            <label className="text-xs" htmlFor="warehouses">
              Warehouse Types
            </label>
            <select
              id="warehouses"
              className="input input-bordered w-full"
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              value={selectedWarehouse}
            >
              <option disabled value="">
                Select Warehouse Type
              </option>

              {warehouseTypes.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
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
        {editMode && selectedWarehouseType  && (
        <div className="text-white">
          <input 
            id={selectedWarehouseType._id} 
            defaultValue={selectedWarehouseType.name} 
            className="input input-bordered w-full"
            onChange={(e) => setNewWarehouse(e.target.value)} 
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
          </div>
          <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-left">Warning!</h3>
                <p className="py-4 pb-0 text-left">
                  This action will delete your warehouse!
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
                <p className="text-sm text-error flex justify-center mt-2">
                  {error}
                </p>
              </div>
            </dialog>
          <p className="text-sm text-error flex justify-center mt-2">{error}</p>
        </div>
        )}
        {addMode  && (
        <div className="text-white">
          <input 
            className="input input-bordered w-full"
            onChange={(e) => setNewWarehouse(e.target.value)} 
                        placeholder="Input your new Warehouse"
          />
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

export default WarehouseForm;

import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const PlatformsForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { ordersData, platforms: platformTypes, refreshData } = useContext(PreferencesContext);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [newPlatform, setNewPlatform] = useState("");
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


  const selectedPlatformType = platformTypes.find(item => item._id === selectedPlatform);


  const setEdit = () => {
    if(selectedPlatform){
      setEditMode((prev) => !prev);
      const olddata = platformTypes.find(exp => exp._id === selectedPlatform).name;
      setNewPlatform(olddata);
    }
    setError("")
  }

  const setAdd = () => {
    setAddMode((prev) => !prev)
    setError("")
  }

  const handleEdit = async () => {
    const _id = selectedPlatformType._id
    const data = {
      name: newPlatform
    }
    
    if (!newPlatform) {
      setError("Input is Blank");
      return;
    }


    const isInPlatformsType = ordersData.some(orders => orders.sellingPlatform.name === newPlatform);

    if (isInPlatformsType) {
      setError("Existing Platform Type");
      return;
    }
    
    

    
    const olddata = platformTypes.find(exp => exp._id === selectedPlatform).name;
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Edited a Platform: ${olddata} to ${newPlatform}`
    }


    try {
      const response = await axios.put(`${API_URL}/platforms/EditPlatform/${_id}`, data);
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      refreshData();
      onClose();
    } catch (error) {
       setError(error.response.data.message);
    }
  }
  

  const handleDelete = async () => {
    const _id = selectedPlatformType._id

    const isInProductsData = ordersData.some(orders => orders.sellingPlatform._id === _id);

    if (isInProductsData) {
      setError("Cannot delete this platform type because it is associated with existing product.");
      return;
    }
    const olddata = platformTypes.find(exp => exp._id === selectedPlatform).name;
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted a Platform: ${olddata}`
    }


    try {
      const response = await axios.delete(`${API_URL}/platforms/DeletePlatform/${_id}`);
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      
  
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAdd = async () => {
    const data = {
      name: newPlatform
    }
    if (!newPlatform) {
      setError("Input is Blank");
      return;
    }

    const isInPlatformsType = platformTypes.some(platform => platform.name === newPlatform);
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Added a Platform: ${newPlatform}`
    }
    if (isInPlatformsType) {
      setError("Existing Platform Type");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/platforms/CreatePlatform`,data);
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
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
            <label className="text-xs" htmlFor="platforms">
              Platform Types
            </label>
            <select
              id="platforms"
              className="input input-bordered w-full"
              onChange={(e) => setSelectedPlatform(e.target.value)}
              value={selectedPlatform}
            >
              <option disabled value="">
                Select Platform Type
              </option>

              {platformTypes.map((item) => (
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
        {editMode && selectedPlatformType  && (
        <div className="text-white">
          <input 
            id={selectedPlatformType._id} 
            defaultValue={selectedPlatformType.name} 
            className="input input-bordered w-full"
            onChange={(e) => setNewPlatform(e.target.value)} 
          />
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
            className="input input-bordered w-full"
            onChange={(e) => setNewPlatform(e.target.value)} 
            placeholder="Input your new Platform"
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

export default PlatformsForm;

import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";

const PlatformsForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { ordersData, platforms: platformTypes, refreshData } = useContext(PreferencesContext);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [newPlatform, setNewPlatform] = useState("");
  const [error, setError] = useState("");

  const selectedPlatformType = platformTypes.find(item => item._id === selectedPlatform);


  const setEdit = () => {
    if(selectedPlatform){
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
    
    const _id = selectedPlatformType._id
    try {
      const response = await axios.put(`${API_URL}/platforms/EditPlatform/${_id}`, data);
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

    try {
      const response = await axios.delete(`${API_URL}/platforms/DeletePlatform/${_id}`);
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

    if (isInPlatformsType) {
      setError("Existing Platform Type");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/platforms/CreatePlatform`,data);
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

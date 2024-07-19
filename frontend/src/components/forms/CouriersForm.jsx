import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";

const CouriersForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { ordersData, courierTypes, refreshData } = useContext(PreferencesContext);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [newCourier, setNewCourier] = useState("");
  const [error, setError] = useState("test");

  const selectedCourierType = courierTypes.find(item => item._id === selectedCourier);


  const setEdit = () => {
    if(selectedCourier){
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
      name: newCourier
    }
    
    if (!newCourier) {
      setError("Input is Blank");
      return;
    }

    const isInCouriersType = courierTypes.some(courier => courier.name === newCourier);

    if (isInCouriersType) {
      setError("Existing Courier Type");
      return;
    }
    
    
    const _id = selectedCourierType._id
    try {
      const response = await axios.put(`${API_URL}/couriers/EditCourier/${_id}`, data);
      refreshData();
      onClose();
    } catch (error) {
       setError(error.response.data.message);
    }
  }
  

  const handleDelete = async () => {
    const _id = selectedCourierType._id

    const isInProductsData = ordersData.some(product => product.courier._id === _id);

    if (isInProductsData) {
      setError("Cannot delete this courier type because it is associated with existing order.");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/couriers/DeleteCourier/${_id}`);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAdd = async () => {
    if (!newCourier) {
      setError("Input is Blank");
      return;
    }
    const data = {
      name: newCourier
    }
    const isInCouriersType = courierTypes.some(courier => courier.name === newCourier);

    if (isInCouriersType) {
      setError("Existing Courier Type");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/couriers/CreateCourier`,data);
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
            <label className="text-xs" htmlFor="couriers">
              Courier Types
            </label>
            <select
              id="couriers"
              className="input input-bordered w-full"
              onChange={(e) => setSelectedCourier(e.target.value)}
              value={selectedCourier}
            >
              <option disabled value="">
                Select Courier Type
              </option>

              {courierTypes.map((item) => (
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
        {editMode && selectedCourierType  && (
        <div className="text-white">
          <input 
            id={selectedCourierType._id} 
            defaultValue={selectedCourierType.name} 
            className="input input-bordered w-full"
            onChange={(e) => setNewCourier(e.target.value)} 

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
            onChange={(e) => setNewCourier(e.target.value)} 
            placeholder="Input your new Courier"
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

export default CouriersForm;

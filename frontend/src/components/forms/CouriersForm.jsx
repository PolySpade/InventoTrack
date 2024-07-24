import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const CouriersForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { ordersData, courierTypes, refreshData } =
    useContext(PreferencesContext);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [newCourier, setNewCourier] = useState("");
  const [error, setError] = useState("test");
  let user_email, user_role;
  const authUser = useAuthUser();
  if (authUser) {
    user_email = authUser.email;
    user_role = authUser.role_id;
  } else {
    user_email = "N/A";
    user_role = "N/A";
  }
  const selectedCourierType = courierTypes.find(
    (item) => item._id === selectedCourier
  );

  const setEdit = () => {
    if (selectedCourier) {
      setEditMode((prev) => !prev);
    }
    setError("");
  };

  const setAdd = () => {
    setAddMode((prev) => !prev);
    setError("");
  };

  const handleEdit = async () => {
    const data = {
      name: newCourier,
    };

    if (!newCourier) {
      setError("Input is Blank");
      return;
    }

    const isInCouriersType = courierTypes.some(
      (courier) => courier.name === newCourier
    );

    const oldcourier = courierTypes.find(cor => cor._id === selectedCourier).name

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Edited a Courier: ${oldcourier} to ${newCourier}`
    }
  

    if (isInCouriersType) {
      setError("Existing Courier Type");
      return;
    }

    const _id = selectedCourierType._id;
    try {
      const response = await axios.put(
        `${API_URL}/couriers/EditCourier/${_id}`,
        data
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      
      refreshData();
      onClose();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    const _id = selectedCourierType._id;

    const isInProductsData = ordersData.some(
      (product) => product.courier._id === _id
    );

    if (isInProductsData) {
      setError(
        "Cannot delete this courier type because it is associated with existing order."
      );
      return;
    }

    const oldcourier = courierTypes.find(cor => cor._id === selectedCourier).name

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted a Courier: ${oldcourier}`
    }

    try {
      const response = await axios.delete(
        `${API_URL}/couriers/DeleteCourier/${_id}`
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAdd = async () => {
    if (!newCourier) {
      setError("Input is Blank");
      return;
    }
    const data = {
      name: newCourier,
    };
    const isInCouriersType = courierTypes.some(
      (courier) => courier.name === newCourier
    );

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Added a new Courier: ${newCourier}`
    }
    if (isInCouriersType) {
      setError("Existing Courier Type");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/couriers/CreateCourier`,
        data
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-20 w-96 bg-neutral py-4 px-5">
        {!editMode && !addMode && (
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
        {editMode && selectedCourierType && (
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
              <button
                className="btn text-white bg-error border-none"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Delete
              </button>

              <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-left">Warning!</h3>
                <p className="py-4 pb-0 text-left">
                  This action will delete a courier!
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
            </div>
            <p className="text-sm text-error flex justify-center mt-2">
              {error}
            </p>
          </div>
        )}
        {addMode && (
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
            <p className="text-sm text-error flex justify-center mt-2">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouriersForm;

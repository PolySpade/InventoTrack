import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const CategoryForm = ({ onClose }) => {
  const API_URL =process.env.VITE_API_URL;
  const { productsData, categoryTypes, refreshData } = useContext(PreferencesContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [newCategory, setNewCategory] = useState("");
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
  const authHeader = useAuthHeader();
const headers = {
    Authorization: authHeader,
};

  const selectedCategoryType = categoryTypes.find(item => item._id === selectedCategory);


  const setEdit = () => {
    if(selectedCategory){
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
      name: newCategory
    }
    
    if (!newCategory) {
      setError("Input is Blank");
      return;
    }

    const isInCategorysType = categoryTypes.some(category => category.name === newCategory);

    if (isInCategorysType) {
      setError("Existing Category Type");
      return;
    }

    const oldcategory = categoryTypes.find(cat => cat._id === selectedCategory).name
    
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Edited a Category Type: ${oldcategory} to ${newCategory}`
    }
  
    const _id = selectedCategoryType._id
    try {
      const response = await axios.put(`${API_URL}/categories/EditCategory/${_id}`, data, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      refreshData();
      onClose();
    } catch (error) {
       setError(error.response.data.message);
    }
  }
  

  const handleDelete = async () => {
    const _id = selectedCategoryType._id

    const isInProductsData = productsData.some(product => product.category._id === _id);
    const oldcategory = categoryTypes.find(cat => cat._id === selectedCategory).name

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted a Category Type: ${oldcategory}`
    }

    if (isInProductsData) {
      setError("Cannot delete this category type because it is associated with existing product.");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/categories/DeleteCategory/${_id}`, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAdd = async () => {
    if (!newCategory) {
      setError("Input is Blank");
      return;
    }
    const data = {
      name: newCategory
    }
    const isInCategorysType = categoryTypes.some(category => category.name === newCategory);

    if (isInCategorysType) {
      setError("Existing Category Type");
      return;
    }

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Added a new Category Type: ${newCategory}`
    }
    try {
      const response = await axios.post(`${API_URL}/categories/CreateCategory`,data, { headers });
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
            <label className="text-xs" htmlFor="categories">
              Category Types
            </label>
            <select
              id="categories"
              className="input input-bordered w-full"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option disabled value="">
                Select Category Type
              </option>

              {categoryTypes.map((item) => (
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
        {editMode && selectedCategoryType  && (
        <div className="text-white">
          <input 
            id={selectedCategoryType._id} 
            defaultValue={selectedCategoryType.name} 
            className="input input-bordered w-full"
            onChange={(e) => setNewCategory(e.target.value)} 
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
                <h3 className="font-bold text-lg text-left">Warning!</h3>
                <p className="py-4 pb-0 text-left">
                  This action will delete a product category!
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
          <p className="text-sm text-error flex justify-center mt-2">{error}</p>
        </div>
        )}
        {addMode  && (
        <div className="text-white">
          <input 
            className="input input-bordered w-full"
            onChange={(e) => setNewCategory(e.target.value)} 
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

export default CategoryForm;

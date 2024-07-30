import React, { useContext, useState } from "react";
import axios from "axios";
import { InventoryContext } from "../../contexts";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const EditProductForm = ({ onClose, item }) => {
  const { category, warehouse, refreshData, permissions } = useContext(InventoryContext);
  const [error, setError] = useState("");
  const {
    _id,
    sku,
    name,
    category: categoryVal,
    unitCost: cost,
    weightKG: weight,
    warehouse: warehouseVal,
    dimensions,
    stockLeft: quantity,
    shown,
  } = item;
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  
  const hasCogPermission = permissions.includes("cog");
  const API_URL =import.meta.env.VITE_API_URL;
  let user_email, user_role;
  const authUser = useAuthUser()
  if(authUser){
    user_email = authUser.email;
    user_role = authUser.role_id;
  }else{
    user_email = "N/A"
    user_role = "N/A"
  }

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    if (formData.get("product_name") === "") {
      setError("Input Product Name");
      return;
    } else if (parseFloat(formData.get("unit_cost")) < 0) {
      setError("Negative Unit Cost");
      return;
    } else if (isNaN(parseFloat(formData.get("unit_cost")))) {
      setError("Invalid Unit Cost");
      return;
    } else if (parseFloat(formData.get("weight")) < 0) {
      setError("Negative Weight");
      return;
    } else if (isNaN(parseFloat(formData.get("weight")))) {
      setError("Invalid Weight");
      return;
    } else if (parseFloat(formData.get("length")) < 0) {
      setError("Negative Length");
      return;
    } else if (isNaN(parseFloat(formData.get("length")))) {
      setError("Invalid Length");
      return;
    } else if (parseFloat(formData.get("width")) < 0) {
      setError("Negative Width  ");
      return;
    } else if (isNaN(parseFloat(formData.get("width")))) {
      setError("Invalid Width");
      return;
    } else if (parseFloat(formData.get("height")) < 0) {
      setError("Negative Height");
      return;
    } else if (isNaN(parseFloat(formData.get("height")))) {
      setError("Invalid Height");
      return;
    } else if (parseInt(formData.get("quantity"), 10) < 0) {
      setError("Negative Quantity");
      return;
    } else if (isNaN(parseInt(formData.get("quantity"), 10))) {
      setError("Invalid Quantity");
      return;
      }else if (formData.get("quantity") % 1 !== 0) {
        setError("Stock Quantity must be an integer");
        return;
      }

      const data = {
        sku,
        name: formData.get("product_name"),
        category: formData.get("category"),
        unitCost: hasCogPermission ? parseFloat(formData.get("unit_cost")) : cost, 
        weightKG: parseFloat(formData.get("weight")) || 0,
        warehouse: formData.get("warehouse"),
        dimensions: {
          lengthCM: parseFloat(formData.get("length")) || 0,
          widthCM: parseFloat(formData.get("width")) || 0,
          heightCM: parseFloat(formData.get("height")) || 0,
        },
        stockLeft: parseInt(formData.get("quantity"), 10),
        shown: item.shown 
      };

    
      const history_data = {
        timestamp: new Date().toISOString(),
        role: user_role,
        email: user_email,
        action: `Edited a Product: ${sku}`
      }

    try {
      const response = await axios.put(
        `${API_URL}/products/EditProduct/${_id}`,
        data, { headers }
      );
      if (response.status !== 200) {
        throw new Error("Failed to update product");
      }
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
 
      console.log(response.data.message);
      onClose();
      refreshData();
    } catch (error) {
      console.error(error.message);
      setError(error.response.data.message);
    }
    onClose();
  };

  const handleDelete = async () => {
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted a Product: ${sku}`
    }
    try {
      const response = await axios.delete(
        `${API_URL}/products/DeleteProduct/${_id}`, { headers }
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete product");
      }
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
  
      console.log(response.data.message);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRestore = async () => {
    const data = {
      sku,
      name,
      category: categoryVal._id,
      unitCost: cost,
      weightKG: weight || 0,
      warehouse: warehouseVal._id,
      dimensions: {
        lengthCM: dimensions.lengthCM || 0,
        widthCM: dimensions.widthCM || 0,
        heightCM: dimensions.heightCM || 0,
      },
      stockLeft: quantity,
      shown: true 
    };
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Restored a Product: ${sku}`
    }
    try {
      const response = await axios.put(
        `${API_URL}/products/EditProduct/${_id}`,
        data, { headers }
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
  
      if (response.status !== 200) {
        throw new Error("Failed to restore product");
      }
      console.log(response.data.message);
      onClose();
      refreshData();
    } catch (error) {
      console.error(error.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="overflow-y-auto min-w-full bg-neutral rounded shadow-lg text-white">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="p-6 flex flex-col min-w-full"
      >
        <h1 className="p-3 text-xl font-semibold">Edit Product</h1>
        <div className="flex flex-row">
          <div className="flex flex-col justify-start">
            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="product_name">
                Product Name
              </label>
              <input
                id="product_name"
                name="product_name"
                type="text"
                placeholder="Type here"
                defaultValue={name}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="input input-bordered w-full max-w-xs"
                defaultValue={categoryVal._id}
              >
                <option disabled value="">
                  Select a category
                </option>
                {category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="warehouse">
                Warehouse
              </label>
              <select
                id="warehouse"
                name="warehouse"
                className="input input-bordered w-full max-w-xs"
                defaultValue={warehouseVal._id}
              >
                <option disabled value="">
                  Select a warehouse
                </option>
                {warehouse.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ml-2 flex flex-col justify-start">
            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="sku">
                SKU
              </label>
              <input
                disabled
                id="sku"
                name="sku"
                type="text"
                placeholder="Type here"
                defaultValue={sku}
                className="input input-bordered w-full max-w-xs disabled:text-white"
              />
            </div>
            {hasCogPermission && (<div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="unit_cost">
                Unit Cost
              </label>
              <input
                id="unit_cost"
                name="unit_cost"
                type="text"
                placeholder="Type here"
                defaultValue={cost}
                className="input input-bordered w-full max-w-xs"
              />
            </div>)}

            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="quantity">
                Stock Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="text"
                placeholder="Type here"
                defaultValue={quantity}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        <hr className="bg-white w-full h-px my-2"></hr>
        <h2 className="text-base">Product Details</h2>
        <div className="my-2 flex flex-col justify-start">
          <div className="flex flex-col">
            <label className="text-xs min-w-full" htmlFor="weight">
              Weight
            </label>
            <input
              id="weight"
              name="weight"
              type="text"
              placeholder="Type here"
              defaultValue={weight}
              className="input input-bordered w-full"
            />
          </div>
          <div className="my-2 flex flex-row max-w-96 justify-evenly min-w-full">
            <div className="flex flex-col mr-2">
              <label className="text-xs" htmlFor="length">
                Length
              </label>
              <input
                id="length"
                name="length"
                type="text"
                placeholder="Type here"
                defaultValue={dimensions.lengthCM}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col mx-2">
              <label className="text-xs" htmlFor="width">
                Width
              </label>
              <input
                id="width"
                name="width"
                type="text"
                placeholder="Type here"
                defaultValue={dimensions.widthCM}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col ml-2">
              <label className="text-xs" htmlFor="height">
                Height
              </label>
              <input
                id="height"
                name="height"
                type="text"
                placeholder="Type here"
                defaultValue={dimensions.heightCM}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-row justify-around">
          <button
            type="button"
            onClick={handleCancel}
            className="btn text-white"
          >
            Cancel
          </button>
          <button type="submit" className="btn text-white">
            Save
          </button>
          {shown ? (
            <button type="button" onClick={() =>
              document.getElementById("my_modal_1").showModal()
            } className="btn text-white bg-error hover:bg-red-400 outline-none border-none">
              Delete
            </button>
          ) : (
            <button type="button" onClick={handleRestore} className="btn text-white bg-success hover:bg-green-400 outline-none border-none">
              Restore
            </button>
          )}
          <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-left">Warning!</h3>
                <p className="py-4 pb-0 text-left">
                  This action will delete the product, you can restore it onwards.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn bg-error text-white border-none">
                      Cancel
                    </button>
                  </form>
                  <button type='button'
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
        {error && <p className="flex justify-center text-error">{error}</p>}
      </form>
    </div>
  );
};

export default EditProductForm;

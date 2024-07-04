import React, { useContext } from "react";
import axios from 'axios';
import { InventoryContext } from "../../contexts";

const EditProductForm = ({ onClose, item }) => {
  const { category, warehouse } = useContext(InventoryContext);
  const {
    _id,
    sku,
    name,
    category: categoryVal,
    unitCost: cost,
    weightKG: weight,
    warehouse: warehouseVal,
    dimensions,
    stockLeft: quantity
  } = item;

  const API_URL = import.meta.env.VITE_API_URL;
  
  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        sku,
        name: formData.get('product_name'),
        category: formData.get('category'),
        unitCost: parseFloat(formData.get('unit_cost')),
        weightKG: parseFloat(formData.get('weight')),
        warehouse: formData.get('warehouse'),
        dimensions: {
            lengthCM: parseFloat(formData.get('length')),
            widthCM: parseFloat(formData.get('width')),
            heightCM: parseFloat(formData.get('height'))
        },
        stockLeft: parseInt(formData.get('quantity'), 10)  // Assuming stockLeft should be an integer
    };
    try {
        const response = await axios.put(`${API_URL}/products/EditProduct/${_id}`, data);
        if (response.status !== 200) {
            throw new Error('Failed to update product');
        }
        console.log(response.data.message);
        window.location.reload();
    } catch (error) {
        console.error(error.message);
    }
    onClose();
};


  return (
    <div className='overflow-y-auto min-w-full bg-neutral rounded shadow-lg text-white'>
      <form onSubmit={handleSubmit} method='post' className='p-6 flex flex-col min-w-full'>
        <h1 className='p-3 text-xl font-semibold'>Edit Product</h1>
        <div className='flex flex-row'>
          <div className='flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='product_name'>Product Name</label>
              <input id="product_name" name="product_name" type="text" placeholder="Type here" defaultValue={name} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='category'>Category</label>
              <select id="category" name="category" className="input input-bordered w-full max-w-xs" defaultValue={categoryVal._id}>
                <option disabled value="">Select a category</option>
                {category.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='warehouse'>Warehouse</label>
              <select id="warehouse" name="warehouse" className="input input-bordered w-full max-w-xs" defaultValue={warehouseVal._id}>
                <option disabled value="">Select a warehouse</option>
                {warehouse.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
          </div>

          <div className='ml-2 flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='sku'>SKU</label>
              <input disabled id="sku" name="sku" type="text" placeholder="Type here" defaultValue={sku} className="input input-bordered w-full max-w-xs disabled:text-white" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='unit_cost'>Unit Cost</label>
              <input id="unit_cost" name="unit_cost" type="text" placeholder="Type here" defaultValue={cost} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='quantity'>Stock Quantity</label>
              <input id="quantity" name="quantity" type="text" placeholder="Type here" defaultValue={quantity} className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
        </div>

        <hr className='bg-white w-full h-px my-2'></hr>
        <h2 className='text-base'>Product Details</h2>
        <div className='my-2 flex flex-col justify-start'>
          <div className='flex flex-col'>
            <label className='text-xs min-w-full' htmlFor='weight'>Weight</label>
            <input id="weight" name="weight" type="text" placeholder="Type here" defaultValue={weight} className="input input-bordered w-full" />
          </div>
          <div className='my-2 flex flex-row max-w-96 justify-evenly min-w-full'>
            <div className='flex flex-col mr-2'>
              <label className='text-xs' htmlFor='length'>Length</label>
              <input id="length" name="length" type="text" placeholder="Type here" defaultValue={dimensions.lengthCM} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex flex-col mx-2'>
              <label className='text-xs' htmlFor='width'>Width</label>
              <input id="width" name="width" type="text" placeholder="Type here" defaultValue={dimensions.widthCM} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex flex-col ml-2'>
              <label className='text-xs' htmlFor='height'>Height</label>
              <input id="height" name="height" type="text" placeholder="Type here" defaultValue={dimensions.heightCM} className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className='pt-4 flex flex-row justify-around'>
          <button type="button" onClick={handleCancel} className='btn text-white'>Cancel</button>
          <button type="submit" className='btn text-white'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;

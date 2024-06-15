import React from "react";
import { category, warehouse } from '../../constants';

const EditInventoryForm = ({ onClose }) => {
  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    onClose();
  };

  return (
    <div className='overflow-y-auto min-w-full bg-neutral rounded shadow-lg text-white'>
      <form onSubmit={handleSubmit} method='get' className='p-6 flex flex-col min-w-full'>
        <h1 className='p-3 text-xl font-semibold'>Edit Product</h1>
        <div className='flex flex-row'>
          <div className='flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='product_name'>Product Name</label>
              <input id="product_name" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='category'>Category</label>
              <select id="category" className="input input-bordered w-full max-w-xs">
                <option disabled selected value="">Select a category</option>
                {category.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='warehouse'>Warehouse</label>
              <select id="warehouse" className="input input-bordered w-full max-w-xs">
                <option disabled selected value="">Select a warehouse</option>
                {warehouse.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div>

          <div className='ml-2 flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='sku'>SKU</label>
              <input disabled id="sku" type="text" placeholder="Type here" defaultValue="GB" className="input input-bordered w-full max-w-xs disabled:text-white" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='unit_cost'>Unit Cost</label>
              <input id="unit_cost" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='quantity'>Stock Quantity</label>
              <input id="quantity" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
        </div>

        <hr className='bg-white w-full h-px my-2'></hr>
        <h2 className='text-base'>Product Details</h2>
        <div className='my-2 flex flex-col justify-start'>
          <div className='flex flex-col'>
            <label className='text-xs min-w-full' htmlFor='weight'>Weight</label>
            <input id="weight" type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className='my-2 flex flex-row max-w-96 justify-evenly min-w-full'>
            <div className='flex flex-col mr-2'>
              <label className='text-xs' htmlFor='length'>Length</label>
              <input id="length" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex flex-col mx-2'>
              <label className='text-xs' htmlFor='width'>Width</label>
              <input id="width" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex flex-col ml-2'>
              <label className='text-xs' htmlFor='height'>Height</label>
              <input id="height" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
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

export default EditInventoryForm;

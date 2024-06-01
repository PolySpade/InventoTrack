import React from "react";

const InventoryEditForm = () => {
  // TODO prevent multiple forms opened
  return (
    <div className="absolute right-full -mt-4 w-96 bg-neutral rounded-lg max-h-80 overflow-auto  shadow-lg">
      <form className="flex flex-col justify-center m-8 space-y-4">
        <h1 className=" text-lg pb-1 justify-center flex">Edit Product</h1>
        <h2 className="text-base"> Product Name </h2>
        <label className="input input-bordered flex items-center p-3 bg-white">
          <input
            type="text"
            className="grow text-black"
            placeholder="ProductName"
          />
        </label>
        <h2 className="text-base"> Stock Quantity </h2>
        <label className="input text-black input-bordered flex items-center p-3 bg-white">
          <input
            type="number"
            className="grow text-black"
            placeholder="50.00"
          />
        </label>
        <hr className="h-px border-0 bg-white" />
        <div className='my-2 flex flex-col'>
                  <label className='text-xs' htmlFor='category'>Category</label>
                  <select id="category" className="input input-bordered input-base w-full max-w-xs">
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                  </select>
            </div>
            <div className='my-2 flex flex-col'>
                  <label className='text-xs' htmlFor='category'>Category</label>
                  <select id="category" className="input input-bordered input-base w-full max-w-xs">
                    <option value="">Select a warehouse</option>
                    <option value="electronics">Warehouse A</option>
                  </select>
            </div>
        <hr className="h-px border-0 bg-white" />   
        <h2 className="text-base"> Unit Cost </h2>
        <label className="input input-bordered flex items-center p-3 bg-white">
          <input
            type="number"
            className="grow text-black"
            placeholder="50.00"
          />
        </label>
        <h2 className="text-base"> Weight </h2>
        <label className="input input-bordered flex items-center p-3 bg-white">
          <input
            type="number"
            className="grow text-black"
            placeholder="50.00"
          />
        </label>
        <h2 className=" text-base"> Length</h2>
        <label className="input text-black input-bordered flex items-center p-3 bg-white">
          <input
            type="number"
            className="grow text-black"
            placeholder="50.00"
          />
        </label>
        <h2 className=" text-base"> Width</h2>
        <label className="input text-black input-bordered flex items-center p-3 bg-white">
          <input
            type="number"
            className="grow text-black"
            placeholder="50.00"
          />
        </label>
        <h2 className=" text-base"> Height </h2>
        <label className="input text-black input-bordered flex items-center p-3 bg-white">
          <input
            type="number"
            className="grow text-black"
            placeholder="50.00"
          />
        </label>

        <div className="flex flex-row justify-evenly">
          <button className="btn text-white my-2">Cancel</button>
          <button className="btn text-white my-2">Save</button>
        </div>
      </form>
    </div>
  );
};

export default InventoryEditForm;

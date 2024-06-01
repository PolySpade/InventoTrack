import React from "react";

const InventoryEditForm = () => {
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
        <h2 className="text-base"> Category </h2>
        <div className=" dropdown dropdown-bottom">
          <label tabIndex={1} className="btn m-1 bg-secondary border-none text-white">
            Category
          </label>
          <ul
            tabIndex={1}
            className="dropdown-content menu block p-2 shadow bg-secondary rounded-box w-52 max-h-48 overflow-y-auto z-10"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <h2 className="text-base"> Warehouse </h2>
        <div className=" dropdown dropdown-bottom">
          <label tabIndex={0} className="btn m-1 bg-secondary border-none text-white">
            Warehouse
          </label>
          <ul
            tabIndex={0}
            className=" block dropdown-content menu p-2 shadow bg-secondary rounded-box w-52 max-h-48 overflow-y-auto"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
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

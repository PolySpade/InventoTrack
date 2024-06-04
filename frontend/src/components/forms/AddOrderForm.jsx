import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courier, salesplatform } from "../../constants";
import { products } from "../../constants";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";

const AddOrderForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [additembox, setAdditembox] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkedProducts = products.filter((item) =>
    checkedItems.includes(item.sku)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  const handleAddItem = () => {
    setAdditembox((prev) => !prev);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleCheckboxChange = (sku) => {
    setCheckedItems((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku]
    );
  };

  const isChecked = (sku) => checkedItems.includes(sku);


  console.log(checkedProducts.map((item) => `${document.getElementById(`${item.sku}-price`).value}`));


  return (
    <div className="flex flex-row overflow-y-auto min-w-full bg-neutral rounded shadow-lg text-white">
      <form
        onSubmit={handleSubmit}
        method="get"
        className="p-6 flex flex-row min-w-full"
      >
        <div className="w-96">
          <h1 className="text-xl font-semibold">Add Products</h1>
          <div className="flex flex-col">
            <div className="flex flex-col justify-start">
              <div className=" my-2 flex flex-col">
                <label className="text-xs" htmlFor="sku">
                  Order ID
                </label>
                <input
                  id="sku"
                  type="text"
                  placeholder="If Blank - AutoGenerate"
                  className="input input-bordered w-full"
                />
              </div>

              {/* <div className='my-2 flex flex-col'>
                  <label className='text-xs' htmlFor='category'>Category</label>
                  <select id="category" className="input input-bordered  w-full max-w-xs">
                    <option value="">Select a warehouse</option>
                    <option value="warehouse-a">Warehouse A</option>
                  </select>
            </div> */}
            </div>
            <div className="flex flex-row justify-start">
              <div className="my-2 mr-2 flex flex-col">
                <label className="text-xs" htmlFor="courier">
                  Courier
                </label>
                <select id="courier" className="input input-bordered">
                  <option value="">Select a Courier</option>
                  {courier.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" my-2 flex flex-col">
                <label className="text-xs" htmlFor="trackingnumber">
                  Tracking Number
                </label>
                <input
                  id="trackingnumber"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-xs" htmlFor="salesplatform">
                Sales Platform
              </label>
              <select
                id="salesplatform"
                className="input input-bordered w-full"
              >
                <option value="">Select a Platform</option>
                {salesplatform.map((item) => (
                  <option id={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <hr className="bg-white w-full h-px my-2"></hr>
          <h2 className="text-base">Customer Details</h2>
          <div className="my-2 flex flex-col justify-start">
            <div className="my-2 flex flex-col">
              <label className="text-xs min-w-full" htmlFor="weight">
                Name
              </label>
              <input
                id="weight"
                type="text"
                placeholder="Type here"
                className="input input-bordered  w-full"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-xs min-w-full" htmlFor="weight">
                Email
              </label>
              <input
                id="weight"
                type="text"
                placeholder="Type here"
                className="input input-bordered  w-full"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-xs min-w-full" htmlFor="weight">
                Phone Number
              </label>
              <input
                id="weight"
                type="text"
                placeholder="Type here"
                className="input input-bordered  w-full"
              />
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
              Publish
            </button>
          </div>
        </div>
        <hr className="mx-4 bg-white w-px h-full"></hr>
        <div className="relative flex flex-col w-fit">
          Items Ordered
          <button className="btn text-gray-200" type="button" onClick={handleAddItem}>
            Add Item
          </button>
          <div className="absolute z-20 w-full ">
            <div
              className={` bg-base-200 z-20 shadow-lg opacity-95 p-3 rounded-lg overflow-y-auto max-h-96 ${
                additembox ? "" : "hidden"
              }`}
              id="additembox"
            >
              <div className="flex items-center justify-center">
                <SearchIcon size={20} className="text-white"></SearchIcon>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="input input-bordered text-white bg-neutral w-full max-w-lg mx-2"
                />
                <button type="button" onClick={handleAddItem}>
                  <XCircleFillIcon size={20} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="mt-3 table table-sm">
                  {/* head */}
                  <thead className="text-white">
                    <tr>
                      <th>Item SKU</th>
                      <th>Item Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((item, index) => (
                      <SearchContents
                        key={index}
                        {...item}
                        isChecked={isChecked(item.sku)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    ))}
                    {/* row 1 */}
                    {/* <tr>
                    <th>GB</th>
                    <td>Gameboy</td>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-secondary"
                      />
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="">
            {/* 
                    item_sku item_name quantity price
                    total base from item quantity * price
                    , total can be modified show fees
                 */}
            <table>
              <div className="overflow-x-auto">
                <table className="table w-96">
                  {/* head */}
                  <thead className="text-white">
                    <tr>
                      <th>SKU</th>
                      <th>Product Name</th>
                      <th className="w-12">Quantity</th>
                      <th className="w-14">Unit Price</th>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-secondary opacity-0 cursor-default"
                          />
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {checkedProducts.map((item, index) => (
                      <TableContents
                        key={index}
                        {...item}
                        isChecked={isChecked(item.sku)}
                        onCheckboxChange={handleCheckboxChange}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </table>
          </div>

          <div className="absolute bottom-0 z-10 w-full flex flex-col items-end">
              <div>
                Total Price: 0
              </div>
              <div className="mt-3">
                Other Fees: 
                <input type="text" id="fees" placeholder="" className="input w-16 px-2"/>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;

const SearchContents = ({ sku, name, isChecked, onCheckboxChange }) => {
  return (
    <tr>
      <td>{sku}</td>
      <td>{name}</td>

      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={isChecked}
            onChange={() => onCheckboxChange(sku)}
          />
        </label>
      </th>
    </tr>
  );
};

const TableContents = ({ sku, name, isChecked, onCheckboxChange }) => {
  return (
    <tr>
      <td>{sku}</td>
      <td>{name}</td>
      <td>
        <input
          type="number"
          placeholder=""
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input input-xs w-12"
          id={sku + "-quantity"}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder=""
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input input-xs w-14"
          id={sku + "-price"}
        />
      </td>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={isChecked}
            onChange={() => onCheckboxChange(sku)}
          />
        </label>
      </th>
    </tr>
  );
};

import React, { useState } from "react";
import { gameboytest } from "../../../assets";
import { inventory } from "../../../constants";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import InventoryEditForm from "../../forms/InventoryEditForm/InventoryEditForm";
import AddProductForm from "../../forms/AddProductForm/AddProductForm";

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Search
  const filteredInventory = inventory.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-center">
        <SearchIcon size={20} className="text-white mr-3"></SearchIcon>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered text-white bg-neutral w-full max-w-lg"
        />
      </div>
      <button
        onClick={() => setAddProduct((prev) => !prev)}
        className="btn text-white bg-secondary border-none"
      >
        Add Product
      </button>
      {addProduct && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50 pointer-events-none z-0"></div>
    <div className="p-6 rounded shadow-lg z-10">
      <AddProductForm />
    </div>
    
  </div>
)}
      
      <table className="table table-pin-rows flex-1">
        {/* head */}
        <thead>
          <tr className="border-none text-white">
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
              </label>
            </th>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Unit Cost</th>
            <th>Weight</th>
            <th>Warehouse</th>
            <th>Product Dimensions</th>
            <th>Stock Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item, index) => (
            <TableContents key={index} {...item} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;

const TableContents = ({
  image,
  sku,
  name,
  category,
  cost,
  weight,
  warehouse,
  length,
  width,
  height,
  quantity,
}) => {
  const [productInfo, setProductInfo] = useState(false)

  return (
    <tr className="border-none text-white bg-base-content">
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-secondary" />
        </label>
      </th>
      {/* //external feature, add image <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{sku}</div>
          </div>
        </div>
      </td> */}
      <td>{sku}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{cost}</td>
      <td>{weight}</td>
      <td>{warehouse}</td>
      <td>
        <span>{length}</span>
        <span> x </span>
        <span>{width}</span>
        <span> x </span>
        <span>{height}</span>
        <span> cm</span>
      </td>
      <td>{quantity}</td>
      <td className="relative">
        <button onClick={() => setProductInfo((prev) => !prev)}><KebabHorizontalIcon className=" rotate-90"/></button>
        {productInfo ? (<InventoryEditForm/>) : ""}
      </td>
    </tr>
  );
};

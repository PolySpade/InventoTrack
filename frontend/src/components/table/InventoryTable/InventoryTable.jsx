import React from "react";
import { gameboytest } from "../../../assets";
import { inventory } from "../../../constants";

const InventoryTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="daisy-table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="daisy-checkbox" />
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
        {inventory.map((item, index) => (
            <TableContents key={index} {...item} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="daisy-join">
          <button className="daisy-join-item daisy-btn daisy-btn-active">
            1
          </button>
          <button className="daisy-join-item daisy-btn">2</button>
          <button className="daisy-join-item daisy-btn">3</button>
          <button className="daisy-join-item daisy-btn">4</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;

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
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="daisy-checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="daisy-avatar">
            <div className="daisy-mask daisy-mask-squircle w-12 h-12">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{sku}</div>
          </div>
        </div>
      </td>
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
      </td>
      <td>{quantity}</td>
    </tr>
  );
};

import React, { useState } from "react";
import { gameboytest } from "../../assets";
import { expenses } from "../../constants";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import InventoryEditForm from "../forms/InventoryEditForm";
import AddExpenseForm from "../forms/AddExpenseForm";

const ExpensesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // TODO Fix
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isChecked = (id) => checkedItems.includes(id);

  const filteredExpenses = expenses.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        Add Expense
      </button>
      {addProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50 pointer-events-none z-0"></div>
          <div className="p-6 rounded shadow-lg z-10">
            <AddExpenseForm />
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
            <th>Date</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((item, index) => (
            <TableContents
              key={index}
              {...item}
              isChecked={isChecked(item.id)}
              onCheckboxChange={handleCheckboxChange}
            />
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

export default ExpensesTable;

const TableContents = ({ id, date, amount, currency, type, description, isChecked}) => {
  const [productInfo, setProductInfo] = useState(false);

  return (
    <tr className="border-none text-white bg-base-content">
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={isChecked}
            onChange={() => onCheckboxChange(id)}
          />
        </label>
      </th>
      {/* Uncomment and adjust the following block if you want to display the product image */}
      {/* 
      <td>
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
      </td> 
      */}
      <td>{date}</td>
      <td>{amount}</td>
      <td>{currency}</td>
      <td>{type}</td>
      <td>{description}</td>
      <td className="relative">
        <button onClick={() => setProductInfo((prev) => !prev)}>
          <KebabHorizontalIcon className="rotate-90" />
        </button>
        {productInfo && <InventoryEditForm />}
      </td>
    </tr>
  );
};

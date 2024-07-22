import React, { useContext, useState } from "react";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import EditExpenseForm from "../forms/EditExpenseForm";
import AddExpenseForm from "../forms/AddExpenseForm";
import { formatTimestampDay } from "../../utils";

import { ExpenseContext } from "../../contexts";

const ITEMS_PER_PAGE = 10;

const ExpensesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: expenses } = useContext(ExpenseContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setCheckedItems(filteredExpenses.map((item) => item._id));
    } else {
      setCheckedItems([]);
    }
  };

  const isChecked = (id) => checkedItems.includes(id);

  const filteredExpenses = expenses
  .filter(
    (item) =>
      item.expensestype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const expenseToEdit = expenses.find((expense) => expense._id === openEditFormId);

  const currentItems = filteredExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center">
        <SearchIcon size={20} className="text-white mr-3" />
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
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProduct(false)}></div>
          <div className="p-6 rounded shadow-lg z-10">
            <AddExpenseForm onClose={() => setAddProduct(false)} />
          </div>
        </div>
      )}

      <table className="table table-pin-rows flex-1">
        <thead>
          <tr className="border-none text-white">
            {/* <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  onChange={handleSelectAll}
                  checked={checkedItems.length === filteredExpenses.length}
                />
              </label>
            </th> */}
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <TableContents
              key={item._id}
              item={item}
              isChecked={isChecked(item._id)}
              onCheckboxChange={handleCheckboxChange}
              openEditFormId={openEditFormId}
              setOpenEditFormId={setOpenEditFormId}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`join-item btn ${currentPage === i + 1 ? "btn-active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {openEditFormId && expenseToEdit && (
        <EditExpenseForm onClose={() => setOpenEditFormId(null)} {...expenseToEdit} />
      )}
    </div>
  );
};

export default ExpensesTable;

const TableContents = ({
  item,
  isChecked,
  onCheckboxChange,
  openEditFormId,
  setOpenEditFormId,
}) => {
  const {
    _id,
    timestamp,
    amount,
    expensestype,
    description,
  } = item;

  const formattedTimestamp = formatTimestampDay(timestamp);
  const handleEditClick = () => {
    setOpenEditFormId(openEditFormId === _id ? null : _id);
  };

  return (
    <tr className="border-none text-white bg-base-content">
      {/* <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={isChecked}
            onChange={() => onCheckboxChange(_id)}
          />
        </label>
      </th> */}
      <td>{formattedTimestamp}</td>
      <td>{amount}</td>
      <td>{expensestype.name}</td>
      <td>{description}</td>
      <td className="relative">
        <button onClick={handleEditClick}>
          <KebabHorizontalIcon className="rotate-90" />
        </button>
      </td>
    </tr>
  );
};

import React, { useContext, useState } from "react";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import EditExpenseForm from "../forms/EditExpenseForm";
import AddExpenseForm from "../forms/AddExpenseForm";
import { formatTimestampDay } from "../../utils";
import { ExpenseContext } from "../../contexts";

const ITEMS_PER_PAGE = 15;
const MAX_PAGE_BUTTONS = 5;

const ExpensesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const { data: expenses, expenseTypes } = useContext(ExpenseContext);

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

  const handleTypeFilterChange = (event) => {
    setFilterType(event.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (event) => {
    setFilterDate(event.target.value);
    setCurrentPage(1);
  };

  const isChecked = (id) => checkedItems.includes(id);

  const filteredExpenses = expenses
    .filter(
      (item) =>
        (filterType ? item.expensestype.name === filterType : true) &&
        (filterDate ? new Date(item.timestamp).toISOString().split('T')[0] === filterDate : true) &&
        (item.expensestype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageInputChange = (e) => {
    const page = e.target.value;
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setInputPage(page);
    } else {
      setInputPage('');
    }
  };

  const handlePageInputSubmit = () => {
    if (inputPage) {
      handlePageChange(Number(inputPage));
    }
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    const endPage = Math.min(totalPages, currentPage + Math.floor(MAX_PAGE_BUTTONS / 2));

    if (currentPage > Math.floor(MAX_PAGE_BUTTONS / 2) + 1) {
      paginationButtons.push(
        <button
          key={1}
          className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        paginationButtons.push(
          <span key="start-ellipsis" className="join-item btn">...</span>
        );
      }
    }

    for (let i = startPage; i <= Math.min(endPage, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      paginationButtons.push(
        <span key="end-ellipsis" className="join-item btn">...</span>
      );
    }

    if (endPage < totalPages) {
      paginationButtons.push(
        <button
          key={totalPages}
          className={`join-item btn ${currentPage === totalPages ? 'btn-active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    paginationButtons.push(
      <input
        key="input"
        type="text"
        value={inputPage}
        onChange={handlePageInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handlePageInputSubmit()}
        className="join-item text-white input"
        placeholder="Go To"
        style={{ width: '80px' }}
      />
    );

    return paginationButtons;
  };

  const expenseToEdit = expenses.find((expense) => expense._id === openEditFormId);

  const currentItems = filteredExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-[36rem]">
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
      <div className="flex justify-start flex-row mt-4">
        <button
          onClick={() => setAddProduct((prev) => !prev)}
          className="btn text-white bg-secondary border-none"
        >
          Add Expense
        </button>
        <div className="dropdown dropdown-bottom ml-3">
          <label tabIndex={0} className="btn text-white flex flex-col">
            Filter Type{filterType !== "" && <p className=" text-xs">[{filterType}]</p>}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52"
          >
            <li><a onClick={() => handleTypeFilterChange({ target: { value: "" } })}>All</a></li>
            {expenseTypes.map((type) => (
              <li key={type._id}>
                <a onClick={() => handleTypeFilterChange({ target: { value: type.name } })}>{type.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-3">
          <input
            type="date"
            value={filterDate}
            onChange={handleDateFilterChange}
            className="input input-bordered text-white bg-neutral"
          />
        </div>
      </div>

      {addProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setAddProduct(false)}
          ></div>
          <div className="p-6 rounded shadow-lg z-10">
            <AddExpenseForm onClose={() => setAddProduct(false)} />
          </div>
        </div>
      )}

      <table className="table table-pin-rows flex-1">
        <thead>
          <tr className="border-none text-white">
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
          {renderPaginationButtons()}
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
  const { _id, timestamp, amount, expensestype, description } = item;

  const formattedTimestamp = formatTimestampDay(timestamp);
  const handleEditClick = () => {
    setOpenEditFormId(openEditFormId === _id ? null : _id);
  };

  return (
    <tr className="border-none text-white bg-base-content">
      <td>{formattedTimestamp}</td>
      <td>₱{amount}</td>
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

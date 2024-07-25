import React, { useState, useContext } from "react";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import EditProductForm from "../forms/EditProductForm";
import AddProductForm from "../forms/AddProductForm";
import StockInForm from "../forms/StockInForm";
import StockOutForm from "../forms/StockOutForm";
import { InventoryContext } from "../../contexts";

const ITEMS_PER_PAGE = 15;
const MAX_PAGE_BUTTONS = 5;

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [stockIn, setStockIn] = useState(false);
  const [stockOut, setStockOut] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [statusFilter, setStatusFilter] = useState("active");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const { inventorydata: products, warehouse, category, permissions } = useContext(InventoryContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleCheckboxChange = (sku) => {
    setCheckedItems((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku]
    );
  };

  const isChecked = (sku) => checkedItems.includes(sku);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleWarehouseFilterChange = (warehouse) => {
    setWarehouseFilter(warehouse);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((item) => {
    const matchesStatus = 
      statusFilter === "" ||
      (statusFilter === "active" && item.shown) ||
      (statusFilter === "deleted" && !item.shown);

    const matchesCategory = 
      categoryFilter === "" ||
      item.category.name === categoryFilter;

    const matchesWarehouse = 
      warehouseFilter === "" ||
      item.warehouse.name === warehouseFilter;

    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesWarehouse && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const productToEdit = products.find((product) => product._id === openEditFormId);

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

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE
  );

  const hasCogPermission = permissions.includes("cog");

  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-[36rem]">
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
      <div className="flex justify-between mt-4">
        <div className="flex">
          <button
            onClick={() => setAddProduct((prev) => !prev)}
            className="btn text-white bg-secondary border-none pr-5"
          >
            Add Product
          </button>

          <div className="dropdown dropdown-bottom ml-3">
            <label tabIndex={0} className="btn text-white flex flex-col">Filter Status{statusFilter !== "" && (<p className="text-xs">[{statusFilter.toUpperCase()}]</p>)}</label>
            <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
              <li><a onClick={() => handleStatusFilterChange("")}>All</a></li>
              <li><a onClick={() => handleStatusFilterChange("active")}>Active</a></li>
              <li><a onClick={() => handleStatusFilterChange("deleted")}>Deleted</a></li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom ml-3">
            <label tabIndex={0} className="btn text-white flex flex-col">Filter Category{categoryFilter !== "" && (<p className="text-xs">[{categoryFilter}]</p>)}</label>
            <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
              <li><a onClick={() => handleCategoryFilterChange("")}>All</a></li>
              {category.map((cat) => (
                <li key={cat._id}><a onClick={() => handleCategoryFilterChange(cat.name)}>{cat.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="dropdown dropdown-bottom ml-3">
            <label tabIndex={0} className="btn text-white flex flex-col">Filter Warehouse{warehouseFilter !== "" && (<p className="text-xs">[{warehouseFilter}]</p>)}</label>
            <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
              <li><a onClick={() => handleWarehouseFilterChange("")}>All</a></li>
              {warehouse.map((wh) => (
                <li key={wh._id}><a onClick={() => handleWarehouseFilterChange(wh.name)}>{wh.name}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row">
          <button onClick={() => setStockIn((prev) => !prev)} className="btn text-white bg-secondary border-none mr-4">
            Stock-In
          </button>
          <button onClick={() => setStockOut((prev) => !prev)} className="btn text-white bg-secondary border-none">
            Stock-Out
          </button>
        </div>
      </div>
      {addProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setAddProduct(false)}></div>
          <div className="p-6 rounded shadow-lg z-10">
            <AddProductForm onClose={() => setAddProduct(false)} />
          </div>
        </div>
      )}
      {stockIn && (
        <StockInForm onClose={() => setStockIn(false)} />
      )}
      {stockOut && (
        <StockOutForm onClose={() => setStockOut(false)} />
      )}

      <table className="table table-pin-rows flex-1">
        <thead>
          <tr className="border-none text-white">
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            {hasCogPermission && (<th>Unit Cost</th>)}
            <th>Weight</th>
            <th>Warehouse</th>
            <th>Product Dimensions</th>
            <th>Stock Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <TableContents
              key={index}
              item={item}
              isChecked={isChecked(item.sku)}
              onCheckboxChange={handleCheckboxChange}
              openEditFormId={openEditFormId}
              setOpenEditFormId={setOpenEditFormId}
              hasCogPermission={hasCogPermission}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          {renderPaginationButtons()}
        </div>
      </div>

      {openEditFormId && productToEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpenEditFormId(null)}></div>
          <div className="rounded shadow-lg z-10 bg-neutral">
            <EditProductForm onClose={() => setOpenEditFormId(null)} item={productToEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;

const TableContents = ({
  item,
  isChecked,
  onCheckboxChange,
  openEditFormId,
  setOpenEditFormId,
  hasCogPermission
}) => {

  const {
    _id,
    sku,
    name,
    category,
    unitCost: cost,
    weightKG: weight,
    warehouse,
    dimensions,
    stockLeft: quantity
  } = item;

  const handleEditClick = () => {
    setOpenEditFormId(openEditFormId === _id ? null : _id);
  };

  return (
    <tr className="border-none text-white bg-base-content">
      <td>{sku}</td>
      <td>{name}</td>
      <td>{category.name}</td>
      {hasCogPermission && (<td>₱{cost}</td>)}
      <td>{weight} kg</td>
      <td>{warehouse.name}</td>
      <td>
        <span>{dimensions.lengthCM}</span>
        <span> x </span>
        <span>{dimensions.widthCM}</span>
        <span> x </span>
        <span>{dimensions.heightCM}</span>
        <span> cm</span>
      </td>
      <td>{quantity}</td>
      <td className="relative">
        <button onClick={handleEditClick}>
          <KebabHorizontalIcon className="rotate-90" />
        </button>
      </td>
    </tr>
  );
};

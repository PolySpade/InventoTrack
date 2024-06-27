import React, { useState } from "react";
import { category, products, warehouse } from "../../constants";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import EditInventoryForm from "../forms/EditInventoryForm";
import AddProductForm from "../forms/AddProductForm";
import StockInForm from "../forms/StockInForm";
import StockOutForm from "../forms/StockOutForm";

const ITEMS_PER_PAGE = 10;

const getCategoryNameById = (id) => {
  const cat = category.find(category => category.id === id);
  return cat ? cat.name : 'Unknown Category';
};

const getWarehouseNameById = (id) => {
  const ware = warehouse.find(warehouse => warehouse.id === id);
  return ware ? ware.name : 'Unknown Warehouse';
};

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [stockIn, setStockIn] = useState(false);
  const [stockOut, setStockOut] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE
  )

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
      <div className="flex justify-between">
      <button
        onClick={() => setAddProduct((prev) => !prev)}
        className="btn text-white bg-secondary border-none"
      >
        Add Product
      </button>
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
          {currentItems.map((item, index) => (
            <TableContents
              key={index}
              {...item}
              isChecked={isChecked(item.sku)}
              onCheckboxChange={handleCheckboxChange}
              openEditFormId={openEditFormId}
              setOpenEditFormId={setOpenEditFormId}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          {
            [...Array(totalPages)].map((_,i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i+1)}
                className={`join-item btn ${currentPage === i + 1 ? "btn-active" : ""}`}
              >
                {i+1}
              </button>
            ))
          }
        </div>
      </div>

      {openEditFormId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpenEditFormId(null)}></div>
          <div className="rounded shadow-lg z-10 bg-neutral">
            <EditInventoryForm onClose={() => setOpenEditFormId(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;

const TableContents = ({
  sku,
  name,
  category_id,
  cost,
  weight,
  warehouse_id,
  length,
  width,
  height,
  quantity,
  isChecked,
  onCheckboxChange,
  openEditFormId,
  setOpenEditFormId,
}) => {
  const handleEditClick = () => {
    setOpenEditFormId(openEditFormId === sku ? null : sku);
  };

  const categoryName = getCategoryNameById(category_id);
  const warehouseName = getWarehouseNameById(warehouse_id);

  return (
    <tr className="border-none text-white bg-base-content">
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
      <td>{sku}</td>
      <td>{name}</td>
      <td>{categoryName}</td>
      <td>₱{cost}</td>
      <td>{weight} kg</td>
      <td>{warehouseName}</td>
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
        <button onClick={handleEditClick}>
          <KebabHorizontalIcon className="rotate-90" />
        </button>
      </td>
    </tr>
  );
};

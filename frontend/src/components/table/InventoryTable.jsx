import React, { useState, useContext } from "react";
//import { category, warehouse } from "../../constants";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import EditProductForm from "../forms/EditProductForm";
import AddProductForm from "../forms/AddProductForm";
import StockInForm from "../forms/StockInForm";
import StockOutForm from "../forms/StockOutForm";
import { InventoryContext } from "../../contexts";


const ITEMS_PER_PAGE = 10;

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [stockIn, setStockIn] = useState(false);
  const [stockOut, setStockOut] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { inventorydata: products, warehouse, category } = useContext(InventoryContext)

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

  const productToEdit = products.find((product) => product._id === openEditFormId);


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
              item={item}
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

      {openEditFormId && productToEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpenEditFormId(null)}></div>
          <div className="rounded shadow-lg z-10 bg-neutral">
            <EditProductForm onClose={() => setOpenEditFormId(null)} item={productToEdit}  />
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
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={isChecked}
            onChange={() => onCheckboxChange(_id)}
          />
        </label>
      </th>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{category.name}</td>
      <td>₱{cost}</td>
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

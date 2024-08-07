import React, { useState, useContext } from "react";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";
import { InventoryContext } from "../../contexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const StockInForm = ({ onClose }) => {
  const {
    inventorydata: products,
    suppliers,
    refreshData,
  } = useContext(InventoryContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [additembox, setAdditembox] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [error, setError] = useState("");
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  let user_email, user_role;
  const authUser = useAuthUser();
  if (authUser) {
    user_email = authUser.email;
    user_role = authUser.role_id;
  } else {
    user_email = "N/A";
    user_role = "N/A";
  }

  const API_URL =import.meta.env.VITE_API_URL;

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSupplier) {
      setError("Please select a supplier.");
      return;
    }

    const productsToSubmit = checkedProducts.map((product) => {
      const quantity = parseInt(
        document.getElementById(`${product.sku}-quantity`).value
      );
      return { SKU: product.sku, quantity };
    });

    if (
      productsToSubmit.some(
        (product) => !product.quantity || product.quantity <= 0
      )
    ) {
      setError("Please enter a valid quantity for all selected products.");
      return;
    }
    let productstring = ''
    productsToSubmit.map( (pro) => {productstring += `${pro.quantity}:`;productstring += pro.SKU; productstring += " "})

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Stocked in : ${productstring}`
    }

    try {
      const response = await axios.put(`${API_URL}/inventory/stockIn`, {
        supplierName: selectedSupplier,
        products: productsToSubmit,
      }, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      
      console.log(response.data);
      setError("");
      onClose();
      refreshData();
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const checkedProducts = products.filter((item) =>
    checkedItems.includes(item.sku)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (sku) => {
    setCheckedItems((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku]
    );
  };

  const filteredProducts = products.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    setAdditembox((prev) => !prev);
  };

  const isChecked = (sku) => checkedItems.includes(sku);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleCancel}
      ></div>
      <div className="p-6 rounded shadow-lg z-10">
        <div className="flex flex-col min-w-96 bg-neutral rounded shadow-lg text-white">
          <form
            onSubmit={handleSubmit}
            method="get"
            className="p-6 flex flex-col min-w-full"
          >
            <h1 className="text-xl font-semibold">Stock In</h1>
            <div className="my-4 flex flex-col">
              <label className="text-xs" htmlFor="warehouse">
                Supplier
              </label>
              <select
                id="warehouse"
                className="input input-bordered w-full"
                onChange={(e) => setSelectedSupplier(e.target.value)}
                value={selectedSupplier}
              >
                <option disabled value="">
                  Select a supplier
                </option>
                {suppliers.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.supplierName}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex flex-col w-fit">
              <button
                className="btn text-gray-200"
                type="button"
                onClick={handleAddItem}
              >
                Add Item
              </button>
              <div className="absolute block z-20 w-full">
                <div
                  className={`bg-base-200 z-20 shadow-lg opacity-95 p-3 rounded-lg overflow-y-auto max-h-96 ${
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="table-wrp block overflow-y-auto min-h-80 max-h-80">
                <table className="table max-w-96">
                  <thead className="bg-neutral sticky top-0 text-white">
                    <tr>
                      <th className="pr-12">SKU</th>
                      <th className="pr-12">Product Name</th>
                      <th className="">Current Stocks</th>
                      <th className="w-12">Quantity</th>
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
                  <tbody className="max-h-96 overflow-x-hidden overflow-y-auto">
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
                Save
              </button>
            </div>
            <p className="w-full justify-center flex text-error">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockInForm;

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

const TableContents = ({
  sku,
  name,
  stockLeft,
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <tr>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{stockLeft}</td>
      <td>
        <input
          type="number"
          placeholder=""
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input input-xs w-12"
          id={sku + "-quantity"}
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

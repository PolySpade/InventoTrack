import React, { useContext, useState } from "react";
import { XCircleFillIcon, SearchIcon } from "@primer/octicons-react";
import { OrdersContext } from "../../contexts";
import axios from "axios";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const EditOrderedProductsForm = ({ productslist, onClose, orderid }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { products: allProducts, refreshData, ordersData } = useContext(OrdersContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState(
    productslist.map((product) => ({
      sku: product.productId.sku,
      quantity: product.quantity,
      price: product.price,
      name: product.name
    }))
  );
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  let user_email, user_role;
  const authUser = useAuthUser()
  if(authUser){
    user_email = authUser.email;
    user_role = authUser.role_id;
  }else{
    user_email = "N/A"
    user_role = "N/A"
  }
  

  const [addItemBox, setAddItemBox] = useState(false);
  const [error, setError]= useState(false);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter(
    (product) => product.shown && 
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCheckboxChange = (sku) => {
    setCheckedItems((prev) => {
      const existingItem = prev.find((item) => item.sku === sku);
      if (existingItem) {
        return prev.filter((item) => item.sku !== sku);
      } else {
        const product = allProducts.find((item) => item.sku === sku);
        return [...prev, { sku, quantity: 1, price: 0, name: product.name }];
      }
    });
  };
  const handleSave = async () => {
    const updatedProducts = checkedItems.map((item) => {
      const quantity = Number(document.getElementById(`${item.sku}-quantity`).value);
      const price = Number(document.getElementById(`${item.sku}-price`).value);
      return { ...item, quantity, price };
    });

    const orderData = {
      products: updatedProducts.map((item) => ({
        productId: allProducts.find((product) => product.sku === item.sku)._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      })),
    };
    const hasZeroQuantity = updatedProducts.some(item => item.quantity === 0);

    if (hasZeroQuantity) {
      setError("Some products have a quantity of 0. Please update the quantity.");
      return;
    }

    const oldorderid = ordersData.find(ord => ord._id === orderid).id

    const history_data = {
        timestamp: new Date().toISOString(),
        role: user_role,
        email: user_email,
        action: `Edited the products of order ID: ${oldorderid}`
      }
    try {
      const response = await axios.put(`${API_URL}/orders/EditProductsOrder/${orderid}`, orderData, { headers });
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      refreshData();
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  
  const isChecked = (sku) => checkedItems.some((item) => item.sku === sku);

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center">
      <div onClick={onClose} className="bg-black z-0 bg-opacity-50 w-full absolute h-full"></div>
      <div className="z-10 bg-neutral text-white rounded shadow-lg p-6 relative w-fit">
        <button onClick={onClose} className="absolute top-4 right-4">
          <XCircleFillIcon size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Ordered Products</h2>
        <div className="relative">
          <button
            className="btn text-gray-200 w-full"
            type="button"
            onClick={() => setAddItemBox((prev) => !prev)}
          >
            Add Item
          </button>
          <div className="absolute z-20 w-full">
            <div
              className={`bg-base-200 z-20 shadow-lg opacity-95 p-3 rounded-lg overflow-y-auto max-h-96 ${
                addItemBox ? "" : "hidden"
              }`}
              id="additembox"
            >
              <div className="flex items-center justify-center">
                <SearchIcon size={20} className="text-white" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="input input-bordered text-white bg-neutral w-full max-w-lg mx-2"
                />
                <button
                  type="button"
                  onClick={() => setAddItemBox((prev) => !prev)}
                >
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
                    {filteredProducts.map((item) => (
                      <SearchContents
                        key={item.sku}
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
        </div>
        <div className="flex flex-col">
          <div className="table-wrp block overflow-y-auto max-h-96">
            <table className="table overflow-clip max-w-96">
              <thead className="bg-neutral sticky top-0 text-white">
                <tr>
                  <th>SKU</th>
                  <th className="pr-12">Product Name</th>
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
                {checkedItems.map((item) => (
                  <TableContents
                    key={item.sku}
                    {...item}
                    product={allProducts.find((product) => product.sku === item.sku)}
                    isChecked={isChecked(item.sku)}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ActionButtons onCancel={onClose} error={error} handleSave={handleSave}/>
      </div>
    </div>
  );
};


const ActionButtons = ({ onCancel,error, handleSave }) => (
    <div>
    <div className="pt-4 flex flex-row justify-around">
      <button type="button" onClick={onCancel} className="btn text-white">Cancel</button>
      <button type="button" onClick={() => document.getElementById('my_modal_1').showModal()} className="btn text-white">Save</button>
    </div>
      {error && <div className="text-red-500 text-sm flex justify-center">{error}</div>}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">Editing products will restock the old products and deduct the new products. Make sure to adjust your Total Paid and Fees!</p>
          <div className="modal-action">
            <form method="dialog">
            <button className="btn bg-error text-white border-none">Cancel</button>
            </form>
            <button className='btn text-white border-none' onClick={handleSave}>Confirm</button>
          </div>
        </div>
      </dialog>
    </div>
  );
  

const SearchContents = ({ sku, name, isChecked, onCheckboxChange }) => (
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

const TableContents = ({
  sku,
  product,
  quantity,
  price,
  isChecked,
  onCheckboxChange,
}) => (
  <tr>
    <td>{sku}</td>
    <td>{product.name}</td>
    <td>
      <input
        type="number"
        className="input input-xs w-12"
        defaultValue={quantity}
        id={`${sku}-quantity`}
      />
    </td>
    <td>
      <input
        type="number"
        className="input input-xs w-14"
        defaultValue={price}
        id={`${sku}-price`}
        step="0.01"
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

export default EditOrderedProductsForm;

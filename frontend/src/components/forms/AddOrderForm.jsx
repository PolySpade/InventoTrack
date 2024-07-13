import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";
import { OrdersContext } from "../../contexts";
import axios from "axios";

const AddOrderForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { couriers, salesplatforms, products } = useContext(OrdersContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [addItemBox, setAddItemBox] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [fees, setFees] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const checkedProducts = products.filter((product) =>
    checkedItems.includes(product.sku)
  );


  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let orderId = '';
    for (let i = 0; i < 6; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let orderId = document.getElementById('orderid').value;
    const courierId = document.getElementById('couriers').value;
    const trackingNumber = document.getElementById('trackingnumber').value;
    const salesPlatformId = document.getElementById('salesplatforms').value;
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const totalPaid = document.getElementById('totalpaid').value;
    const otherFees = document.getElementById('fees').value;
    const notes = document.getElementById('notes').value;

    if (!orderId) {
      orderId = generateOrderId();
    }

    if (!courierId) {
      setError("Please select a courier.");
      return; 
    }

    if (!salesPlatformId) {
      setError("Please select a sales platform.");
      return;
    }

    if (checkedProducts.length === 0) {
      setError("Please add at least one product to the order.");
      return;
    }

    if (totalPaid <= 0) {
      setError("Total paid must be greater than zero.");
      return;
    }


    
    const orderData = {
      id: orderId,
      timestamp: new Date().toISOString(),
      products: checkedProducts.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: Number(document.getElementById(`${product.sku}-quantity`).value),
        price: Number(document.getElementById(`${product.sku}-price`).value),
      })),
      courier: courierId,
      trackingNumber: trackingNumber,
      sellingPlatform: salesPlatformId,
      buyerName: customerName,
      buyerEmail: customerEmail,
      buyerPhone: customerPhone,
      totalPaid: totalPaid,
      otherFees: otherFees,
      status: 'Processing',
      timeline: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          details: 'Order has been placed'
        }
      ],
      notes: notes
    };
    
    try {
      const response = await axios.post(`${API_URL}/orders/CreateOrder`, orderData);
      console.log('Order created:', response);
      onClose();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddItem = () => {
    setAddItemBox((prev) => !prev);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCheckboxChange = (sku) => {
    setCheckedItems((prev) =>
      prev.includes(sku) ? prev.filter((item) => item !== sku) : [...prev, sku]
    );
  };

  const isChecked = (sku) => checkedItems.includes(sku);

  return (
    <div className="flex flex-row overflow-y-auto min-w-full bg-neutral rounded shadow-lg text-white">
      <form onSubmit={handleSubmit} method="get" className="p-6 flex flex-row min-w-full">
        <div className="w-96">
          <h1 className="text-xl font-semibold">Add Products</h1>
          <OrderDetails couriers={couriers} salesplatforms={salesplatforms} />
          <CustomerDetails />
          <Notes/>
          <ActionButtons onCancel={handleCancel} error={error}/>
        </div>
        <hr className="mx-4 bg-white w-px h-full" />
        <ProductSection
          addItemBox={addItemBox}
          handleAddItem={handleAddItem}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
          filteredProducts={filteredProducts}
          checkedProducts={checkedProducts}
          handleCheckboxChange={handleCheckboxChange}
          isChecked={isChecked}
        />
      </form>
    </div>
  );
};

const Notes = () =>(
  <div>
        <hr className="bg-white w-full h-px my-2" />
        <h2 className="text-base">Notes</h2>
    <input id="notes" type="text" placeholder="Order Notes" className="input input-bordered w-full" />
    </div>
)

const OrderDetails = ({ couriers, salesplatforms }) => (
  <div className="flex flex-col">
    <div className="flex flex-col justify-start">
      <div className="my-2 flex flex-col">
        <label className="text-xs" htmlFor="sku">Order ID</label>
        <input id="orderid" type="text" placeholder="If Blank - AutoGenerate" className="input input-bordered w-full" />
      </div>
    </div>
    <div className="flex flex-row justify-start">
      <div className="my-2 mr-2 flex flex-col">
        <label className="text-xs" htmlFor="couriers">Courier</label>
        <select id="couriers" className="input input-bordered" defaultValue="">
          <option disabled value="">Select a Courier</option>
          {couriers.map((item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-xs" htmlFor="trackingnumber">Tracking Number</label>
        <input id="trackingnumber" type="text" placeholder="Type here" className="input input-bordered w-full" />
      </div>
    </div>
    <div className="my-2 flex flex-col">
      <label className="text-xs" htmlFor="salesplatforms">Sales Platform</label>
      <select id="salesplatforms" className="input input-bordered w-full" defaultValue="">
        <option disabled value="">Select a Platform</option>
        {salesplatforms.map((item) => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
    </div>
  </div>
);

const CustomerDetails = () => (
  <>
    <hr className="bg-white w-full h-px my-2" />
    <h2 className="text-base">Customer Details</h2>
    <div className="my-2 flex flex-col justify-start">
      <div className="my-2 flex flex-col">
        <label className="text-xs min-w-full" htmlFor="customerName">Name</label>
        <input id="customerName" type="text" placeholder="Type here" className="input input-bordered w-full" />
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-xs min-w-full" htmlFor="customerEmail">Email</label>
        <input id="customerEmail" type="email" placeholder="Type here" className="input input-bordered w-full" />
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-xs min-w-full" htmlFor="customerPhone">Phone Number</label>
        <input id="customerPhone" type="number" placeholder="Type here" className="input input-bordered w-full" />
      </div>
    </div>
  </>
);

const ActionButtons = ({ onCancel,error }) => (
  <div>
  <div className="pt-4 flex flex-row justify-around">
    <button type="button" onClick={onCancel} className="btn text-white">Cancel</button>
    <button type="submit" className="btn text-white">Publish</button>
  </div>
    {error && <div className="text-red-500 text-sm flex justify-center">{error}</div>}
  </div>
);

const ProductSection = ({
  addItemBox,
  handleAddItem,
  handleSearchChange,
  searchTerm,
  filteredProducts,
  checkedProducts,
  handleCheckboxChange,
  isChecked
}) => (
  <div className="relative flex flex-col w-fit">
    Items Ordered
    <button className="btn text-gray-200" type="button" onClick={handleAddItem}>Add Item</button>
    <div className="absolute block z-20 w-full">
      <div className={`bg-base-200 z-20 shadow-lg opacity-95 p-3 rounded-lg overflow-y-auto max-h-96 ${addItemBox ? "" : "hidden"}`} id="additembox">
        <div className="flex items-center justify-center">
          <SearchIcon size={20} className="text-white" />
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="input input-bordered text-white bg-neutral w-full max-w-lg mx-2" />
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
              {filteredProducts.map((item) => (
                <SearchContents key={item.sku} {...item} isChecked={isChecked(item.sku)} onCheckboxChange={handleCheckboxChange} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
                <input type="checkbox" className="checkbox checkbox-secondary opacity-0 cursor-default" />
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          {checkedProducts.map((item) => (
            <TableContents key={item.sku} {...item} isChecked={isChecked(item.sku)} onCheckboxChange={handleCheckboxChange} />
          ))}
        </tbody>
      </table>
    </div>
    <div className="absolute bottom-0 z-10 w-full flex flex-col items-end">
      <div className="mt-3">
        Total Paid:
        <input type="number" id="totalpaid" className="input w-16 px-2" />
      </div>
      <div className="mt-3">
        Other Fees:
        <input type="number" id="fees" className="input w-16 px-2" />
      </div>
    </div>
  </div>
);

const SearchContents = ({ sku, name, isChecked, onCheckboxChange }) => (
  <tr>
    <td>{sku}</td>
    <td>{name}</td>
    <th>
      <label>
        <input type="checkbox" className="checkbox checkbox-secondary" checked={isChecked} onChange={() => onCheckboxChange(sku)} />
      </label>
    </th>
  </tr>
);

const TableContents = ({ sku, name, isChecked, onCheckboxChange }) => (
  <tr>
    <td>{sku}</td>
    <td>{name}</td>
    <td>
      <input type="number" className="input input-xs w-12" id={`${sku}-quantity`} />
    </td>
    <td>
      <input type="number" className="input input-xs w-14" id={`${sku}-price`} />
    </td>
    <th>
      <label>
        <input type="checkbox" className="checkbox checkbox-secondary" checked={isChecked} onChange={() => onCheckboxChange(sku)} />
      </label>
    </th>
  </tr>
);

export default AddOrderForm;

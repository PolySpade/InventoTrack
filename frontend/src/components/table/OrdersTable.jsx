import React, { useState } from "react";
import { KebabHorizontalIcon, SearchIcon } from "@primer/octicons-react";
import { orders } from "../../constants";
import AddOrderForm from "../forms/AddOrderForm";
import OrderDetailsForm from "../forms/OrderDetailsForm";

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addOrder, setAddOrder] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Search
  const filteredOrders = orders.filter(
    (order) =>
      order.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      order.courierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sellingPlatform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="flex items-center justify-center mb-4">
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
        onClick={() => setAddOrder((prev) => !prev)}
        className="btn text-white bg-secondary border-none mb-4"
      >
        Create Order
      </button>
      {addOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50 pointer-events-none z-0"></div>
          <div className="p-6 rounded shadow-lg z-10">
            <AddOrderForm />
          </div>
        </div>
      )}

      <table className="table w-full">
        {/* head */}
        <thead>
          <tr className="border-none text-white">
            <th>Order ID</th>
            <th>Products</th>
            <th>Courier Name</th>
            <th>Tracking Number</th>
            <th>Selling Platform</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <TableContents key={order.id} {...order} />
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

export default OrdersTable;


const TableContents = ({
  id,
  products,
  courierName,
  trackingNumber,
  sellingPlatform,
  buyerName,
  buyerEmail,
  buyerPhone
}) => {
  const [showProducts, setShowProducts] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);

  // for transfering order to order details
  const order = {
    id,
    products,
    courierName,
    trackingNumber,
    sellingPlatform,
    buyerName,
    buyerEmail,
    buyerPhone
  };



  return (
    <>
      <tr className="border-none text-white bg-base-content">
        <td>{id}</td>
        <td>
          <button className="btn text-white" onClick={() => setShowProducts((prev) => !prev)}>
            {showProducts ? "Hide List" : "View List"}
          </button>
        </td>
        <td>{courierName}</td>
        <td>{trackingNumber}</td>
        <td>{sellingPlatform}</td>
        <td className="relative">
          <button onClick={() => setOrderDetails((prev) => !prev)}>
            <KebabHorizontalIcon className="rotate-90" />
          </button>
          {orderDetails ? <OrderDetailsForm order={order} /> : ""}
        </td>
      </tr>
      {showProducts && (
        <tr className="border-none text-white bg-secondary">
          <td colSpan="6">
            <table className="table w-full">
              <thead className="text-white">
                <tr className="border-opacity-50">
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-none">
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td className="font-semibold">₱{product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

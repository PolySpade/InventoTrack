import React, { useState, useContext } from "react";
import { SearchIcon, KebabHorizontalIcon } from "@primer/octicons-react";
import AddOrderForm from "../forms/AddOrderForm";
import EditOrderForm from "../forms/EditOrderForm";
import { OrdersContext } from "../../contexts";

const ITEMS_PER_PAGE = 10;

const OrdersTable = () => {
  const { ordersData: orders } = useContext(OrdersContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [addOrder, setAddOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailsId, setOrderDetailsId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStatusFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleDateFilterChange = (event) => {
    setFilterDate(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus ? order.status === filterStatus : true) &&
      (filterDate ? new Date(order.timestamp).toISOString().split('T')[0] === filterDate : true) &&
      (order.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      order.courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sellingPlatform.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentItems = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteRecord = (id) => {
    // Implement delete record logic here
    console.log(`Delete order with id: ${id}`);
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-96">
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
      <div className="flex justify-start flex-row">
        <button
          onClick={() => setAddOrder((prev) => !prev)}
          className="btn text-white bg-secondary border-none"
        >
          Create Order
        </button>
        <div className="dropdown dropdown-bottom ml-3">
          <label tabIndex={0} className="btn text-white">Filter Status</label>
          <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
            <li><a onClick={() => handleStatusFilterChange("")}>All</a></li>
            <li><a onClick={() => handleStatusFilterChange("Processing")}>Processing</a></li>
            <li><a onClick={() => handleStatusFilterChange("Shipped")}>Shipped</a></li>
            <li><a onClick={() => handleStatusFilterChange("Delivered")}>Delivered</a></li>
            <li><a onClick={() => handleStatusFilterChange("Returned")}>Returned</a></li>
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
      {addOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setAddOrder(false)}
          ></div>
          <div className="p-6 rounded shadow-lg z-10">
            <AddOrderForm onClose={() => setAddOrder(false)} />
          </div>
        </div>
      )}

      <table className="table w-full">
        <thead>
          <tr className="border-none text-white">
            <th>Order ID</th>
            <th>Products</th>
            <th>Courier Name</th>
            <th>Tracking Number</th>
            <th>Selling Platform</th>
            <th>Status</th>
            <th>Total Paid</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order) => (
            <TableContents
              key={order._id}
              {...order}
              setOrderDetailsId={setOrderDetailsId}
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
      {orderDetailsId && (
        <EditOrderForm
          {...orders.find((order) => order._id === orderDetailsId)}
          onClose={() => setOrderDetailsId(null)}
          onDelete={() => handleDeleteRecord(orderDetailsId)}
        />
      )}
    </div>
  );
};

export default OrdersTable;

const TableContents = ({
  _id,
  id,
  products,
  courier,
  trackingNumber,
  sellingPlatform,
  status,
  totalPaid,
  setOrderDetailsId,
}) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <>
      <tr className="border-none text-white bg-base-content">
        <td>{id}</td>
        <td>
          <button
            className="btn text-white"
            onClick={() => setShowProducts((prev) => !prev)}
          >
            {showProducts ? "Hide List" : "View List"}
          </button>
        </td>
        <td>{courier.name}</td>
        <td>{trackingNumber}</td>
        <td>{sellingPlatform.name}</td>
        <td>{status}</td>
        <td>{totalPaid}</td>
        <td>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOrderDetailsId(_id)}
              className="flex items-center justify-center p-2"
            >
              <KebabHorizontalIcon className="rotate-90" />
            </button>
          </div>
        </td>
      </tr>
      {showProducts && (
        <tr className="border-none text-white bg-secondary">
          <td colSpan="8">
            <table className="table w-full">
              <thead className="text-white">
                <tr className="border-opacity-50">
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-none">
                    <td>{product.productId.sku}</td>
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

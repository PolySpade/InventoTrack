import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchIcon, KebabHorizontalIcon } from "@primer/octicons-react";
import AddOrderForm from "../forms/AddOrderForm";
import EditOrderForm from "../forms/EditOrderForm";
import { OrdersContext } from "../../contexts";
import BulkEditStatusForm from "../forms/BulkEditStatusForm";
import BulkEditPlatformForm from "../forms/BulkEditPlatformForm";

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_BUTTONS = 10;

const OrdersTable = () => {
  const { ordersData: orders, refreshData, couriers, salesplatforms } = useContext(OrdersContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [addOrder, setAddOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [orderDetailsId, setOrderDetailsId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);
  const [changePlatform, setChangePlatform] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path[2] === "Today") {
      setFilterDate(new Date().toISOString().split('T')[0]);
    } else if (path[2] === "ToProcess") {
      setFilterStatus("To Process");
    } else if (path[2]) {
      setFilterStatus(path[2]);
    }

    if (path[2] === "search") {
      setSearchTerm(path[3]);
      setFilterStatus("");
    }

    if (path[2] === "ShippedToday") {
      setFilterStatus("Shipped Today");
    }

    if (path[2] === "CancelledToday") {
      setFilterStatus("Cancelled Today");
    }
  }, [location]);

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

  const handlePlatformFilterChange = (platform) => {
    setFilterPlatform(platform);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCheckboxChange = (orderId) => {
    setCheckedItems((prev) =>
      prev.includes(orderId) ? prev.filter((item) => item !== orderId) : [...prev, orderId]
    );
  };

  const isChecked = (orderId) => checkedItems.includes(orderId);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "Shipped Today"
        ? order.timeline.some(
            (event) =>  
              event.status === "Shipped" &&
              new Date(event.timestamp).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
          )
        : filterStatus === "Cancelled Today"
        ? order.timeline.some(
            (event) =>  
              event.status === "Cancelled" &&
              new Date(event.timestamp).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
          )
        : filterStatus
        ? order.status === filterStatus
        : true;

    const matchesDate = filterDate
      ? new Date(order.timestamp).toISOString().split('T')[0] === filterDate
      : true;

    const matchesPlatform = filterPlatform
      ? order.sellingPlatform.name === filterPlatform
      : true;

    const matchesSearchTerm =
      order.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      order.courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sellingPlatform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesDate && matchesPlatform && matchesSearchTerm;
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentItems = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-[36rem]">
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
        <div className="dropdown dropdown-right mr-3">
          <label tabIndex={0} className="btn text-white">Bulk Actions</label>
          <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
            <li><a onClick={() => setChangeStatus((prev) => !prev)}>Change Status</a></li>
            <li><a onClick={() => setChangePlatform((prev) => !prev)}>Change Selling Platform</a></li>
          </ul>
        </div>
        {changeStatus && (
          <BulkEditStatusForm onClose={() => setChangeStatus(false)} checkedItems={checkedItems} />
        )}

        {changePlatform && (
          <BulkEditPlatformForm onClose={() => setChangePlatform(false)} checkedItems={checkedItems} />
        )}

        <button
          onClick={() => setAddOrder((prev) => !prev)}
          className="btn text-white bg-secondary border-none"
        >
          Create Order
        </button>
        <div className="dropdown dropdown-bottom ml-3">
          <label tabIndex={0} className="btn text-white flex flex-col">Filter Status{filterStatus !== "" && ( <p className=" text-xs">[{filterStatus}]</p>)} </label>
          <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
            <li><a onClick={() => handleStatusFilterChange("")}>All</a></li>
            <li><a onClick={() => handleStatusFilterChange("To Process")}>To Process</a></li>
            <li><a onClick={() => handleStatusFilterChange("Processing")}>Processing</a></li>
            <li><a onClick={() => handleStatusFilterChange("Shipped")}>Shipped</a></li>
            <li><a onClick={() => handleStatusFilterChange("Completed")}>Completed</a></li>
            <li><a onClick={() => handleStatusFilterChange("Cancelled")}>Cancelled</a></li>
            <li><a onClick={() => handleStatusFilterChange("Shipped Today")}>Shipped Today</a></li>
            <li><a onClick={() => handleStatusFilterChange("Cancelled Today")}>Cancelled Today</a></li>
          </ul>
        </div>

        <div className="dropdown dropdown-bottom ml-3">
          <label tabIndex={0} className="btn text-white flex flex-col">Filter Platform{filterPlatform !== "" && ( <p className=" text-xs">[{filterPlatform}]</p>)} </label>
          <ul tabIndex={0} className="dropdown-content text-white z-10 menu p-2 shadow bg-neutral rounded-box w-52">
            <li><a onClick={() => handlePlatformFilterChange("")}>All</a></li>
            {salesplatforms.map((platform) => (
              <li key={platform._id}><a onClick={() => handlePlatformFilterChange(platform.name)}>{platform.name}</a></li>
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
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedItems(currentItems.map(order => order._id));
                    } else {
                      setCheckedItems([]);
                    }
                  }}
                  checked={currentItems.length > 0 && currentItems.every(order => checkedItems.includes(order._id))}
                />
              </label>
            </th>
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
              isChecked={isChecked(order._id)}
              onCheckboxChange={handleCheckboxChange}
              setOrderDetailsId={setOrderDetailsId}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          {renderPaginationButtons()}
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
  isChecked,
  onCheckboxChange,
  setOrderDetailsId,
}) => {
  const [showProducts, setShowProducts] = useState(false);
  return (
    <>
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
          <td colSpan="9">
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

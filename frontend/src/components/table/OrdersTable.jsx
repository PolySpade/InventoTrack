import React, { useState } from "react";
import {
  XIcon,
  PencilIcon,
  KebabHorizontalIcon,
  SearchIcon,
  AlertIcon,
  BellIcon,
  StopIcon,
  CheckCircleIcon,
  CheckCircleFillIcon,
} from "@primer/octicons-react";
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
            <th>Status</th>
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
  buyerPhone,
  status,
}) => {
  const [showProducts, setShowProducts] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);

  // for transfering order to order details

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
        <td>{courierName}</td>
        <td>{trackingNumber}</td>
        <td>{sellingPlatform}</td>
        <td>{status}</td>
        <td className="relative">
          <button onClick={() => setOrderDetails((prev) => !prev)}>
            <KebabHorizontalIcon className="rotate-90" />
          </button>
          {/* // order details form */}
          {orderDetails ? (
            <div className={`fixed inset-4 flex items-center justify-end z-50`}>
              <div className="fixed inset-0 bg-black opacity-50 z-0"></div>
              <div className="flex flex-col relative bg-base-100 bg-opacity-80 text-white rounded-l-lg shadow-lg z-10 w-full max-w-md h-full">
                <div className="bg-primary w-full p-6">
                  <button
                    onClick={() => setOrderDetails((prev) => !prev)}
                    className="absolute top-6 right-6 font-bold text-white"
                  >
                    <XIcon size={20} />
                  </button>
                  <h2 className="text-xl font-bold mb-2"># {id} </h2>
                  <h3 className="text-sm">Order Details</h3>
                </div>
                <div className=" w-full p-6">
                  <div>
                    <h4 className="text-md font-semibold">Buyer</h4>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm">{buyerName}</p>
                        <p className="text-sm text-accent">{buyerEmail}</p>
                        <p className="text-sm">{buyerPhone}</p>
                      </div>
                      <button className="text-white">
                        <PencilIcon size={16} />
                      </button>
                    </div>
                  </div>
                  <hr className=" bg-white w-full h-px my-3"></hr>
                  <div className="mb-4 ">
                    <h1 className="font-bold text-md my-2">Alerts</h1>
                    <div className="flex flex-col">
                      <div>
                        <Alerts orderid={id}></Alerts>
                      </div>
                    </div>
                  </div>

                  <hr className=" bg-white w-full h-px my-3"></hr>
                  <div>
                    <h1 className="font-bold text-md my-2">Timeline</h1>
                    <Timeline/>
                  </div>
                  {/* <div className="mb-4 ">
              <h4 className="text-md font-semibold">Products</h4>
              <div className="space-y-2">
                {products.map((product, index) => (
                  <div key={index} className="bg-base-100 rounded flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="text-xs">SKU: {product.sku}</p>
                      <p className="text-xs">Quantity: {product.quantity}</p>
                      <p className="text-xs">Price: ₱{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
                  <hr className=" bg-white w-full h-px my-3"></hr>
                  <div className="mb-4">
                    <h4 className="text-md font-semibold">
                      Tracking Information
                    </h4>
                    <div className="">
                    <p className="text-sm">Courier: {courierName}</p>
                    <p className="text-sm">Tracking Number: {trackingNumber}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-md font-semibold">Selling Platform</h4>
                    <p className="text-sm">{sellingPlatform}</p>
                  </div>
                  <div>
                  <hr className=" bg-white w-full h-px my-3"></hr>
                  <div >
                  <h1 className="text-md font-semibold mb-2">Notes</h1>
                  <textarea className=" h-40 rounded-lg bg-primary bg-opacity-50 w-full p-2 resize-none "/>
                  
                  </div>
                  </div>
                </div>
                
              </div>
            </div>
          ) : (
            ""
          )}
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

const Alerts = (orderid) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
        <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
          <StopIcon size={16} className=" text-warning" />
        </div>
        <div className="ml-3 flex flex-col text-xs">
          <div className=" font-bold">Warning</div>
          <div>Message</div>
        </div>
      </div>
      <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
        <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
          <BellIcon size={16} className=" text-success" />
        </div>
        <div className="ml-3 flex flex-col text-xs">
          <div className=" font-bold">Notification</div>
          <div>Warning Message</div>
        </div>
      </div>
      <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
        <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
          <AlertIcon size={16} className=" text-error" />
        </div>
        <div className="ml-3 flex flex-col text-xs">
          <div className=" font-bold">Alert</div>
          <div>Message</div>
        </div>
      </div>
    </div>
  );
};

const Timeline = (orderid) => {
  return (
    <ol className="relative mb-3">
      <li className="ms-4 flex items-center">
        <div className="flex items-center absolute w-4 h-4 rounded-full -start-[0.425rem]">
          <CheckCircleFillIcon size={16} className="text-success"/>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
          <div className="font-bold">Out for Delivery</div>
          <div className="text-xs">
            Message
          </div>
          </div>
          <div>
            <date className=" font-medium text-md">June 7, 2024</date>
          </div>
          

        </div>
        
      </li>
      <li className="border-s h-8 -mt-1.5" />

      <li className="-mt-1.5 ms-4 flex items-center">
        <div className="flex items-center absolute w-4 h-4 rounded-full -start-[0.425rem]">
          <CheckCircleFillIcon size={16} className="text-success"/>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
          <div className="font-bold">Arrived to warehouse A</div>
          <div className="text-xs">
            Message
          </div>
          </div>
          <div>
            <date className=" font-medium text-md">June 6, 2024</date>
          </div>
          

        </div>
        
      </li>

    </ol>
  );
};


{/* <ol class="relative border-s border-gray-200 dark:border-gray-700">                  
    <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
        <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg class="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg></a>
    </li>
    <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2022</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Marketing UI design in Figma</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>
    <li class="ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 2022</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">E-Commerce UI code in Tailwind CSS</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
    </li>
</ol> */}


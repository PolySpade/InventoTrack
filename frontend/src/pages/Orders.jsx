
import OrdersTable from '../components/table/OrdersTable'
import axios from "axios";
import { createContext, useEffect, useState } from 'react';
import { OrdersContext } from '../contexts';

const Orders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [ordersData, setOrdersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [salesplatforms, setSalesPlatforms] = useState([]);
  
  const statustypes = [
    {
      name: "To Process",
      timeline: {
        status: "Order To Process",
        timestamp: new Date().toISOString(),
        details: "Order has been set back to process",
      },
      color: "bg-yellow-500", // Tailwind CSS class for background color
    },
    {
      name: "Processing",
      timeline: {
        status: "Processing",
        timestamp: new Date().toISOString(),
        details: "Order is being processed",
      },
      color: "bg-blue-500", // Tailwind CSS class for background color
    },
    {
      name: "Shipped",
      timeline: {
        status: "Shipped",
        timestamp: new Date().toISOString(),
        details: "Order has been shipped",
      },
      color: "bg-purple-500", // Tailwind CSS class for background color
    },
    {
      name: "Completed",
      timeline: {
        status: "Completed",
        timestamp: new Date().toISOString(),
        details: "Order has been completed",
      },
      color: "bg-green-500", // Tailwind CSS class for background color
    },
    {
      name: "Cancelled",
      timeline: {
        status: "Cancelled",
        timestamp: new Date().toISOString(),
        details: "Order has been cancelled",
      },
      color: "bg-red-500", // Tailwind CSS class for background color
    },
  ];

  const getOrdersData = () => {
    axios
      .get(`${API_URL}/orders/`)
      .then((response) => setOrdersData(response.data))
      .catch((err) => console.log(err));
  };

  const getProducts = () => {
    axios
      .get(`${API_URL}/products/`)
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  };

  const getCouriers = () => {
    axios
      .get(`${API_URL}/couriers/`)
      .then((response) => setCouriers(response.data))
      .catch((err) => console.log(err));
  };

  const getSalesPlatforms = () => {
    axios
      .get(`${API_URL}/platforms/`)
      .then((response) => setSalesPlatforms(response.data))
      .catch((err) => console.log(err));
  };

  const refreshData = () => {
    getOrdersData();
    getProducts();
    getCouriers();
    getSalesPlatforms();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <OrdersContext.Provider value={{couriers,ordersData,products,salesplatforms,statustypes, refreshData}}>
    <div className=' overflow-y-hidden flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
        <OrdersTable />
      </div>
    </div>
    </OrdersContext.Provider>
  )
}

export default Orders
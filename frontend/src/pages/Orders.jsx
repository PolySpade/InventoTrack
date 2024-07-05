
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

  useEffect( () => {
    getCouriers();
    getOrdersData();
    getProducts();
    getSalesPlatforms();
  }, []
  );

  return (
    <OrdersContext.Provider value={{couriers,ordersData,products,salesplatforms}}>
    <div className=' overflow-y-hidden flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
        <OrdersTable />
      </div>
    </div>
    </OrdersContext.Provider>
  )
}

export default Orders
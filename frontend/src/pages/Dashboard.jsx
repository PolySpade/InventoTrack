import React, { useEffect, useState } from 'react'
import { DashboardContext } from '../contexts';
import axios from 'axios';
import OrdersDashboard from '../components/others/OrdersDashboard';
import BestSellerThisWeekTable from '../components/table/BestSellerThisWeekTable';
import InventoryLevelsTable from '../components/table/InventoryLevelsTable';
import NotificationsDashboard from '../components/others/NotificationsDashboard';
const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [ordersData, setOrdersData] = useState([]);
  const [inventorydata, setInventorydata] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const getOrdersData = () => {
    axios
      .get(`${API_URL}/orders/`)
      .then((response) => setOrdersData(response.data))
      .catch((err) => console.log(err));
  };
  const getExpensesData = () => {
    axios
      .get(`${API_URL}/expenses/`)
      .then((response) => setExpensesData(response.data))
      .catch((err) => console.log(err));
  };
  const getInventoryData = () => {
    axios.get(`${API_URL}/products/`)
      .then( (response) => {
        setInventorydata(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }

  const getAlertsData = () => {
    axios.get(`${API_URL}/alerts/`)
      .then( (response) => {
        setAlertsData(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }
  const refreshData = () => {
    getOrdersData();
    getExpensesData();
    getInventoryData();
    getAlertsData();
  }

  useEffect(() => {
    refreshData();
  
  }, [])

  return (
    <DashboardContext.Provider value ={{ordersData,inventorydata,alertsData}}>
      <div className='flex flex-row  justify-center  items-center'>
        <div className='flex flex-row m-10 w-full text-white'>
          {/* For Orders */}
          <div className='max-w-3xl h-full flex-col pr-5'>
            <OrdersDashboard />
            <BestSellerThisWeekTable/>
          </div>
          <div className='max-w-2xl pr-5'>
            <InventoryLevelsTable/>
          </div>
          <div className=' max-w-3xl'>
            <NotificationsDashboard/>
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}

//TODO: To Process Orders, Processing, Charts of Sales Revenue, orders Today, Best Sellers, Alerts Side Panel

export default Dashboard
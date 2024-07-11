
import axios from 'axios';
import SalesChart from '../components/charts/SalesChart'
import { createContext, useEffect, useState } from 'react';
import { ReportsContext } from '../contexts';
import OrdersChart from '../components/charts/OrdersChart';
import SmallChart from '../components/charts/SmallChart';

const Reports = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [ordersData, setOrdersData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const getOrdersData = () => {
    axios
      .get(`${API_URL}/orders/`)
      .then((response) => setOrdersData(response.data))
      .catch((err) => console.log(err));
  };
  const getExpensesData = () => {
    axios.get(`${API_URL}/expenses/`)
    .then((response) => setExpensesData(response.data))
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getOrdersData();
    getExpensesData();
  }, [])
  
  return (
    <ReportsContext.Provider value = {{ordersData}}>
      <div className=' overflow-y-hidden flex flex-col justify-center items-center p-10'>
        <div className='w-full text-white flex flex-row justify-between space-x-10'>
              {/* <LineChart/> */}
              <div className='max-w-4xl bg-base-content rounded-3xl flex-1'>
                <SalesChart orders={ordersData}/>
              </div>
              <div className='bg-base-content max-w-4xl flex-1 rounded-3xl'>
                <OrdersChart orders={ordersData}/> 
              </div>
        </div>
        <div className='mt-5 w-full text-white flex flex-row justify-start space-x-10'>
              {/* <LineChart/> */}
              <div className='max-w-96 bg-base-content rounded-3xl flex-1'>
                <SmallChart datas={expensesData}/>
              </div>
              <div className='bg-white max-w-96 flex-1 rounded-3xl'>
                <SalesChart orders={ordersData}/> 
              </div>
        </div>
      </div>
    </ReportsContext.Provider>
  )
}

export default Reports
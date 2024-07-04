import { createContext, useEffect, useState } from 'react';
import InventoryTable from '../components/table/InventoryTable'
import axios from "axios";
import { InventoryContext } from '../contexts';

const Inventory = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [inventorydata, setInventorydata] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [category, setCategory] = useState([]);

  const getInventoryData = () => {
    axios.get(`${API_URL}/products/`)
      .then( (response) => {
        setInventorydata(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }
  const getWarehouse = () => {
    axios.get(`${API_URL}/warehouses/`)
      .then( (response) => {
        setWarehouse(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }

  const getCategory = () => {
    axios.get(`${API_URL}/categories/`)
      .then( (response) => {
        setCategory(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getCategory();
    getInventoryData();
    getWarehouse();
  }, []);
  return (
    <InventoryContext.Provider value={{category,warehouse,inventorydata}}>
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
        <InventoryTable />
      </div>
    </div>
    </InventoryContext.Provider>
  )
}

export default Inventory;


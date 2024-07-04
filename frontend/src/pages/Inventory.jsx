import { createContext, useEffect, useState } from 'react';
import InventoryTable from '../components/table/InventoryTable'
import axios from "axios";

const Inventory = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [inventorydata, setInventorydata] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [category, setCategory] = useState([]);


  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
        <InventoryTable />
      </div>

    </div>
  )
}

export default Inventory;

export const InventoryContext = createContext();

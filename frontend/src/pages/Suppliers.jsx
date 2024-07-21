import React, { useEffect, useState } from 'react'
import { SuppliersContext } from '../contexts/';
import SuppliersTable from '../components/table/SuppliersTable';
import axios from "axios";
const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])

  const getSuppliers = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    axios
    .get(`${API_URL}/suppliers/`)
    .then((response) => setSuppliers(response.data))
    .catch((err) => console.log(err));
};
  const refreshData = () => {
    getSuppliers();
  }
  useEffect(() => {
    refreshData();
  }, [])
  

  return (
    <SuppliersContext.Provider value={{refreshData,suppliers}}>
    <div className=' overflow-y-hidden flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
        <SuppliersTable />
      </div>
    </div>
    </SuppliersContext.Provider>
  )
}

export default Suppliers
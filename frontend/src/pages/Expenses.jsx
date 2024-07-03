import React, { useEffect, useState } from 'react'
import ExpensesTable from '../components/table/ExpensesTable'
import axios from "axios"



const Expenses = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  // await axios.post(`${API_URL}/`, {
    


  // })


  function getExpenses() {
    return axios.get(`${API_URL}/expenses/`);
  }
  console.log(getExpenses())
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
      
        <ExpensesTable />
      </div>

    </div>
  )
}

export default Expenses
import React, { useEffect, useState } from 'react'
import ExpensesTable from '../components/table/ExpensesTable'
import axios from "axios"



const Expenses = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);

  function getExpenses() {
    axios.get(`${API_URL}/expenses/`).then((response) => {
      setData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getExpenses();
  }, [])

  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
      
        <ExpensesTable data={data} />
      </div>

    </div>
  )
}

export default Expenses
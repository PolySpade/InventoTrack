import React from 'react'
import ExpensesTable from '../components/table/ExpensesTable'

const Expenses = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
      
        <ExpensesTable />
      </div>

    </div>
  )
}

export default Expenses
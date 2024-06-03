import React from 'react'
import OrdersTable from '../components/table/OrdersTable'

const Orders = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
      
        <OrdersTable />
      </div>

    </div>
  )
}

export default Orders
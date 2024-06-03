import React from 'react'
import InventoryTable from '../components/table/InventoryTable'


const Inventory = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='m-10 w-full'>
      
        <InventoryTable />
      </div>

    </div>
  )
}

export default Inventory
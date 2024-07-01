import React from 'react'
import LineChart from '../components/charts/LineChart'
import SalesChart from '../components/charts/SalesChart'

const Reports = () => {
  return (
    <div className=' overflow-y-hidden flex flex-row justify-center items-center'>
      <div className='m-10 w-full text-white'>
            {/* <LineChart/> */}
            <div className='max-w-7xl bg-base-content'>
              <SalesChart/>
            </div>

      </div>
    </div>
  )
}

export default Reports
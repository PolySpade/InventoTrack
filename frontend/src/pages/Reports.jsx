import React from 'react'
import LineChart from '../components/charts/LineChart'

const Reports = () => {
  return (
    <div className=' overflow-y-hidden flex flex-row justify-center items-center'>
      <div className='m-10 w-full text-white'>
            <LineChart/>

      </div>
    </div>
  )
}

export default Reports
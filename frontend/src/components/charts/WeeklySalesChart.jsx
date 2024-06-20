import React, {useEffect,useState} from 'react'
import { orders } from '../../constants'
import { formatTimestampDay } from '../../utils'

const WeeklySalesChart = () => {

    // const [chartData, setChartData] = useState({})
    
    const groupByDateAndSum = (orders) => {
        return orders.reduce( (acc,order) => {
            const date = formatTimestampDay(order.timestamp)
            if(!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += order.totalPaid;
            return acc;
        }, {});
    }

    const groupedData = groupByDateAndSum(orders)

    const chartData = Object.keys(groupedData).map(date => ({
        date: date,
        totalPaid: groupedData[date],
      }));
    

      

  return (
    <div>WeeklySalesChart</div>
    
  )
}

export default WeeklySalesChart
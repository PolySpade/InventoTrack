import React, {useContext} from 'react';
import { ReportsContext } from '../../contexts';
import SmallChart from './SmallChart';

const GrossProfitChart = () => {
    const {ordersData: orders, timeFrame} = useContext(ReportsContext);


    const parsedData = orders.map((data) => {
        const totalUnitCost = data.products.reduce((sum, product) => sum + (product.productId.unitCost * product.quantity) , 0);
        const totalPaid = data.totalPaid;
        const amount = totalPaid - totalUnitCost;
        return { timestamp: data.timestamp, amount };
    });

  return (
    <SmallChart datas={parsedData} name="Gross Profit" timeFrame={timeFrame} />
  )
}

export default GrossProfitChart
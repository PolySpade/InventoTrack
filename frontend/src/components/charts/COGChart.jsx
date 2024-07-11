import React, {useContext} from 'react';
import { ReportsContext } from '../../contexts';
import SmallChart from './SmallChart';
import SalesChart from './SalesChart';

const COGChart = () => {

    const {ordersData: datas, timeFrame} = useContext(ReportsContext);

    const parsedData = datas.map(data => {
            const totalUnitCost = data.products.reduce((sum, product) => sum + (product.productId.unitCost * product.quantity), 0);
            return { timestamp: data.timestamp, amount: totalUnitCost };
    });

  return (
    <SmallChart datas={parsedData} name="Cost of Goods Sold" timeFrame={timeFrame} />
  )
}

export default COGChart
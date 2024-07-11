import React, {useContext} from 'react';
import { ReportsContext } from '../../contexts';
import SmallChart from './SmallChart';
import SalesChart from './SalesChart';

const COGChart = () => {

    const {ordersData: datas} = useContext(ReportsContext);

    console.log(datas)

    const parsedData = (datas) => {
        return datas.map(data => {
            const totalUnitCost = data.products.reduce((sum, product) => sum + (product.productId.unitCost * product.quantity), 0);
            return { timestamp: data.timestamp, amount: totalUnitCost };
    })};
    console.log(parsedData(datas))

  return (
    <SmallChart datas={parsedData(datas)} name="Cost of Goods Sold" timeFrame={'month'} />
  )
}

export default COGChart
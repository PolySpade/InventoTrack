import React, { useContext } from 'react';
import { ReportsContext } from '../../contexts';
import SmallChartv2 from './SmallChartv2';

const NetProfitChart = () => {
    const { ordersData: orders, expensesData: expenses, timeFrame } = useContext(ReportsContext);
    
    const parsedData = orders.map((data) => {
        const totalUnitCost = data.products.reduce((sum, product) => sum + (product.productId.unitCost * product.quantity), 0);
        const totalPaid = data.totalPaid;
        const otherFees = data.otherFees || 0; // Assuming otherFees might be undefined
        
        const amount = parseFloat((totalPaid - totalUnitCost - otherFees).toFixed(2));
        return { timestamp: data.timestamp, amount };
    });

    return (
        <SmallChartv2 datas={parsedData} expenses={expenses} name="Net Profit" timeFrame={timeFrame} />
    );
}

export default NetProfitChart;

import React, { useContext } from 'react';
import { ReportsContext } from '../../contexts';
import SmallChartv2 from './SmallChartv2';

const NetProfitChart = () => {
    const { ordersData: orders, expensesData: expenses, timeFrame } = useContext(ReportsContext);

    const totalexpenses = expenses.reduce((sum, expense) => sum + Math.round(expense.amount * 100) / 100, 0);
    let accumulatedProfit = 0;


    const parsedData = orders.map((data) => {
        const totalUnitCost = data.products.reduce((sum, product) => sum + (product.productId.unitCost * product.quantity), 0);
        const totalPaid = data.totalPaid;
        const otherFees = data.otherFees || 0; // Assuming otherFees might be undefined
        
        const amount = parseFloat((totalPaid - totalUnitCost - otherFees - totalexpenses).toFixed(2));
        
        accumulatedProfit += amount;

        return { timestamp: data.timestamp, accumulatedProfit };
    });

    return (
        <SmallChartv2 datas={parsedData} expenses={expenses} name="Net Profit" timeFrame={timeFrame} />
    );
}

export default NetProfitChart;

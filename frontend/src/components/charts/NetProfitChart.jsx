import React, { useContext } from 'react';
import { ReportsContext } from '../../contexts';
import SmallChart from './SmallChart';

const NetProfitChart = () => {
    const { ordersData: orders, expensesData: expenses, timeFrame } = useContext(ReportsContext);

    const totalexpenses = expenses.reduce( (sum, product) => sum + product.amount,0);

    const parsedData = orders.map((data) => {
        const totalUnitCost = data.products.reduce((sum, product) => sum + (product.productId.unitCost * product.quantity), 0);
        const totalPaid = data.totalPaid;
        const otherFees = data.otherFees || 0; // Assuming otherFees might be undefined
        const amount = totalPaid - totalUnitCost - otherFees - totalexpenses;
        return { timestamp: data.timestamp, amount };
    });

    return (
        <SmallChart datas={parsedData} expenses={expenses} name="Net Profit" timeFrame={timeFrame} />
    );
}

export default NetProfitChart;

import React, { useContext, useMemo } from 'react'
import { ReportsContext } from '../../contexts'

const BestSellerTable = () => {
    const { ordersData: orders, timeFrame } = useContext(ReportsContext);

    const filteredOrders = useMemo(() => {
        const now = new Date();
        let startOfPeriod;

        if (timeFrame === 'last7days') {
            startOfPeriod = new Date(now.setDate(now.getDate() - 7));
        } else if (timeFrame === 'last15days') {
            startOfPeriod = new Date(now.setDate(now.getDate() - 15));
        } else if (timeFrame === 'last30days') {
            startOfPeriod = new Date(now.setDate(now.getDate() - 30));
        } else if (timeFrame === 'today') {
            startOfPeriod = new Date(now.setHours(0, 0, 0, 0));
        } else {
            return orders;
        }

        return orders.filter(order => {
            const orderDate = new Date(order.timestamp);
            if (timeFrame === 'today') {
                const endOfToday = new Date(now.setHours(23, 59, 59, 999));
                return orderDate >= startOfPeriod && orderDate <= endOfToday;
            }
            return orderDate >= startOfPeriod;
        });
    }, [orders, timeFrame]);

    const bestSellers = useMemo(() => {
        const productMap = {};

        filteredOrders.forEach(order => {
            order.products.forEach(product => {
                const sku = product.productId.sku;
                if (!productMap[sku]) {
                    productMap[sku] = {
                        name: product.name,
                        orders: 0,
                        totalRevenue: 0
                    };
                }
                productMap[sku].orders += product.quantity;
                productMap[sku].totalRevenue += product.price * product.quantity;
            });
        });

        return Object.entries(productMap).map(([sku, data]) => ({
            sku,
            ...data
        })).sort((a, b) => b.orders - a.orders);
    }, [filteredOrders]);

    return (
        <div className="overflow-x-auto">
            <table className="table text-white">
                {/* head */}
                <thead>
                    <tr className='text-white'>
                        <th>SKU</th>
                        <th>Item Name</th>
                        <th>Orders</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {bestSellers.map(product => (
                        <tr key={product.sku}>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
                            <td>{product.orders}</td>
                            <td>${product.totalRevenue.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BestSellerTable;

import React, { useContext, useMemo } from 'react'
import { ReportsContext } from '../../contexts'

const SalesChannelTable = () => {
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

    const salesChannels = useMemo(() => {
        const channelMap = {};

        filteredOrders.forEach(order => {
            const channel = order.sellingPlatform.name;
            if (!channelMap[channel]) {
                channelMap[channel] = {
                    orders: 0,
                    totalRevenue: 0
                };
            }
            channelMap[channel].orders += 1;
            channelMap[channel].totalRevenue += order.totalPaid;
        });

        return Object.entries(channelMap).map(([name, data]) => ({
            name,
            ...data
        })).sort((a, b) => b.orders - a.orders);
    }, [filteredOrders]);

    return (
        <div className="overflow-x-auto">
            <table className="table text-white">
                {/* head */}
                <thead>
                    <tr className='text-white'>
                        <th>Sales Channel</th>
                        <th>Orders</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {salesChannels.map(channel => (
                        <tr key={channel.name}>
                            <td>{channel.name}</td>
                            <td>{channel.orders}</td>
                            <td>₱{channel.totalRevenue.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesChannelTable;

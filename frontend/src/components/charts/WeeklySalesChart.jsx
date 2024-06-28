import React from 'react';
import { orders } from '../../constants';
import { formatTimestampDay } from '../../utils';
import Chart from "react-apexcharts";

const WeeklySalesChart = () => {
    const groupByDateAndSum = (orders) => {
        return orders.reduce((acc, order) => {
            const date = formatTimestampDay(order.timestamp);
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += order.totalPaid;
            return acc;
        }, {});
    }

    const groupedData = groupByDateAndSum(orders);

    const chartData = Object.keys(groupedData).map(date => ({
        date: date,
        totalPaid: groupedData[date],
    }));

    const dates = chartData.map(data => data.date);
    const totalPaid = chartData.map(data => data.totalPaid);

    const options = {
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            categories: dates
        },
        stroke: {
            width: 5
        },
        title: {
            text: "Weekly Sales Data",
            align: 'left',
            style: {
                fontSize: "20px",
                color: "white",
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: [ '#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              }
        }
    };

    const series = [{
        name: 'Sales',
        data: totalPaid
    }];

    return (
        <div className='chart'>
            <Chart options={options} series={series} type="line" />
        </div>
    );
}

export default WeeklySalesChart;

import React, { useContext, useState } from 'react';
import Chart from "react-apexcharts";
import './chartStyles.css';
import { formatTimestampDay, formatTimestampMonth, formatTimestampWeek } from '../../utils';
import { ReportsContext } from '../../contexts';

const SalesChart = () => {
    const { ordersData: orders, timeFrame } = useContext(ReportsContext);

    const filterOrders = (orders, timeFrame) => {
        const now = new Date();
        let filteredOrders = orders;

        if (timeFrame === 'last7days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 7));
            filteredOrders = orders.filter(order => new Date(order.timestamp) >= startOfPeriod);
        } else if (timeFrame === 'last15days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 15));
            filteredOrders = orders.filter(order => new Date(order.timestamp) >= startOfPeriod);
        } else if (timeFrame === 'last30days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 30));
            filteredOrders = orders.filter(order => new Date(order.timestamp) >= startOfPeriod);
        }  else if (timeFrame === 'today') {
            const startOfToday = new Date(now.setHours(0, 0, 0, 0));
            const endOfToday = new Date(now.setHours(23, 59, 59, 999));
            filteredOrders = orders.filter((order) => {
              const orderDate = new Date(order.timestamp);
              return orderDate >= startOfToday && orderDate <= endOfToday;
            });
        }  else {
            filteredOrders = orders;
        } 

        return filteredOrders;
    }

    const groupByDateAndCount = (orders) => {
        return orders.reduce((acc, order) => {
            let date = formatTimestampDay(order.timestamp);

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += order.totalPaid;

            return acc;
        }, {});
    }

    const filteredOrders = filterOrders(orders, timeFrame);
    const groupedData = groupByDateAndCount(filteredOrders);

    const chartData = Object.keys(groupedData).map(date => ({
        date: date,
        totalPaid: parseFloat(groupedData[date]).toFixed(2),
    }));

    const dates = chartData.map(data => data.date);
    const totalPaid = chartData.map(data => data.totalPaid);

    const options = {
        chart: {
            type: 'line',
            height: 300,
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                theme: 'dark',
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true,
                },
                export: {
                    csv: {
                        filename: 'chart-data',
                        columnDelimiter: ',',
                        headerCategory: 'Category',
                        headerValue: 'Value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString();
                        }
                    },
                    svg: {
                        filename: 'chart-data'
                    },
                    png: {
                        filename: 'chart-data'
                    }
                }
            }
        },
        xaxis: {
            categories: dates,
            labels: {
                style: {
                    colors: '#868B93',
                    fontSize: '12px',
                    fontFamily: 'Poppins, sans-serif'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#868B93',
                    fontSize: '12px',
                    fontFamily: 'Poppins, sans-serif'
                }
            }
        },
        grid: {
            show: false // Hide grid lines
        },
        stroke: {
            width: 5,
            colors: ['#E323FF']
        },
        title: {
            text: `Sales Data`,
            align: 'left',
            style: {
                fontSize: "20px",
                color: "white",
                fontWeight: 'bold',
                padding: '10px'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#7517F8'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        markers: {
            size: 5,
            colors: ['#7517F8'],
            strokeColor: '#fff',
            strokeWidth: 2,
            fillOpacity: 0.5
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif'
            },
            onDatasetHover: {
                highlightDataSeries: true
            },
            marker: {
                show: true,
                fillColors: ['#7517F8']
            },
        }
    };

    const series = [{
        name: 'Sales',
        data: totalPaid
    }];

    return (
        <div className='chart flex flex-col relative px-5 pt-3 pb-0'>
            <Chart options={options} series={series} type="line" />
        </div>
    );
}

export default SalesChart;

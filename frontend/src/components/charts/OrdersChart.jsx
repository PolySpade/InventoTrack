import React, { useContext, useState } from 'react';
import Chart from "react-apexcharts";
import './chartStyles.css';
import { formatTimestampDay } from '../../utils';
import { ReportsContext } from '../../contexts';

const OrdersChart = () => {
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
        } else if (timeFrame === 'overall') {
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
            acc[date] += 1;

            return acc;
        }, {});
    }

    const filteredOrders = filterOrders(orders, timeFrame);
    const groupedData = groupByDateAndCount(filteredOrders);

    const chartData = Object.keys(groupedData).map(date => ({
        date: date,
        orderCount: groupedData[date],
    }));

    const dates = chartData.map(data => data.date);
    const orderCounts = chartData.map(data => data.orderCount);

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
        },grid:{
            show:false
        },
        stroke: {
            width: 5,
            colors: ['#E323FF']
        },
        title: {
            text: `Orders Data`,
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
        name: 'Orders',
        data: orderCounts
    }];

    return (
        <div className='chart flex flex-col relative px-5 pt-3 pb-0'>
            <Chart options={options} series={series} type="line" />
        </div>
    );
}

export default OrdersChart;

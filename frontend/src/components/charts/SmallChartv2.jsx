import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './chartStyles.css';
import { formatTimestampDay, formatTimestampMonth, formatTimestampWeek } from '../../utils';

const SmallChartv2 = ({ datas, name, timeFrame, expenses }) => {
    // Calculate the total expenses
    let totalexpenses = expenses.reduce((sum, expense) => sum + Math.round(expense.amount * 100) / 100, 0);
    
    // Group data by date and sum the amounts
    const groupByDateAndSum = (datas) => {
        return datas.reduce((acc, data) => {
            let date = formatTimestampDay(data.timestamp);

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += data['amount'];

            return acc;
        }, {});
    }

    // Group the data and calculate the net profit for all dates
    const groupedData = groupByDateAndSum(datas);
    
    let chartData = Object.keys(groupedData).map(date => {
        // Calculate the total for this date after deducting the expenses
        const total = parseFloat(groupedData[date].toFixed(2)) - totalexpenses;
    
        // Adjust the totalExpenses by subtracting the current total
        totalexpenses -= parseFloat(groupedData[date].toFixed(2));
    
        return {
            date: date,
            total: total
        };
    });

    // Sort the data by date in ascending order
    chartData = chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Filter the data based on the selected timeFrame after net profit calculation
    const filterData = (data, timeFrame) => {
        const now = new Date();
        let filteredData = data;

        if (timeFrame === 'last7days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 7));
            filteredData = data.filter(item => new Date(item.date) >= startOfPeriod);
        } else if (timeFrame === 'last15days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 15));
            filteredData = data.filter(item => new Date(item.date) >= startOfPeriod);
        } else if (timeFrame === 'last30days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 30));
            filteredData = data.filter(item => new Date(item.date) >= startOfPeriod);
        } else if (timeFrame === 'today') {
            const startOfToday = new Date(now.setHours(0, 0, 0, 0));
            const endOfToday = new Date(now.setHours(23, 59, 59, 999));
            filteredData = data.filter(item => {
                const dataDate = new Date(item.date);
                return dataDate >= startOfToday && dataDate <= endOfToday;
            });
        } else if (timeFrame === 'overall') {
            filteredData = data;
        }

        return filteredData;
    }

    // Apply filtering after calculating net profit
    const filteredChartData = filterData(chartData, timeFrame);

    const dates = filteredChartData.map(data => data.date);
    const total = filteredChartData.map(data => data.total);

    const finaltotal = chartData.map(data => data.total)

    const totalAmount = finaltotal[total.length - 1];

    const options = {
        chart: {
            type: 'area',
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
                            return formatTimestampDay(timestamp);
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
                    fontSize: '5px',
                    fontFamily: 'Poppins, sans-serif'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#868B93',
                    fontSize: '8px',
                    fontFamily: 'Poppins, sans-serif'
                }
            }
        },
        grid: {
            show: false 
        },
        stroke: {
            width: 2,
            colors: ['#E323FF']
        },
        title: {
            text: `${name}: ₱${totalAmount}`,
            align: 'left',
            style: {
                fontSize: "12px",
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
                opacityFrom: 0.7,
                opacityTo: 0.9,
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
        name: name,
        data: total
    }];

    return (
        <div className='chart flex flex-col relative px-5 pt-3 pb-0'>
            <Chart options={options} series={series} type="area" />
        </div>
    );
}

export default SmallChartv2;

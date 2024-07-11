import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './chartStyles.css';
import { formatTimestampDay, formatTimestampMonth, formatTimestampWeek } from '../../utils';

const SalesChart = ({ orders }) => {
    const [timeFrame, setTimeFrame] = useState('daily');

    const groupByDateAndSum = (orders, timeFrame) => {
        return orders.reduce((acc, order) => {
            let date;
            if (timeFrame === 'monthly') {
                date = formatTimestampMonth(order.timestamp);
            } else if (timeFrame === 'weekly') {
                date = formatTimestampWeek(order.timestamp);
            } else {
                date = formatTimestampDay(order.timestamp);
            }

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += order.totalPaid;

            return acc;
        }, {});
    }

    const groupedData = groupByDateAndSum(orders, timeFrame);

    const chartData = Object.keys(groupedData).map(date => ({
        date: date,
        totalPaid: groupedData[date],
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
            <div className='flex justify-center z-10 w-full absolute'>
                <div className="dropdown -mt-1 p-0">
                <label tabIndex={0} className="btn p-2 text-white">{timeFrame.toUpperCase()}</label>
                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box p-1">
                    <li><button onClick={() => setTimeFrame('daily')}>Daily</button></li>
                    <li><button onClick={() => setTimeFrame('weekly')}>Weekly</button></li>
                    <li><button onClick={() => setTimeFrame('monthly')}>Monthly</button></li>
                </ul>
                </div>
            </div>
            <Chart options={options} series={series} type="line" />
        </div>
    );
}

export default SalesChart;

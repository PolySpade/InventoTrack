import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './chartStyles.css';
import { formatTimestampDay, formatTimestampMonth, formatTimestampWeek } from '../../utils';

const SmallChartv2 = ({ datas, name, timeFrame }) => {
    const filterData = (datas, timeFrame) => {
        const now = new Date();
        let filteredData = datas;

        if (timeFrame === 'last7days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 7));
            filteredData = datas.filter(data => new Date(data.timestamp) >= startOfPeriod);
        } else if (timeFrame === 'last15days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 15));
            filteredData = datas.filter(data => new Date(data.timestamp) >= startOfPeriod);
        } else if (timeFrame === 'last30days') {
            const startOfPeriod = new Date(now.setDate(now.getDate() - 30));
            filteredData = datas.filter(data => new Date(data.timestamp) >= startOfPeriod);
        } else if (timeFrame === 'today') {
            const startOfToday = new Date(now.setHours(0, 0, 0, 0));
            const endOfToday = new Date(now.setHours(23, 59, 59, 999));
            filteredData = datas.filter(data => {
                const dataDate = new Date(data.timestamp);
                return dataDate >= startOfToday && dataDate <= endOfToday;
            });
        } else if (timeFrame === 'overall') {
            filteredData = datas;
        }
        

        return filteredData;
    }

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

    const filteredData = filterData(datas, timeFrame);
    const groupedData = groupByDateAndSum(filteredData);

    let chartData = Object.keys(groupedData).map(date => ({
        date: date,
        total: parseFloat(groupedData[date])
    }));

    // Sort the data by date in ascending order
    chartData = chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const dates = chartData.map(data => data.date);
    const total = chartData.map(data => data.total);

    const totalAmount = total[total.length-1];
    const options = {
        chart: {
            type: 'area',
            height: 300,
            fontFamily: 'Poppins, sans-serif',
            toolbar: {
                theme: 'dark',
                show: false,
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
            text: `${name}: ${totalAmount}`,
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
            {/* <div className='flex justify-center z-10 w-full absolute'>
                <div className="dropdown -mt-1 p-0">
                <label tabIndex={0} className="btn p-2 text-white">{timeFrame.toUpperCase()}</label>
                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box p-1">
                    <li><button onClick={() => setTimeFrame('daily')}>Daily</button></li>
                    <li><button onClick={() => setTimeFrame('weekly')}>Weekly</button></li>
                    <li><button onClick={() => setTimeFrame('monthly')}>Monthly</button></li>
                </ul>
                </div>
            </div> */}
            <Chart options={options} series={series} type="area" />
        </div>
    );
}

export default SmallChartv2;

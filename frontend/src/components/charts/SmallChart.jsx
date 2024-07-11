import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './chartStyles.css';
import { formatTimestampDay, formatTimestampMonth, formatTimestampWeek } from '../../utils';

const SmallChart = ({ datas, name, timeFrame }) => {
    timeFrame = 'daily';

    const groupByDateAndSum = (datas, timeFrame) => {
        return datas.reduce((acc, data) => {
            let date;
            if (timeFrame === 'monthly') {
                date = formatTimestampMonth(data.timestamp);
            } else if (timeFrame === 'weekly') {
                date = formatTimestampWeek(data.timestamp);
            } else {
                date = formatTimestampDay(data.timestamp);
            }

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += data['amount'];

            return acc;
        }, {});
    }

    const groupedData = groupByDateAndSum(datas, timeFrame);

    let chartData = Object.keys(groupedData).map(date => ({
        date: date,
        total: groupedData[date],
    }));

    // Sort the data by date in ascending order
    chartData = chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const dates = chartData.map(data => data.date);
    const total = chartData.map(data => data.total);

    const totalAmount = total.reduce((acc, amount) => acc + amount, 0);
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
        stroke: {
            width: 2,
            colors: ['#E323FF']
        },
        title: {
            text: `Expenses: ${totalAmount}`,
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
        name: 'Expenses',
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

export default SmallChart;

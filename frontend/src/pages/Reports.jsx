import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ReportsContext } from "../contexts";
import SalesChart from "../components/charts/SalesChart";
import OrdersChart from "../components/charts/OrdersChart";
import SmallChart from "../components/charts/SmallChart";
import ExpensesChart from "../components/charts/ExpensesChart";
import COGChart from "../components/charts/COGChart";
import GrossProfitChart from "../components/charts/GrossProfitChart";
import BestSellerTable from "../components/table/BestSellerTable";
import SalesChannelTable from "../components/table/SalesChannelTable";
import NetProfitChart from "../components/charts/NetProfitChart";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const Reports = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [ordersData, setOrdersData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("last7days");
  const [timeFrameText, setTimeFrameText] = useState("Last 7 Days");
  const [visibleCharts, setVisibleCharts] = useState({
    sales: true,
    orders: true,
    expenses: true,
    cog: true,
    grossProfit: true,
    netProfit: true,
    bestSeller: true,
    salesChannel: true,
  });
  const [chartKeys, setChartKeys] = useState({
    sales: 0,
    orders: 0,
    expenses: 0,
    cog: 0,
    grossProfit: 0,
    netProfit: 0,
    bestSeller: 0,
    salesChannel: 0,
  });

  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };

  const getOrdersData = () => {
    axios
      .get(`${API_URL}/orders/`, { headers })
      .then((response) => setOrdersData(response.data))
      .catch((err) => console.log(err));
  };
  
  const getExpensesData = () => {
    axios
      .get(`${API_URL}/expenses/`, { headers })
      .then((response) => setExpensesData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrdersData();
    getExpensesData();
  }, []);

  const handleToggle = (chart) => {
    setVisibleCharts((prevState) => ({
      ...prevState,
      [chart]: !prevState[chart],
    }));
    setChartKeys((prevKeys) => ({
      ...prevKeys,
      [chart]: prevKeys[chart] + 1,
    }));
  };

  return (
    <ReportsContext.Provider value={{ ordersData, expensesData, timeFrame }}>
      <div className="max-w-full overflow-x-hidden flex flex-col px-10 pt-3">
        <div className="flex justify-start z-10 w-full mb-2">
          <div className="dropdown">
            <label tabIndex={0} className="btn min-w-36 p-2 text-white">
              {timeFrameText.toUpperCase()}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 rounded-box p-1 text-white"
            >
              <li>
                <button
                  onClick={() => {
                    setTimeFrame("today");
                    setTimeFrameText("Today");
                  }}
                >
                  Today
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTimeFrame("last7days");
                    setTimeFrameText("Last 7 Days");
                  }}
                >
                  Last 7 Days
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTimeFrame("last15days");
                    setTimeFrameText("Last 15 Days");
                  }}
                >
                  Last 15 Days
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTimeFrame("last30days");
                    setTimeFrameText("Last 30 Days");
                  }}
                >
                  Last 30 Days
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setTimeFrame("overall");
                    setTimeFrameText("Overall");
                  }}
                >
                  Overall
                </button>
              </li>
            </ul>
          </div>
          <div className="ml-3 mb-5 text-white">
            <h2 className=" text-s mb-1 ">Toggle Charts</h2>
            <div className="flex flex-wrap">
              {Object.keys(visibleCharts).map((chart) => (
                <label key={chart} className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    checked={visibleCharts[chart]}
                    onChange={() => handleToggle(chart)}
                    className="mr-2 checkbox checkbox-info"
                  />
                  {chart.charAt(0).toUpperCase() + chart.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-full text-white flex flex-row justify-between space-x-10">
          {visibleCharts.sales && (
            <div className="bg-base-content rounded-3xl flex-1">
              <SalesChart key={chartKeys.sales} />
            </div>
          )}
          {visibleCharts.orders && (
            <div className="bg-base-content flex-1 rounded-3xl">
              <OrdersChart key={chartKeys.orders} />
            </div>
          )}
        </div>

        <div className="mt-5 text-white flex flex-row justify-start space-x-10 overflow-y-hidden">
          {visibleCharts.expenses && (
            <div className="min-w-96 bg-base-content rounded-3xl">
              <ExpensesChart key={chartKeys.expenses} />
            </div>
          )}
          {visibleCharts.cog && (
            <div className="bg-base-content min-w-96 rounded-3xl">
              <COGChart key={chartKeys.cog} />
            </div>
          )}
          {visibleCharts.grossProfit && (
            <div className="bg-base-content min-w-96 rounded-3xl">
              <GrossProfitChart key={chartKeys.grossProfit} />
            </div>
          )}
          {visibleCharts.netProfit && (
            <div className="bg-base-content min-w-96 rounded-3xl">
              <NetProfitChart key={chartKeys.netProfit} />
            </div>
          )}
        </div>

        <div className="my-5 flex flex-row space-x-10">
          {visibleCharts.bestSeller && (
            <div className="bg-base-content rounded-3xl flex-1 p-3 min-h-64">
              <BestSellerTable />
            </div>
          )}
          {visibleCharts.salesChannel && (
            <div className="bg-base-content rounded-3xl flex-1 p-3 min-h-64">
              <SalesChannelTable />
            </div>
          )}
        </div>
      </div>
    </ReportsContext.Provider>
  );
};

export default Reports;

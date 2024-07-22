import React, { useContext } from "react";
import { DashboardContext } from "../../contexts";
import { Link } from "react-router-dom";

const OrdersDashboard = () => {
  const { ordersData, isLoading, error } = useContext(DashboardContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }

  const toProcessOrders = ordersData.filter(
    (order) => order.status === "To Process"
  );
  const processingOrders = ordersData.filter(
    (order) => order.status === "Processing"
  );
  const cancelledOrders = ordersData.filter(
    (order) => order.status === "Cancelled"
  );

  const toProcessQuantity = toProcessOrders.length;
  const processingQuantity = processingOrders.length;

  const today = new Date().toISOString().split("T")[0];
  const todayOrders = ordersData.filter(
    (order) => order.timestamp.split("T")[0] === today
  );
  const todayOrdersQuantity = todayOrders.length;

  const cancelledQuantity = ordersData.filter((order) =>
    order.timeline.some(
      (event) =>
        event.status === "Cancelled" && event.timestamp.split("T")[0] === today
    )
  ).length;

  const shippedTodayOrders = ordersData.filter((order) =>
    order.timeline.some(
      (event) =>
        event.status === "Shipped" && event.timestamp.split("T")[0] === today
    )
  );
  const shippedTodayQuantity = shippedTodayOrders.length;

  console.log(ordersData);
  const totalRevenue = todayOrders.reduce(
    (sum, order) => sum + parseFloat(order.totalPaid),
    0
  );
  const averageOrderValue =
    todayOrders.length > 0 ? totalRevenue / todayOrders.length : 0;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full bg-neutral rounded-xl p-8 mb-4">
        <p className="text-sm font-bold mb-3">Order Status</p>
        <div className="flex flex-row items-start">
          <div className="flex justify-center flex-col items-center pr-6 ">
            <Link className="text-4xl text-success" to="/orders/ToProcess">
              {toProcessQuantity}
            </Link>
            <div className="text-xl font-bold text-nowrap">TO PROCESS</div>
          </div>
          <div className="flex justify-center flex-col items-center pr-6">
            <Link className="text-4xl text-warning" to="/orders/Processing">
              {processingQuantity}
            </Link>
            <div className="text-xl font-bold">PROCESSING</div>
          </div>
          <div className="flex justify-center flex-col items-center pr-6">
            <Link className="text-4xl text-info" to="/orders/Shipped">
              {shippedTodayQuantity}
            </Link>
            <div className="text-xl font-bold">SHIPPED</div>
            <div className="text-xs font-bold">TODAY</div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <Link className="text-4xl text-danger" to="/orders/Cancelled">
              {cancelledQuantity}
            </Link>
            <div className="text-xl font-bold">CANCELLED</div>
            <div className="text-xs font-bold">TODAY</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-neutral rounded-xl p-8 mb-4 w-full">
      <p className="flex text-sm font-bold mb-3 justify-center">Order Summary</p>
      <div className="flex flex-row justify-around items-center w-full ">
        <div className="flex flex-col ">
          <div className="text-xl font-bold mb-2">Today's Orders:</div>
          <Link
            className="flex justify-center items-center text-4xl text-base-300"
            to="/orders/Today"
          >
            {todayOrdersQuantity}
          </Link>
        </div>
        <div>
          <div className="flex flex-row">
            <div className="text-xl font-bold mb-2 pr-3">Total Revenue: </div>
            <div className="text-xl"> ₱{totalRevenue.toFixed(2)}</div>
          </div>
          <div className="flex flex-row">
            <div className="text-xl font-bold mb-2 pr-3">Avg Order Value: </div>
            <div className="text-xl"> ₱{averageOrderValue.toFixed(2)}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;

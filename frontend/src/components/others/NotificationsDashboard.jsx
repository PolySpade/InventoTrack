import React, { useEffect, useState, useContext } from 'react';
import { StopIcon, AlertIcon, BellIcon } from '@primer/octicons-react';
import { DashboardContext } from '../../contexts';
import { Link } from 'react-router-dom';

const NotificationsDashboard = () => {
  const { ordersData } = useContext(DashboardContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const generateAlerts = () => {
      const newAlerts = [];

      ordersData.forEach(order => {
        const { status, timestamp, totalPaid, trackingNumber, _id, id } = order;
        
        // Late shipment risk
        if (status === 'To Process') {
          const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
          const orderDate = new Date(timestamp);
          const currentDate = new Date();
          const difference = currentDate - orderDate;

          if (difference > oneDay) {
            newAlerts.push({
              _id: `${id}-late-shipment`,
              sku: id,
              alertType: 'Warning',
              message: 'Risk of late shipment',
            });
          }
        }

        // Payment issues (assuming `totalPaid` should be greater than 0)
        // if (totalPaid <= 0) {
        //   newAlerts.push({
        //     _id: `${id}-payment-issue`,
        //     sku: id,
        //     alertType: 'Alert',
        //     message: 'Payment issue: Total paid is zero or negative',
        //   });
        // }

        // Missing tracking information
        if (status === 'Shipped' && (!trackingNumber || trackingNumber.trim() === '')) {
          newAlerts.push({
            _id: `${id}-missing-tracking`,
            sku: id,
            alertType: 'Alert',
            message: 'Tracking information is missing',
          });
        }
        // // Order not updated for more than two weeks
        // const twoWeeks = 14 * 24 * 60 * 60 * 1000; // milliseconds in two weeks
        // const lastUpdatedDate = new Date(timestamp); // Assuming `timestamp` is last updated time
        // const currentDate = new Date();
        // const timeSinceLastUpdate = currentDate - lastUpdatedDate;

        // if (timeSinceLastUpdate > twoWeeks) {
        //   newAlerts.push({
        //     _id: `${_id}-not-updated`,
        //     alertType: 'Notification',
        //     message: 'Order has not been updated for more than two weeks',
        //   });
        // }
      });

      setAlerts(newAlerts);
    };

    generateAlerts();
  }, [ordersData]);

  const getIcon = (alertType) => {
    switch (alertType) {
      case 'Warning':
        return <StopIcon size={16} className="text-warning" />;
      case 'Notification':
        return <BellIcon size={16} className="text-success" />;
      case 'Alert':
        return <AlertIcon size={16} className="text-error" />;
      default:
        return <BellIcon size={16} className="text-success" />;
    }
  };

  return (
    <div className="w-96 bg-neutral rounded-lg p-4 h-full">
      <p className="mb-3">Order Notifications</p>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex flex-row w-full bg-secondary rounded-lg min-h-16 items-center">
            <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
              {getIcon(alert.alertType)}
            </div>
            <div className="ml-3 flex flex-col text-xs">
              <div className="font-bold">{alert.alertType}</div>
              <div>{alert.message}</div>
              <Link className='text-base-300' to={`/orders/search/${alert.sku}`} > Order ID: {alert.sku} </Link>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsDashboard;

import React, { useContext, useState, useEffect } from "react";
import {
  XIcon,
  PencilIcon,
  ArchiveIcon,
  XCircleFillIcon,
  TrashIcon,
  AlertIcon,
  BellIcon,
  StopIcon,
  CheckCircleFillIcon,
  QuestionIcon,
} from "@primer/octicons-react";
import { formatTimestamp } from "../../utils";
import axios from "axios";
import { OrdersContext } from "../../contexts";
import EditOrderedProductsForm from "./EditOrderedProductsForm";

const EditOrderForm = ({
  _id,
  id,
  buyer,
  courier,
  trackingNumber,
  sellingPlatform,
  status,
  totalPaid,
  products,
  otherFees,
  timestamp,
  timeline,
  notes,
  onClose}) => {
  const { refreshData, couriers, salesplatforms, statustypes } = useContext(OrdersContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [editNotes, setEditNotes] = useState(false);
  const [noteText, setNoteText] = useState(notes);
  const [editStatus, setEditStatus] = useState(false);
  const [statusname, setStatusName] = useState(status);
  const [editBuyer, setEditBuyer] = useState(false);
  const [editTracking, setEditTracking] = useState(false);
  const [editSellingPlatform, setEditSellingPlatform] = useState(false);
  const [editTotalPaid, setEditTotalPaid] = useState(false);
  const [editFees, setEditFees] = useState(false);

  const [buyerName, setBuyerName] = useState(buyer.buyerName);
  const [buyerPhone, setBuyerPhone] = useState(buyer.buyerPhone);
  const [buyerEmail, setBuyerEmail] = useState(buyer.buyerEmail);
  const [courierName, setCourierName] = useState(courier.name);
  const [trackingNum, setTrackingNum] = useState(trackingNumber);
  const [sellingPlatformId, setSellingPlatformId] = useState(sellingPlatform._id);
  const [totalPaidValue, setTotalPaidValue] = useState(totalPaid);
  const [feesValue, setFeesValue] = useState(otherFees);
  const [editProducts,setEditProducts] = useState(false);
  const [alerts,setAlerts] = useState([])

  const [error,setError] = useState("")

  useEffect(() => {
    const generateAlerts = () => {
      const newAlerts = [];
  
      // Late shipment risk
      if (status === 'To Process') {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
        const orderDate = new Date(timestamp);
        const currentDate = new Date();
        const difference = currentDate - orderDate;
  
        if (difference > oneDay) {
          newAlerts.push({
            alertType: 'Warning',
            message: 'Risk of late shipment',
          });
        }
      }
  
      // // Payment issues (assuming `totalPaid` should be greater than 0)
      // if (totalPaid <= 0) {
      //   newAlerts.push({
      //     alertType: 'Alert',
      //     message: 'Payment issue: Total paid is zero or negative',
      //   });
      // }
  
      // Missing tracking information
      if (status === 'Shipped' && (!trackingNumber || trackingNumber.trim() === '')) {
        newAlerts.push({
          alertType: 'Alert',
          message: 'Tracking information is missing',
        });
      }
  
  
      setAlerts(newAlerts);
    };
  
    generateAlerts();
  }, [status, timestamp, totalPaid, trackingNumber]);
  
  const saveNotes = async () => {
    setEditNotes(false);
    const data = {
      notes: noteText,
    };
    try {
      const response = await axios.put(`${API_URL}/orders/EditNotes/${_id}`, data);
      console.log("Notes Updated:", response);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const saveStatus = async () => {
    setEditStatus(false);
    const statusType = statustypes.find((status) => status.name === statusname);
    const data = {
      status: statusType.name,
      timeline: [statusType.timeline],
    };
    try {
      const response = await axios.put(`${API_URL}/orders/EditStatus/${_id}`, data);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const saveBuyer = async () => {
    console.log(buyerEmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(buyerEmail) && buyerEmail) {
      alert("Please enter a valid email address");
      return;
    }
    const data = {
      buyer: {
        buyerName,
        buyerPhone,
        buyerEmail,
      },
    };

    try {
      const response = await axios.put(`${API_URL}/orders/EditBuyer/${_id}`, data);
      setEditBuyer(false);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const saveTrackingInfo = async () => {
    setEditTracking(false);
    const data = {
      courier: courier._id,
      trackingNumber: trackingNum,
    };

    try {
      const response = await axios.put(`${API_URL}/orders/EditTracking/${_id}`, data);
      console.log(response);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const saveSellingPlatform = async () => {
    setEditSellingPlatform(false);
    const data = {
      sellingPlatform: sellingPlatformId,
    };

    try {
      const response = await axios.put(`${API_URL}/orders/EditPlatform/${_id}`, data);
      console.log(response);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const saveTotalPaid = async () => {
    const totalPaidnum = Number(totalPaidValue);
    if (isNaN(totalPaidnum) || totalPaidnum < 0 || totalPaidValue ===  "") {
      alert("Please enter a valid non-negative number for the fees");
      return;
    }

    const data = {
      totalPaid: totalPaidnum.toFixed(2),
    };

    try {
      const response = await axios.put(`${API_URL}/orders/EditTotal/${_id}`, data);
      console.log(response);
      setEditTotalPaid(false);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const saveFees = async () => {
    const feesNum = Number(feesValue);
    if (isNaN(feesNum) || feesNum < 0 || feesValue === "") {
      alert("Please enter a valid non-negative number for the fees");
      return;
    }
    const data = {
      otherFees: feesNum.toFixed(2),
    };

    try {
      const response = await axios.put(`${API_URL}/orders/EditFees/${_id}`, data);
      console.log(response);
      setEditFees(false);
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try{
      const response = await axios.delete(`${API_URL}/orders/DeleteOrder/${_id}`);
      console.log(response);
      onClose();
      refreshData();
    }catch(err) {
      console.log(err)
    }
  }

  const handleEditProducts = async () => {
    setEditProducts(true);
    // onClose();
  }
  

  return (
    <div className="fixed inset-4 flex items-center justify-end z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={onClose}></div>
      <div className="flex flex-col relative bg-base-100 bg-opacity-80 text-white rounded-l-lg shadow-lg z-10 w-full max-w-md h-full overflow-y-auto">
        <div className="bg-primary w-full p-6">
          <button onClick={onClose} className="absolute top-6 right-6 font-bold text-white">
            <XIcon size={20} />
          </button>
          <h2 className="text-xl font-bold mb-2"># {id} </h2>
          <div className="flex justify-between">
            <h3 className="text-sm">Order Details</h3>
            <h3 className="text-sm">{formatTimestamp(timestamp)}</h3>
          </div>
        </div>
        <div className="w-full p-6">
          <div>
            <h4 className="text-md font-semibold">Buyer</h4>
            <div className="flex items-center justify-between mb-2">
              {!editBuyer && (
                <>
                  <div>
                    <p className="text-sm">Name: {buyer.buyerName}</p>
                    <p className="text-sm">
                      Email: <span className="text-accent">{buyer.buyerEmail}</span>
                    </p>
                    <p className="text-sm">Phone: {buyer.buyerPhone}</p>
                  </div>
                  <button className="text-white" onClick={() => setEditBuyer((prev) => !prev)}>
                    <PencilIcon size={16} />
                  </button>
                </>
              )}
              {editBuyer && (
                <>
                  <div>
                    <div className="space-y-2">
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Name: </p>
                        <input
                          type="text"
                          onChange={(e) => setBuyerName(e.target.value)}
                          defaultValue={buyer.buyerName}
                          className="input w-full pt-0 leading-tight h-6 bg-primary text-xs"
                        />
                      </div>
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Email: </p>
                        <input
                          type="email"
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          defaultValue={buyer.buyerEmail}
                          className="input w-full pt-0 leading-tight h-6 bg-primary text-xs"
                        />
                      </div>
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Phone: </p>
                        <input
                          type="number"
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          defaultValue={buyer.buyerPhone}
                          className="input w-full pt-0 leading-tight h-6 bg-primary text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => setEditBuyer((prev) => !prev)}>
                      <XCircleFillIcon size={15} />
                    </button>
                    <button className="mt-1" onClick={saveBuyer}>
                      <ArchiveIcon size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <hr className="bg-white w-full h-px my-3" />
          <div className="mb-4">
            <h1 className="font-bold text-md my-2">Alerts</h1>
            <Alerts alerts={alerts} />
          </div>
          
          <div className="flex justify-center">
            <button className='btn btn-content text-white' onClick={handleEditProducts}>Edit Products</button>
          </div>
          {editProducts && (
            <EditOrderedProductsForm onClose={ () => setEditProducts(false)} productslist={products} orderid={_id}/>
          )}
          <div>
            <h1 className="font-bold text-md my-2">Status</h1>
            <div className="flex flex-row justify-evenly">
              {statustypes.map((item) => (
                <button
                  type="button"
                  className={`btn text-white text-xs p-1 border-none ${
                    item.color
                  } ${status === item.name ? "opacity-50 cursor-not-allowed" : ""}`}
                  key={item.name}
                  onClick={() => {
                    if (!(item.name === status)) {
                      setEditStatus((prev) => !prev);
                      setStatusName(item.name);
                    }
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
            {editStatus && (
              <div className="w-full flex justify-center items-center flex-col mt-2">
                <p className="text-xs">Change Status to {statusname}</p>
                <div>
                  <button className="text-xs text-white p-1 mr-3" onClick={() => setEditStatus((prev) => !prev)}>
                    <XCircleFillIcon />
                  </button>
                  <button className="text-xs text-white p-1" onClick={saveStatus}>
                    <ArchiveIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
          <hr className="bg-white w-full h-px my-3" />
          <div>
            <h1 className="font-bold text-md my-2">Timeline</h1>
            <Timeline data={timeline} />
          </div>
          <hr className="bg-white w-full h-px my-3" />
          <div className="mb-4">
            <h4 className="text-md font-semibold">Tracking Information</h4>
            <div className="flex items-center justify-between mb-2">
              {!editTracking && (
                <>
                  <div>
                    <p className="text-sm">Courier: {courier.name}</p>
                    <p className="text-sm">Tracking Number: {trackingNumber}</p>
                  </div>
                  <button className="text-white" onClick={() => setEditTracking((prev) => !prev)}>
                    <PencilIcon size={16} />
                  </button>
                </>
              )}
              {editTracking && (
                <>
                  <div className="w-full pr-3">
                    <div className="space-y-2">
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Courier: </p>
                        <select
                          id="couriers"
                          className="input leading-none h-5 text-xs bg-primary w-full"
                          defaultValue={courier._id}
                          onChange={(e) => setCourierName(e.target.value)}
                        >
                          <option disabled value="">
                            Select a Courier
                          </option>
                          {couriers.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Tracking Number: </p>
                        <input
                          type="text"
                          onChange={(e) => setTrackingNum(e.target.value)}
                          defaultValue={trackingNumber}
                          className="input pt-0 leading-tight h-6 bg-primary text-xs flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => setEditTracking((prev) => !prev)}>
                      <XCircleFillIcon size={15} />
                    </button>
                    <button className="mt-1" onClick={saveTrackingInfo}>
                      <ArchiveIcon size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold">Selling Platform</h4>
            <div className="flex items-center justify-between mb-2">
              {!editSellingPlatform && (
                <>
                  <div>
                    <p className="text-sm">Platform: {sellingPlatform.name}</p>
                  </div>
                  <button className="text-white" onClick={() => setEditSellingPlatform((prev) => !prev)}>
                    <PencilIcon size={16} />
                  </button>
                </>
              )}
              {editSellingPlatform && (
                <>
                  <div className="w-full pr-3">
                    <div className="space-y-2">
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Platform: </p>
                        <select
                          id="salesplatforms"
                          className="input leading-none h-5 text-xs bg-primary w-full"
                          defaultValue={sellingPlatform._id}
                          onChange={(e) => setSellingPlatformId(e.target.value)}
                        >
                          <option disabled value="">
                            Select a Selling Platform
                          </option>
                          {salesplatforms.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => setEditSellingPlatform((prev) => !prev)}>
                      <XCircleFillIcon size={15} />
                    </button>
                    <button className="mt-1" onClick={saveSellingPlatform}>
                      <ArchiveIcon size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold">Total Paid</h4>
            <div className="flex items-center justify-between mb-2">
              {!editTotalPaid && (
                <>
                  <p className="text-sm">Amount: ₱{totalPaidValue}</p>
                  <button className="text-white" onClick={() => setEditTotalPaid((prev) => !prev)}>
                    <PencilIcon size={16} />
                  </button>
                </>
              )}
              {editTotalPaid && (
                <>
                  <div className="w-full pr-3">
                    <div className="space-y-2">
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Amount: </p>
                        <input
                          type="number"
                          onChange={(e) => setTotalPaidValue(e.target.value)}
                          defaultValue={totalPaidValue}
                          className="input w-full pt-0 leading-tight h-6 bg-primary text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => setEditTotalPaid((prev) => !prev)}>
                      <XCircleFillIcon size={15} />
                    </button>
                    <button className="mt-1" onClick={saveTotalPaid}>
                      <ArchiveIcon size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold">Fees</h4>
            <div className="flex items-center justify-between mb-2">
              {!editFees && (
                <>
                  <p className="text-sm">Fees: ₱{feesValue}</p>
                  <button className="text-white" onClick={() => setEditFees((prev) => !prev)}>
                    <PencilIcon size={16} />
                  </button>
                </>
              )}
              {editFees && (
                <>
                  <div className="w-full pr-3">
                    <div className="space-y-2">
                      <div className="flex flex-row">
                        <p className="text-sm pr-2">Fees: </p>
                        <input
                          type="number"
                          onChange={(e) => setFeesValue(e.target.value)}
                          defaultValue={feesValue}
                          className="input w-full pt-0 leading-tight h-6 bg-primary text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => setEditFees((prev) => !prev)}>
                      <XCircleFillIcon size={15} />
                    </button>
                    <button className="mt-1" onClick={saveFees}>
                      <ArchiveIcon size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <hr className="bg-white w-full h-px my-3" />
            <div>
              <h1 className="text-md font-semibold mb-2">Notes</h1>
              <div className="relative">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  disabled={!editNotes}
                  className="h-15 rounded-lg bg-primary bg-opacity-50 w-full p-2 resize-none"
                />
                <div className="absolute right-1 top-1 cursor-pointer">
                  {!editNotes && (
                    <div onClick={() => setEditNotes((prev) => !prev)}>
                      <PencilIcon size={15} />
                    </div>
                  )}
                  {editNotes && (
                    <>
                      <div
                        className={`${editNotes ? "opacity-100" : "opacity-0"}`}
                        onClick={() => setEditNotes((prev) => !prev)}
                      >
                        <XCircleFillIcon size={15} />
                      </div>
                      <div
                        className={`${editNotes ? "opacity-100" : "opacity-0"}`}
                        onClick={saveNotes}
                      >
                        <ArchiveIcon size={15} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-error flex justify-center">{error}</p>
            <div className="mt-4 tooltip tooltip-right" data-tip="Delete Order Record">
              <button className="p-1" onClick={handleDelete}>
                <TrashIcon className="text-error" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderForm;

const Alerts = ({ alerts }) => {
  const getIcon = (alertType) => {
    switch (alertType) {
      case 'Warning':
        return <StopIcon size={16} className="text-warning" />;
      case 'Notification':
        return <BellIcon size={16} className="text-success" />;
      case 'Alert':
        return <AlertIcon size={16} className="text-error" />;
      default:
        return <QuestionIcon size={16} className="text-white"/>;
    }
  };

  return (
    <div className="space-y-2">
      {alerts.map((alert, index) => (
        <div key={index} className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
          <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
            {getIcon(alert.alertType)}
          </div>
          <div className="ml-3 flex flex-col text-xs">
            <div className="font-bold">{alert.alertType}</div>
            <div>{alert.message}</div>
          </div>
        </div>
      ))}
      {alerts.length === 0 ? (
      <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
        <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
          {getIcon("null")}
        </div>
        <div className="ml-3 flex flex-col text-xs">
          <div className="font-bold">None</div>
          <div>Nothing to see here</div>
        </div>
      </div>
    ) : (<></>)}
    </div>
  );
};


const Timeline = ({ data }) => {
  data = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <ol className="relative mb-3">
      {data.map((item, index) => (
        <div key={index}>
          <li className="ms-4 flex items-center">
            <div className="flex items-center absolute w-4 h-4 rounded-full -start-[0.425rem]">
              <CheckCircleFillIcon size={16} className="text-success" />
            </div>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col">
                <div className="font-bold">{item.status}</div>
                <div className="text-xs">{item.details}</div>
              </div>
              <div>
                <div className="font-medium text-sm">{formatTimestamp(item.timestamp)}</div>
              </div>
            </div>
          </li>
          {index < data.length - 1 && <li className="border-s h-8 -mt-1.5" />}
        </div>
      ))}
    </ol>
  );
};

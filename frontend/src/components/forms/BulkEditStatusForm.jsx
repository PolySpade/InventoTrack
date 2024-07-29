import { useContext, useState } from "react";
import axios from "axios";
import { OrdersContext } from "../../contexts";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const BulkEditStatusForm = ({ onClose, checkedItems }) => {
  const { statustypes, refreshData, ordersData } = useContext(OrdersContext);
  const API_URL =import.meta.env.VITE_API_URL;
  const [status, setStatus] = useState("");
  let user_email, user_role;
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };

  const authUser = useAuthUser();
  if (authUser) {
    user_email = authUser.email;
    user_role = authUser.role_id;
  } else {
    user_email = "N/A";
    user_role = "N/A";
  }
  const handleSave = async () => {


    const statusType = statustypes.find((stats) => stats.name === status);
    const data = {
      status: statusType.name,
      timeline: [statusType.timeline],
    };

    checkedItems.map(async (item) => {
      try {
        const order_id = ordersData.find(ord => ord._id === item).id
        const history_data = {
          timestamp: new Date().toISOString(),
          role: user_role,
          email: user_email,
          action: `Change the Status of order ID: ${order_id} to ${statusType.name}`
        }
        const response = await axios.put(
          `${API_URL}/orders/EditStatus/${item}`,
          data, { headers }
        );
        const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      
        refreshData();
        onClose();
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <div className="fixed inset-4 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 z-0"
        onClick={onClose}
      ></div>
      <div className="p-6 flex flex-col bg-neutral z-10">
        <h1 className="text-white"> Bulk Edit Order Status</h1>
        <select
          id="couriers"
          className="input input-bordered text-white"
          defaultValue=""
          onChange={(e) => setStatus(e.target.value)}
        >
          <option disabled value="">
            Select a Status
          </option>
          {statustypes.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="pt-4 flex flex-row justify-around">
          <button onClick={onClose} className="btn text-white">
            Cancel
          </button>
          <button className="btn text-white" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkEditStatusForm;

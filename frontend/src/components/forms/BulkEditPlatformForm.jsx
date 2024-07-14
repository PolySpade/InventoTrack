import { useContext, useState } from 'react';
import axios from 'axios';
import { OrdersContext } from '../../contexts';


const BulkEditPlatformForm = ({ onClose, checkedItems}) => {
    const {salesplatforms, refreshData} = useContext(OrdersContext);
    const API_URL = import.meta.env.VITE_API_URL;
    const [platform, setPlatform] = useState("")
    const handleSave = async () => {
        const data ={
            sellingPlatform: platform
        };
        checkedItems.map( async (item) => {
            try {
                const response = await axios.put(`${API_URL}/orders/EditPlatform/${item}`, data);
                refreshData();
                onClose();
              } catch (err) {
                console.log(err);
            }
        });
    };
    return (
        <div className="fixed inset-4 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={onClose}></div>
            <div className="p-6 flex flex-col bg-neutral z-10">
                <h1 className='text-white'> Bulk Edit Order Platform</h1>
                <select id="couriers" className="input input-bordered text-white" defaultValue="" onChange={(e) => setPlatform(e.target.value)}>
          <option disabled value="">Select a Platform</option>
          {salesplatforms.map((item) => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
        <div className="pt-4 flex flex-row justify-around">
    <button onClick={onClose} className="btn text-white">Cancel</button>
    <button className="btn text-white" onClick={handleSave}>Save</button>
  </div>
            </div>

        </div>
      )
}

export default BulkEditPlatformForm
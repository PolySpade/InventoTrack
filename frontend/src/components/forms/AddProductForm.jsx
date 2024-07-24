import { useContext, useState } from 'react';
import { InventoryContext } from '../../contexts';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const AddProductForm = ({ onClose }) => {
  const { category, warehouse, refreshData } = useContext(InventoryContext);
  const API_URL =process.env.VITE_API_URL; 
  const [error, setError] = useState("");
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  
  let user_email, user_role;
  const authUser = useAuthUser()
  if(authUser){
    user_email = authUser.email;
    user_role = authUser.role_id;
  }else{
    user_email = "N/A"
    user_role = ""
  }



  const validateForm = (data) => {
    if (!data.sku || !data.name || !data.category || !data.unitCost || !data.warehouse || !data.stockLeft) {
      return "All required fields must be filled.";
    }

    if (Number(data.unitCost) < 0 || Number(data.stockLeft) < 0 || Number(data.weightKG) < 0 ||
      Number(data.dimensions.lengthCM) < 0 || Number(data.dimensions.widthCM) < 0 || Number(data.dimensions.heightCM) < 0) {
      return "Numeric values must be non-negative.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);


    const data = {
      sku: formData.get('sku'),
      name: formData.get('product_name'),
      category: formData.get('category'),
      unitCost: formData.get('unit_cost'),
      weightKG: formData.get('weight') || 0,
      warehouse: formData.get('warehouse'),
      dimensions: {
        lengthCM: formData.get('length') || 0,
        widthCM: formData.get('width') || 0,
        heightCM: formData.get('height') || 0
      },
      stockLeft: formData.get('quantity'),
      shown: true
    };

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Added a Product: ${formData.get('sku')}`
    }


    const validationError = validateForm(data);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/products/AddProduct`, data, { headers });
      refreshData();
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      onClose();
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError(error.response.data.message);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className='overflow-y-auto min-w-full bg-neutral rounded shadow-lg text-white'>
      <form onSubmit={handleSubmit} method='get' className='p-6 flex flex-col min-w-full'>
        <h1 className='p-3 text-xl font-semibold'>Add Products</h1>
        <div className='flex flex-row'>
          <div className='flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='product_name'>Product Name *</label>
              <input id="product_name" name="product_name" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='category'>Category *</label>
              <select id="category" name="category" className="input input-bordered w-full max-w-xs" required>
                <option disabled selected value="">Select a category</option>
                {category.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='warehouse'>Warehouse *</label>
              <select id="warehouse" name="warehouse" className="input input-bordered w-full max-w-xs" required>
                <option disabled selected value="">Select a warehouse</option>
                {warehouse.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
          </div>

          <div className='ml-2 flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='sku'>SKU *</label>
              <input id="sku" name="sku" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='unit_cost'>Unit Cost *</label>
              <input id="unit_cost" name="unit_cost" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" min="0" step="0.01" required />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='quantity'>Stock Quantity *</label>
              <input id="quantity" name="quantity" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" min="0" required />
            </div>
          </div>
        </div>

        <hr className='bg-white w-full h-px my-2'></hr>
        <h2 className='text-base'>Product Details</h2>
        <div className='my-2 flex flex-col justify-start'>
          <div className='flex flex-col'>
            <label className='text-xs min-w-full' htmlFor='weight'>Weight</label>
            <input id="weight" name="weight" type="number" placeholder="Type here" className="input input-bordered w-full" min="0" step="0.01" />
          </div>
          <div className='my-2 flex flex-row max-w-96 justify-evenly min-w-full'>
            <div className='flex flex-col mr-2'>
              <label className='text-xs' htmlFor='length'>Length</label>
              <input id="length" name="length" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" min="0" step="0.01" />
            </div>
            <div className='flex flex-col mx-2'>
              <label className='text-xs' htmlFor='width'>Width</label>
              <input id="width" name="width" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" min="0" step="0.01" />
            </div>
            <div className='flex flex-col ml-2'>
              <label className='text-xs' htmlFor='height'>Height</label>
              <input id="height" name="height" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" min="0" step="0.01" />
            </div>
          </div>
        </div>

        <div className='pt-4 flex flex-row justify-around'>
          <button type="button" onClick={handleCancel} className='btn text-white'>Cancel</button>
          <button type="submit" className='btn text-white'>Publish</button>
        </div>
        {error && <p className='flex justify-center text-error'>{error}</p>}
      </form>
    </div>
  );
};

export default AddProductForm;

import { useContext } from 'react';
import { InventoryContext } from '../../contexts';
import axios from 'axios'; // Make sure to import axios

const AddProductForm = ({ onClose }) => {
  const { category, warehouse } = useContext(InventoryContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      sku: formData.get('sku'),
      name: formData.get('product_name'),
      category: formData.get('category'),
      unitCost: formData.get('unit_cost'),
      weightKG: formData.get('weight'),
      warehouse: formData.get('warehouse'),
      dimensions: {
        lengthCM: formData.get('length'),
        widthCM: formData.get('width'),
        heightCM: formData.get('height')
      },
      stockLeft: formData.get('quantity')
    };

    console.log(data);
    try {
      await axios.post(`${API_URL}/products/AddProduct`, data);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Optionally handle the error here, e.g., show an error message to the user
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
              <label className='text-xs' htmlFor='product_name'>Product Name</label>
              <input id="product_name" name="product_name" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='category'>Category</label>
              <select id="category" name="category" className="input input-bordered w-full max-w-xs">
                <option disabled selected value="">Select a category</option>
                {category.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='warehouse'>Warehouse</label>
              <select id="warehouse" name="warehouse" className="input input-bordered w-full max-w-xs">
                <option disabled selected value="">Select a warehouse</option>
                {warehouse.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
          </div>

          <div className='ml-2 flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='sku'>SKU</label>
              <input id="sku" name="sku" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='unit_cost'>Unit Cost</label>
              <input id="unit_cost" name="unit_cost" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' htmlFor='quantity'>Stock Quantity</label>
              <input id="quantity" name="quantity" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
        </div>

        <hr className='bg-white w-full h-px my-2'></hr>
        <h2 className='text-base'>Product Details</h2>
        <div className='my-2 flex flex-col justify-start'>
          <div className='flex flex-col'>
            <label className='text-xs min-w-full' htmlFor='weight'>Weight</label>
            <input id="weight" name="weight" type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className='my-2 flex flex-row max-w-96 justify-evenly min-w-full'>
            <div className='flex flex-col mr-2'>
              <label className='text-xs' htmlFor='length'>Length</label>
              <input id="length" name="length" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex flex-col mx-2'>
              <label className='text-xs' htmlFor='width'>Width</label>
              <input id="width" name="width" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className='flex flex-col ml-2'>
              <label className='text-xs' htmlFor='height'>Height</label>
              <input id="height" name="height" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
          </div>
        </div>

        <div className='pt-4 flex flex-row justify-around'>
          <button type="button" onClick={handleCancel} className='btn text-white'>Cancel</button>
          <button type="submit" className='btn text-white'>Publish</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

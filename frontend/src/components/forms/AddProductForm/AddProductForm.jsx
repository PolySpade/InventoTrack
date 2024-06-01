import React from 'react'
import { useNavigate } from 'react-router-dom';


const AddProductForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // event.preventDefault();
    
    console.log("Add Product Form submitted");
    navigate('/inventory');
  };


  return (
    <div onSubmit={handleSubmit} className='min-w-96 bg-neutral rounded shadow-lg text-white'>
        <form className='p-4 flex flex-col min-w-full'>
          
          <h1 className='p-3 text-xl font-semibold'>Add Products</h1>
          <div className='flex flex-row'>


          <div className='mx-3 flex flex-col justify-start'>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' for='productname'>Product Name</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
                  <label className='text-xs' htmlFor='category'>Category</label>
                  <select id="category" className="input input-bordered input-base w-full max-w-xs">
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                  </select>
            </div>
            <div className='my-2 flex flex-col'>
                  <label className='text-xs' htmlFor='category'>Category</label>
                  <select id="category" className="input input-bordered input-base w-full max-w-xs">
                    <option value="">Select a warehouse</option>
                    <option value="electronics">Warehouse A</option>
                  </select>
            </div>
          </div>

          {/* 
          product name
          category
          weight
          warehouse
          
          sku  
          unit cost
          stock quantity
          
          product dimensions, l w h

          */}
          
          <div className='mx-3 flex flex-col justify-start'>
            <div className=' my-2 flex flex-col'>
              <label className='text-xs' for='productname'>SKU</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' for='productname'>Unit Cost</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
            <div className='my-2 flex flex-col'>
              <label className='text-xs' for='productname'>Stock Quantity</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
          </div>

          
          
          </div>
          <hr className='bg-white w-full h-px my-2'></hr>
          <h2 className='mx-3 text-base'>Product Details</h2>
          <div className='mx-3 my-2 flex flex-col justify-start'>
            <div className='flex flex-col'>
              <label className='text-xs min-w-full' for='productname'>Weight</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full" />
            </div>
            <div className='my-2 flex flex-row max-w-96 justify-evenly min-w-full'>
            <div className='flex flex-col mr-2'>
              <label className='text-xs' for='productname'>Length</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
            <div className='flex flex-col mx-2'>
              <label className='text-xs' for='productname'>Width</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
            <div className='flex flex-col ml-2'>
              <label className='text-xs' for='productname'>Height</label>
              <input id="productname" type="text" placeholder="Type here" className="input input-bordered input-base w-full max-w-xs" />
            </div>
            </div>
          </div>
          


          <div className='pt-4 flex flex-row justify-around'>
            <button className='btn text-white'>Cancel</button>
            <button className='btn text-white'>Publish</button>
          </div>
        </form>
    </div>
  )
}

export default AddProductForm
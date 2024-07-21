import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SuppliersContext } from '../../contexts';
import { XIcon, PlusIcon, TrashIcon } from '@primer/octicons-react';

const AddSupplierForm = ({ onClose }) => {
  const { refreshData } = useContext(SuppliersContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const [supplierName, setSupplierName] = useState('');
  const [website, setWebsite] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [productList, setProductList] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [error, setError] = useState('');

  const handleAddProduct = () => {
    setProductList([...productList, { sku: '', name: '', price: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = productList.filter((_, i) => i !== index);
    setProductList(newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = productList.map((product, i) => {
      if (i === index) {
        return { ...product, [field]: value };
      }
      return product;
    });
    setProductList(newProducts);
  };
  console.log(productList)
  const handleSave = async () => {
    const data = {
      supplierName,
      website,
      phoneNo,
      productList,
    };
    
    if (supplierName === '') {
        setError('Supplier Name must not be blank');
        return;
    }

    if(productList){
        if (productList.some(item => item.sku === '' || item.name === '')) {
            setError('Products SKU / Name must not be blank');
            return;
          }
          if (productList.some(item => item.price < 0)) {
            setError('Products Price must not be negative');
            return;
          }
    }
    
    try {
      const response = await axios.post(`${API_URL}/suppliers/RegisterSupplier`, data);
      console.log('Supplier Added:', response);
      refreshData();
      onClose();
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="fixed inset-4 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={onClose}></div>
      <div className="flex flex-col relative bg-base-100 bg-opacity-80 text-white rounded-l-lg shadow-lg z-10 max-w-6/12 h-full overflow-y-auto">
        <div className="bg-primary w-full p-6">
          <button onClick={onClose} className="absolute top-6 right-6 font-bold text-white">
            <XIcon size={20} />
          </button>
          <h2 className="text-xl font-bold mb-2">Add Supplier</h2>
        </div>
        <div className="w-full p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm">Supplier Name</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
              />
            </div>
            <div>
              <label className="text-sm">Website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
              />
            </div>
            <div>
              <label className="text-sm">Phone Number</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
              />
            </div>
            <div className="flex justify-between items-center space-x-4">
              <button className="btn text-white bg-secondary border-none" onClick={() => setShowProducts((prev) => !prev)}>
                {showProducts ? 'Hide Products' : 'Show Products'}
              </button>
              <button className="btn text-white bg-secondary border-none" onClick={handleSave}>
                Add Supplier
              </button>
            </div>
            <p className='text-xs text-error justify-center flex'>{error}</p>
          </div>
          {showProducts && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Product List</h4>
              <table className="table w-full">
                <thead className="text-white">
                  <tr className="border-opacity-50">
                    <th className='w-14'>Product SKU</th>
                    <th>Product Name</th>
                    <th className='w-1/4'>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product, index) => (
                    <tr key={index} className="border-none">
                      <td>
                        <input
                          type="text"
                          value={product.sku}
                          onChange={(e) => handleProductChange(index, 'sku', e.target.value)}
                          className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                          className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                          className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
                        />
                      </td>
                      <td>
                        <button className="btn text-white bg-secondary border-none" onClick={() => handleRemoveProduct(index)}>
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn text-white bg-secondary border-none mt-4" onClick={handleAddProduct}>
                <PlusIcon size={16} /> Add Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSupplierForm;

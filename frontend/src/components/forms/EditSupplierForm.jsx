import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SuppliersContext } from '../../contexts';
import { XIcon, PencilIcon, ArchiveIcon, XCircleFillIcon, PlusIcon, TrashIcon } from '@primer/octicons-react';
import { formatTimestamp } from '../../utils';

const EditSupplierForm = ({ _id, supplierName, website, phoneNo, productList, onClose }) => {
  const { refreshData } = useContext(SuppliersContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const [editSupplierName, setEditSupplierName] = useState(supplierName);
  const [editWebsite, setEditWebsite] = useState(website);
  const [editPhoneNo, setEditPhoneNo] = useState(phoneNo);
  const [editProducts, setEditProducts] = useState(productList);
  const [showProducts, setShowProducts] = useState(false);

  const handleAddProduct = () => {
    setEditProducts([...editProducts, { sku: '', name: '', price: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = editProducts.filter((_, i) => i !== index);
    setEditProducts(newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = editProducts.map((product, i) => {
      if (i === index) {
        return { ...product, [field]: value };
      }
      return product;
    });
    setEditProducts(newProducts);
  };

  const handleSave = async () => {
    const data = {
      supplierName: editSupplierName,
      website: editWebsite,
      phoneNo: editPhoneNo,
      productList: editProducts,
    };

    try {
      const response = await axios.put(`${API_URL}/suppliers/EditSupplier/${_id}`, data);
      console.log('Supplier Updated:', response);
      refreshData();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try{
        const response = await axios.delete(`${API_URL}/suppliers/DeleteSupplier/${_id}`);
        refreshData();
        onClose();
    } catch( err){
        console.log(err)
    }
  }

  return (
    <div className="fixed inset-4 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={onClose}></div>
      <div className="flex flex-col relative bg-base-100 bg-opacity-80 text-white rounded-l-lg shadow-lg z-10 max-w-6/12 h-full overflow-y-auto">
        <div className="bg-primary w-full p-6">
          <button onClick={onClose} className="absolute top-6 right-6 font-bold text-white">
            <XIcon size={20} />
          </button>
          <h2 className="text-xl font-bold mb-2">Edit Supplier</h2>
        </div>
        <div className="w-full p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm">Supplier Name</label>
              <input
                type="text"
                value={editSupplierName}
                onChange={(e) => setEditSupplierName(e.target.value)}
                className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
              />
            </div>
            <div>
              <label className="text-sm">Website</label>
              <input
                type="text"
                value={editWebsite}
                onChange={(e) => setEditWebsite(e.target.value)}
                className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
              />
            </div>
            <div>
              <label className="text-sm">Phone Number</label>
              <input
                type="text"
                value={editPhoneNo}
                onChange={(e) => setEditPhoneNo(e.target.value)}
                className="input w-full pt-0 leading-tight h-8 bg-primary text-xs"
              />
            </div>
            <div className="flex justify-between items-center space-x-4">
              <button className="btn text-white bg-secondary border-none" onClick={() => setShowProducts((prev) => !prev)}>
                {showProducts ? 'Hide Products' : 'Show Products'}
              </button>
              <button className="btn text-white bg-secondary border-none" onClick={handleSave}>
                Save Changes
              </button>
              <button className="btn text-white bg-error border-none" onClick={handleDelete}>
                Delete Supplier
              </button>
            </div>
          </div>
          {showProducts && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Product List</h4>
              <table className="table w-full">
                <thead className="text-white">
                  <tr className="border-opacity-50">
                    <th className='  w-14'>Product SKU</th>
                    <th>Product Name</th>
                    <th className=' w-1/4' >Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editProducts.map((product, index) => (
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

export default EditSupplierForm;

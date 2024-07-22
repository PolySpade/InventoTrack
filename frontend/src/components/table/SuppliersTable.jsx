import React, { useState, useContext } from 'react';
import { SuppliersContext } from '../../contexts';
import { SearchIcon, KebabHorizontalIcon } from '@primer/octicons-react';
import EditSupplierForm from '../forms/EditSupplierForm';
import AddSupplierForm from '../forms/AddSupplierForm';

const ITEMS_PER_PAGE = 10;

const SuppliersTable = () => {
  const { suppliers } = useContext(SuppliersContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editSupplier, setEditSupplier] = useState(null);
  const [addSupplier, setAddSupplier] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phoneNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.productList.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  
  const totalPages = Math.ceil(filteredSuppliers.length / ITEMS_PER_PAGE);
  const currentItems = filteredSuppliers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditSupplier = (supplier) => {
    setEditSupplier(supplier);
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-96">
      <div className="flex items-center justify-center mb-4">
        <SearchIcon size={20} className="text-white mr-3" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered text-white bg-neutral w-full max-w-lg"
        />
      </div>
      <div className="flex justify-start flex-row mb-4">
        <button onClick={() => setAddSupplier(true)} className="btn text-white bg-secondary border-none">
          Add Supplier
        </button>
      </div>
      <table className="table w-full">
        <thead>
          <tr className="border-none text-white">
            <th>Supplier Name</th>
            <th>Website</th>
            <th>Phone Number</th>
            <th>Product List</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((supplier) => (
            <TableContents
              key={supplier._id}
              {...supplier}
              onEdit={() => handleEditSupplier(supplier)}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`join-item btn ${currentPage === i + 1 ? "btn-active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {editSupplier && (
        <EditSupplierForm
          {...editSupplier}
          onClose={() => setEditSupplier(null)}
        />
      )}
      {addSupplier && (
        <AddSupplierForm
          onClose={() => setAddSupplier(false)}
        />
      )}
    </div>
  );
};

export default SuppliersTable;

const TableContents = ({ _id, supplierName, website, phoneNo, productList, onEdit }) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <>
      <tr className="border-none text-white bg-base-content">
        <td>{supplierName}</td>
        <td>{website}</td>
        <td>{phoneNo}</td>
        <td>
          <button className="btn text-white" onClick={() => setShowProducts((prev) => !prev)}>
            {showProducts ? 'Hide List' : 'View List'}
          </button>
        </td>
        <td>
          <div className="relative inline-block text-left">
            <button onClick={onEdit} className="flex items-center justify-center p-2">
              <KebabHorizontalIcon className="rotate-90" />
            </button>
          </div>
        </td>
      </tr>
      {showProducts && (
        <tr className="border-none text-white bg-secondary">
          <td colSpan="5">
            <table className="table w-full">
              <thead className="text-white">
                <tr className="border-opacity-50">
                  <th>Product SKU</th>
                  <th>Product Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index} className="border-none">
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>₱{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

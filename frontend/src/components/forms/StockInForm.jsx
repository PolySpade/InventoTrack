import React from "react";

const StockInForm = ({ onClose }) => {
  const handleCancel = () => {
    onClose();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleCancel}
      ></div>
      <div className="p-6 rounded shadow-lg z-10">
        <div className="flex flex-col min-w-96 bg-neutral rounded shadow-lg text-white">
        <form
        onSubmit={handleSubmit}
        method="get"
        className="p-6 flex flex-row min-w-full"
        >
            <h1 className="text-xl font-semibold">Stock In</h1>



        </form>





        </div>








      </div>
    </div>
  );
};

export default StockInForm;


const SearchContents = ({ sku, name, isChecked, onCheckboxChange }) => {
    return (
      <tr>
        <td>{sku}</td>
        <td>{name}</td>
  
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              checked={isChecked}
              onChange={() => onCheckboxChange(sku)}
            />
          </label>
        </th>
      </tr>
    );
  };
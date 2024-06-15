import React from 'react';
import { expense_types, currency_types } from '../../constants';
import { getCurrentDate } from '../../utils';

const EditExpenseForm = ({ onClose }) => {
  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className='w-96 bg-neutral rounded-lg shadow-lg z-10 text-white'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center p-8 space-y-4'>
          <h1 className='text-lg pb-1 justify-center flex'>Edit Expense</h1>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='date'>Date</label>
            <input disabled id="date" type="text" placeholder={`MM/DD/YYYY`} defaultValue={`${getCurrentDate()}`} className=" input input-bordered w-full max-w-xs disabled:text-white" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='expense_types'>Type</label>
            <select id="expense_types" className="input input-bordered w-full max-w-xs">
              <option disabled selected value="">Select a Type</option>
              {expense_types.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='currency'>Currency</label>
            <select id="currency" className="input input-bordered w-full max-w-xs">
              <option disabled selected value="">Select a Currency</option>
              {currency_types.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='amount'>Amount</label>
            <input id="amount" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='description'>Short Description</label>
            <input id="description" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-row justify-evenly">
            <button type='button' onClick={handleCancel} className="btn text-white my-2">Cancel</button>
            <button type="submit" className="btn text-white my-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;

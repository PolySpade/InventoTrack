import { formatTimestampDay } from '../../utils';
import { ExpenseContext } from '../../contexts';
import { useContext, useState } from 'react';
import axios from 'axios';

const EditExpenseForm = ({ onClose, _id, timestamp, amount, expensestype, description }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { expenseTypes: expense_types, refreshData } = useContext(ExpenseContext);

  const [formValues, setFormValues] = useState({
    amount,
    expensestype,
    description
  });

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedExpense = {
      timestamp,
      amount: formValues.amount,
      expensestype: formValues.expensestype,
      description: formValues.description
    };

    try {
      const response = await axios.put(`${API_URL}/expenses/EditExpense/${_id}`, updatedExpense);
      if (response.status !== 200) {
        throw new Error('Failed to update expense');
      }
      console.log(response.data.message);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/expenses/DeleteExpense/${_id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete expense');
      }
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const formattedTimestamp = formatTimestampDay(timestamp);

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className='w-96 bg-neutral rounded-lg shadow-lg z-10 text-white'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center p-8 space-y-4'>
          <h1 className='text-lg pb-1 justify-center flex'>Edit Expense</h1>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='date'>Date</label>
            <input id="date" type="text" value={formattedTimestamp} disabled className="input input-bordered w-full max-w-xs disabled:text-white" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='expense_types'>Type</label>
            <select id="expense_types" name="expensestype" value={formValues.expensestype._id} onChange={handleChange} className="input input-bordered w-full max-w-xs">
              <option disabled value="">Select a Type</option>
              {expense_types.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='amount'>Amount</label>
            <input id="amount" name="amount" type="number" value={formValues.amount} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='description'>Short Description</label>
            <input id="description" name="description" type="text" value={formValues.description} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-row justify-evenly">
            <button type='button' onClick={handleCancel} className="btn text-white my-2">Cancel</button>
            <button type="submit" className="btn text-white my-2">Save</button>
            <button type="button" onClick={handleDelete} className='btn text-white my-2 bg-error hover:bg-red-400 outline-none border-none'>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;

import { getCurrentDate } from '../../utils';
import axios from 'axios';
import { ExpenseContext } from '../../contexts';
import { useContext } from 'react';

const AddExpenseForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { expenseTypes: expense_types, refreshData } = useContext(ExpenseContext);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      timestamp: formData.get('date'),
      amount: formData.get('amount'),
      expensestype: formData.get('expense_types'),
      description: formData.get('description')
    };
    try {
      await axios.post(`${API_URL}/expenses/CreateExpense`, data);
      refreshData();
      onClose();
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
      <form onSubmit={handleSubmit} method='get' className='p-6 flex flex-col min-w-full w-96'>
        <h1 className='p-3 text-xl font-semibold'>Add Expenses</h1>
        <div className='p-1 flex flex-col'>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='date'>Date</label>
            <input id="date" name="date" type="text" placeholder={`MM/DD/YYYY`} defaultValue={`${getCurrentDate()}`} className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='expense_types'>Type</label>
            <select id="expense_types" name="expense_types" className="input input-bordered w-full max-w-xs" defaultValue="">
              <option disabled value="">Select a Type</option>
              {expense_types.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
          </div>  
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='amount'>Amount</label>
            <input id="amount" name="amount" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='description'>Short Description</label>
            <input id="description" name="description" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
        </div>

        <div className='pt-4 flex flex-row justify-around'>
          <button type="button" onClick={handleCancel} className='btn text-white'>Cancel</button>
          <button type="submit" className='btn text-white'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;

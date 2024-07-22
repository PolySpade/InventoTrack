import { getCurrentDate } from '../../utils';
import axios from 'axios';
import { ExpenseContext } from '../../contexts';
import { useContext, useState } from 'react';

const AddExpenseForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { expenseTypes: expense_types, refreshData } = useContext(ExpenseContext);
  const [error,setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const numAmount = parseFloat(formData.get('amount'))
    console.log(formData.get('expense_types'))
    if(formData.get('expense_types') === null){
      setError("Set An Expense Type");
      return
    }


    if (formData.get('amount') === "") {
      setError("Input Amount");
      return;
    }
  
    if (isNaN(numAmount)) {
      setError("Amount must be a number");
      return;
    }
  
    if (numAmount < 0) {
      setError("Input a Non-Negative Number");
      return;
    }

    if(formData.get('description') === ""){
      setError("Input a short description")
      return
    }


    const data = {
      timestamp: formData.get('date'),
      amount: numAmount,
      expensestype: formData.get('expense_types'),
      description: formData.get('description')
    };
    try {
      await axios.post(`${API_URL}/expenses/CreateExpense`, data);
      refreshData();
      onClose();
    } catch (error) {
      setError(error.response.data.message)
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
        {error && (<p className='flex justify-center text-sm text-error'>{error}</p>)}
      </form>
    </div>
  );
};

export default AddExpenseForm;

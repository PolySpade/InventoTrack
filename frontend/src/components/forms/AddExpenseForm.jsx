import { expense_types, currency_types } from '../../constants';
import { getCurrentDate } from '../../utils';

const AddExpenseForm = ({ onClose }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    onClose();
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
            <input id="date" type="text" placeholder={`MM/DD/YYYY`} defaultValue={`${getCurrentDate()}`} className="input input-bordered w-full max-w-xs" />
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
            <input id="amount" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='my-2 flex flex-col'>
            <label className='text-xs' htmlFor='description'>Short Description</label>
            <input id="description" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
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

import { formatTimestampDay } from "../../utils";
import { ExpenseContext } from "../../contexts";
import { useContext, useState } from "react";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const EditExpenseForm = ({
  onClose,
  _id,
  timestamp,
  amount,
  expensestype,
  description,
}) => {
  const API_URL =import.meta.env.VITE_API_URL;
  const { expenseTypes: expense_types, refreshData } =
    useContext(ExpenseContext);
  const [error, setError] = useState("");
  let user_email, user_role;
  const authUser = useAuthUser();
  if (authUser) {
    user_email = authUser.email;
    user_role = authUser.role_id;
  } else {
    user_email = "N/A";
    user_role = "N/A";
  }
  const authHeader = useAuthHeader();
  const headers = {
      Authorization: authHeader,
  };
  const [formValues, setFormValues] = useState({
    amount,
    expensestype,
    description,
  });

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formValues.amount === "") {
      setError("Input Amount");
      return;
    }

    if (isNaN(formValues.amount)) {
      setError("Amount must be a number");
      return;
    }

    if (parseFloat(formValues.amount) < 0) {
      setError("Input a Non-Negative Number");
      return;
    }

    if (formValues.description === "") {
      setError("Short Description must not be blank");
      return;
    }

    const updatedExpense = {
      timestamp,
      amount: formValues.amount,
      expensestype: formValues.expensestype._id,
      description: formValues.description,
    };
    console.log(updatedExpense.expensestype)
    const oldexpensetype = expense_types.find(exp => exp._id === expensestype._id).name
    const newexpensetype = formValues.expensestype.name
    
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Edited an Expense, from ${amount}-${oldexpensetype} to ${formValues.amount}-${newexpensetype}`
    }


    try {
      const response = await axios.put(
        `${API_URL}/expenses/EditExpense/${_id}`,
        updatedExpense, { headers }
      );
      if (response.status !== 200) {
        throw new Error("Failed to update expense");
      }
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
      console.log(response.data.message);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    const oldexpensetype = expense_types.find(exp => exp._id === expensestype._id).name 
    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted an Expense: ${amount}-${oldexpensetype}`
    }
    try {
      const response = await axios.delete(
        `${API_URL}/expenses/DeleteExpense/${_id}`, { headers }
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete expense");
      }
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data, { headers });
   
      console.log(response.data.message);
      refreshData();
    } catch (error) {
      console.error(error.message);
      setError(error.response.data.message);
    }
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const formattedTimestamp = formatTimestampDay(timestamp);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-96 bg-neutral rounded-lg shadow-lg z-10 text-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center p-8 space-y-4"
        >
          <h1 className="text-lg pb-1 justify-center flex">Edit Expense</h1>
          <div className="my-2 flex flex-col">
            <label className="text-xs" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="text"
              value={formattedTimestamp}
              disabled
              className="input input-bordered w-full max-w-xs disabled:text-white"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label className="text-xs" htmlFor="expense_types">
              Type
            </label>
            <select
              id="expense_types"
              name="expensestype"
              value={formValues.expensestype._id}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            >
              <option disabled value="">
                Select a Type
              </option>
              {expense_types.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2 flex flex-col">
            <label className="text-xs" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formValues.amount}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label className="text-xs" htmlFor="description">
              Short Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formValues.description}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row justify-evenly">
            <button
              type="button"
              onClick={handleCancel}
              className="btn text-white my-2"
            >
              Cancel
            </button>
            <button type="submit" className="btn text-white my-2">
              Save
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById("my_modal_1").showModal()
              }
              className="btn text-white my-2 bg-error hover:bg-red-400 outline-none border-none"
            >
              Delete
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-left">Warning!</h3>
                <p className="py-4 pb-0 text-left">
                  This action will delete an expense!
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn bg-error text-white border-none">
                      Cancel
                    </button>
                  </form>
                  <button
                    className="btn text-white border-none"
                    onClick={handleDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </dialog>
          </div>
          {error && (
            <p className="flex justify-center text-sm text-error">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;

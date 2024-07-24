import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import axios from "axios";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ExpenseTypeForm = ({ onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { expensesData, expenseTypes, refreshData } =
    useContext(PreferencesContext);
  const [selectedExpense, setSelectedExpense] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [newExpense, setNewExpense] = useState("");
  const [error, setError] = useState("");

  const selectedExpenseType = expenseTypes.find(
    (item) => item._id === selectedExpense
  );

  let user_email, user_role;
  const authUser = useAuthUser();
  if (authUser) {
    user_email = authUser.email;
    user_role = authUser.role_id;
  } else {
    user_email = "N/A";
    user_role = "N/A";
  }

  const setEdit = () => {
    if (selectedExpense) {
      setEditMode((prev) => !prev);
      const olddata = expenseTypes.find(exp => exp._id === selectedExpense).name
      setNewExpense(olddata);
    }
    setError("");
  };

  const setAdd = () => {
    setAddMode((prev) => !prev);
    setError("");
  };

  const handleEdit = async () => {
    const data = {
      name: newExpense,
    };

    if (!newExpense) {
      setError("Input is Blank");
      return;
    }

    const isInExpensesType = expenseTypes.some(
      (expense) => expense.name === newExpense
    );

    if (isInExpensesType) {
      setError("Existing Expense Type");
      return;
    }
    const _id = selectedExpenseType._id;
    const oldexpense = expenseTypes.find(exp => exp._id === _id).name

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Edited an Expense Type: ${oldexpense} to ${newExpense}`
    }


    try {
      const response = await axios.put(
        `${API_URL}/expensesTypes/EditExpensesType/${_id}`,
        data
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      
  
      refreshData();
      onClose();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    const _id = selectedExpenseType._id;

    const isInExpensesData = expensesData.some(
      (expense) => expense.expensestype._id === _id
    );

    if (isInExpensesData) {
      setError(
        "Cannot delete this expense type because it is associated with existing expenses."
      );
      return;
    }

    const oldexpense = expenseTypes.find(exp => exp._id === _id).name

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Deleted an Expense Type: ${oldexpense}`
    }

    try {
      const response = await axios.delete(
        `${API_URL}/expensesTypes/DeleteExpensesType/${_id}`
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAdd = async () => {
    if (!newExpense) {
      setError("Input is Blank");
      return;
    }
    const data = {
      name: newExpense,
    };
    const isInExpensesType = expenseTypes.some(
      (expense) => expense.name === newExpense
    );

    if (isInExpensesType) {
      setError("Existing Expense Type");
      return;
    }

    const history_data = {
      timestamp: new Date().toISOString(),
      role: user_role,
      email: user_email,
      action: `Added an Expense: ${newExpense}`
    }

    try {
      const response = await axios.post(
        `${API_URL}/expensesTypes/CreateExpensesType`,
        data
      );
      const history_response = await axios.post(`${API_URL}/histories/CreateHistory`, history_data);
      refreshData();
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-20 w-96 bg-neutral py-4 px-5">
        {!editMode && !addMode && (
          <div>
            <div className="text-white mb-7">
              <label className="text-xs" htmlFor="expenses">
                Expense Types
              </label>
              <select
                id="expenses"
                className="input input-bordered w-full"
                onChange={(e) => setSelectedExpense(e.target.value)}
                value={selectedExpense}
              >
                <option disabled value="">
                  Select Expense Type
                </option>

                {expenseTypes.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-evenly">
              <button className="btn text-white" onClick={onClose}>
                Cancel
              </button>
              <button className="btn text-white" onClick={setEdit}>
                Edit
              </button>
              <button className="btn text-white" onClick={setAdd}>
                Add
              </button>
            </div>
          </div>
        )}
        {editMode && selectedExpenseType && (
          <div className="text-white">
            <input
              id={selectedExpenseType._id}
              defaultValue={selectedExpenseType.name}
              className="input input-bordered w-full"
              onChange={(e) => setNewExpense(e.target.value)}
            />
            <div className="flex justify-evenly mt-5">
              <button className="btn text-white" onClick={setEdit}>
                Cancel
              </button>
              <button className="btn text-white" onClick={handleEdit}>
                Save
              </button>
              <button
                className="btn text-white bg-error border-none"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Delete
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-left">Warning!</h3>
                  <p className="py-4 pb-0 text-left">
                    This action will delete an expense type!
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
                  <p className="text-sm text-error flex justify-center mt-2">
                    {error}
                  </p>
                </div>
              </dialog>
            </div>
            <p className="text-sm text-error flex justify-center mt-2">
              {error}
            </p>
          </div>
        )}
        {addMode && (
          <div className="text-white">
            <input
              className="input input-bordered w-full"
              onChange={(e) => setNewExpense(e.target.value)}
              placeholder="Input your new Expense Type"
            />
            <div className="flex justify-evenly mt-5">
              <button className="btn text-white" onClick={setAdd}>
                Cancel
              </button>
              <button className="btn text-white" onClick={handleAdd}>
                Publish
              </button>
            </div>
            <p className="text-sm text-error flex justify-center mt-2">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTypeForm;

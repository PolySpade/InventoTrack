import { createContext, useEffect, useState } from 'react';
import ExpensesTable from '../components/table/ExpensesTable';
import axios from "axios";
import { ExpenseContext } from '../contexts';

const Expenses = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);

  const getExpenseTypes = () => {
    axios.get(`${API_URL}/expensesTypes/`)
      .then( (response) => {
        setExpenseTypes(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }

  const getExpenses = () => {
    axios.get(`${API_URL}/expenses/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const refreshData = () => {
    getExpenses();
    getExpenseTypes();
  }
  useEffect(() => {
    refreshData();
  }, []);



  return (
    <ExpenseContext.Provider value={{ data ,expenseTypes, refreshData}}>
      <div className='flex flex-row justify-center items-center'>
        <div className='m-10 w-full'>
          <ExpensesTable />
        </div>
      </div>
    </ExpenseContext.Provider>
  );
};

export default Expenses;

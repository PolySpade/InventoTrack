import React, { createContext, useEffect, useState } from 'react';
import ExpensesTable from '../components/table/ExpensesTable';
import axios from "axios";

export const ExpenseContext = createContext();

const Expenses = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [currencies,setCurrencies] = useState([]);


  const getCurrencies = () => {
    axios.get(`${API_URL}/currencies/`)
      .then( (response) => {
        setCurrencies(response.data);
      }).catch( (err) => {
        console.log(err);
      })
  }

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

  useEffect(() => {
    getCurrencies();
    getExpenses();
    getExpenseTypes();
  }, []);

  return (
    <ExpenseContext.Provider value={{ data ,expenseTypes, currencies}}>
      <div className='flex flex-row justify-center items-center'>
        <div className='m-10 w-full'>
          <ExpensesTable />
        </div>
      </div>
    </ExpenseContext.Provider>
  );
};

export default Expenses;

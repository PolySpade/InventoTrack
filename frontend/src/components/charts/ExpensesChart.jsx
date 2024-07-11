import React, { useContext } from 'react'
import { ReportsContext } from '../../contexts'
import SmallChart from './SmallChart';

const ExpensesChart = ({timeFrame}) => {
    const {expensesData: datas} = useContext(ReportsContext);
  return (
    <SmallChart datas={datas} name='Expenses' timeFrame={timeFrame}>

    </SmallChart>
  )
}

export default ExpensesChart
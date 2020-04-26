import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Expense from './Expense';
import NewTransactionForm from './NewTransactionForm';
import {
  startAddExpense,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from './store/actions/expensesActions';
import './History.css';
import moment from 'moment';

const History = () => {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState('');
  const [mode, setMode] = useState('Income');

  const syncLocalStorage = () => {
    window.localStorage.setItem('expenses', JSON.stringify(expenses));
  };

  const expenses = useSelector((state) => state.expenses);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('expenses'));
    if (!data) {
      dispatch(startSetExpenses([], user.id));
    } else {
      dispatch(startSetExpenses(data, user.id));
    }
  }, [dispatch]);

  useEffect(() => {
    syncLocalStorage();
  }, [expenses]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      author: user.id,
      name: transaction.name,
      amount: transaction.amount,
      createdAt: moment(),
    };
    dispatch(startAddExpense(newTransaction));
    syncLocalStorage();
  };

  const removeTransaction = (expense) => {
    dispatch(startRemoveExpense(expense._id));
    syncLocalStorage();
  };

  const changeExpense = (expenseid) => {
    setEditing(expenseid);
  };

  const saveChanges = (expense, changes) => {
    setEditing(false);
    dispatch(startEditExpense(expense._id, changes));
    dispatch(startSetExpenses(expenses));
  };

  return (
    <div className="history">
      <hr style={{ backgroundColor: 'gray' }} />
      <h3>Transaction History</h3>
      {expenses.length > 0 ? (
        <div>
          {expenses.map((expense) => (
            <Expense
              createdAt={expense.createdAt}
              expense={expense}
              saveChanges={saveChanges}
              isEditing={editing}
              changeExpense={changeExpense}
              removeExpense={removeTransaction}
              key={expense._id}
              id={expense.id}
              name={expense.name}
              amount={expense.amount}
            />
          ))}
        </div>
      ) : (
        <h5>No transactions</h5>
      )}
      <div className="btns">
        <button onClick={() => setMode('Income')} className="btn btn-income">
          New Income
        </button>
        <button onClick={() => setMode('Expense')} className="btn btn-expense">
          New Expense
        </button>
      </div>
      {mode && (
        <div>
          <NewTransactionForm mode={mode} addTransaction={addTransaction} />
        </div>
      )}
    </div>
  );
};

export default History;

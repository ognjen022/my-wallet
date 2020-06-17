import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Expense from './Expense';
import NewTransactionForm from './NewTransactionForm';
import Spinner from './Spinner';
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
  const [loading, setLoading] = useState(true);

  const expenses = useSelector((state) => state.expenses);
  const token = useSelector((state) => state.user.token);

  const stopLoading = () => {
    setLoading(false);
  };
  useEffect(() => {
    dispatch(startSetExpenses(token, stopLoading));
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      name: transaction.name,
      amount: transaction.amount,
      createdAt: moment(),
    };
    dispatch(startAddExpense(newTransaction, token));
  };

  const removeTransaction = (expense) => {
    dispatch(startRemoveExpense(expense._id, token));
  };

  const changeExpense = (expenseid) => {
    setEditing(expenseid);
  };

  const saveChanges = (expense, changes) => {
    setEditing(false);
    dispatch(startEditExpense(expense._id, changes, token));
    dispatch(startSetExpenses(expenses, stopLoading));
  };

  return (
    <div className="history">
      <hr style={{ backgroundColor: 'gray' }} />
      <h3>Transaction History</h3>
      {loading ? (
        <Spinner />
      ) : expenses.length > 0 ? (
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
              id={expense._id}
              name={expense.name}
              amount={expense.amount}
            />
          ))}
        </div>
      ) : (
        <h5>No Transactions</h5>
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

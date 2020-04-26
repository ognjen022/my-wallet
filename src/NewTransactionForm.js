import React from 'react';
import useInput from './useInput';
import './NewTransactionForm.css';
import moment from 'moment';
import { useSelector } from 'react-redux';

function NewTransactionForm(props) {
  const [transaction, setTransaction, resetTransaction] = useInput('');
  const [amount, setAmount, resetAmount] = useInput('');
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTransaction = {};
    if (!transaction) {
      alert('Fill the transaction name field.');
    } else if (!amount) {
      alert('Fill the amount field.');
    } else {
      if (props.mode === 'Income') {
        newTransaction = {
          author: user.id,
          name: transaction,
          amount: parseFloat(amount).toFixed(2),
          createdAt: moment(),
        };
      } else {
        newTransaction = {
          author: user.id,
          name: transaction,
          amount: -parseFloat(amount).toFixed(2),
          createdAt: moment(),
        };
      }
      props.addTransaction(newTransaction);
      resetTransaction();
      resetAmount();
    }
  };

  return (
    <div className="transaction-form">
      <h3>Add New {props.mode}: </h3>
      <div>
        <form onSubmit={handleSubmit}>
          <h5 className="text">Text:</h5>
          <input type="text" value={transaction} onChange={setTransaction} />
          <h5 className="text">Amount:</h5>
          <input type="number" value={amount} onChange={setAmount} />
          <br />
          <input
            style={{
              backgroundColor: props.mode === 'Income' ? '#03bb22' : '#bb0303',
            }}
            className="btn"
            type="submit"
            value={`Add ${props.mode === 'Income' ? 'Income' : 'Expense'}`}
          />
        </form>
      </div>
    </div>
  );
}

export default NewTransactionForm;

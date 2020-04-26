import React from 'react';
import useInput from './useInput';
import './Expense.css';
import moment from 'moment';

function Expense(props) {
  const [nameInput, setNameInput] = useInput(props.name);
  const [amountInput, setAmountInput] = useInput(props.amount);

  const removeMe = () => {
    props.removeExpense(props.expense);
  };

  const editMe = () => {
    props.changeExpense(props.id);
  };

  const saveChanges = () => {
    if (!nameInput) {
      alert('Fill the transaction name field.');
    } else if (!amountInput) {
      alert('Fill the amount field.');
    } else {
      const changedExpense = {
        name: nameInput,
        amount: parseFloat(amountInput).toFixed(2),
      };
      props.saveChanges(props.expense, changedExpense);
    }
  };

  return (
    <div
      className="expense"
      style={{ borderRight: `5px solid ${props.amount > 0 ? 'green' : 'red'}` }}
    >
      {props.isEditing === props.id ? (
        <button onClick={saveChanges} className="save-button">
          Save
        </button>
      ) : (
        <div className="buttons">
          <button className="delete-button" onClick={removeMe}>
            x
          </button>
          <button className="edit-button" onClick={editMe}>
            Edit
          </button>
        </div>
      )}

      {props.isEditing === props.id ? (
        <div>
          <input
            className="expense-input"
            type="text"
            onChange={setNameInput}
            value={nameInput}
          />
          <input
            className="expense-input"
            type="number"
            onChange={setAmountInput}
            value={amountInput}
          />
        </div>
      ) : (
        <div>
          <span className="expense-info">
            <b>{props.name}</b>
          </span>
          <br />
          <span className="expense-info">
            {props.amount > 0 ? <b> + </b> : <b> - </b>}
            <b> € </b>
            {Math.abs(props.amount).toFixed(2)}
          </span>
          <span className="date">
            <b>{moment(props.createdAt).format('LLLL')}</b>
          </span>
        </div>
      )}
    </div>
  );
}

export default Expense;

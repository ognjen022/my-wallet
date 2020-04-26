import React from 'react';
import { useSelector } from 'react-redux';
import "./Balance.css"

function Balance() {
  const expenses = useSelector((state) => state.expenses);
  const calculateBalance = () => {
    let amount = 0.0;
    for (let i = 0; i < expenses.length; i++) {
      amount = amount + parseFloat(expenses[i].amount);
    }
    return amount.toFixed(2);
  };

  const calculateIncome = () => {
    let amount = 0.0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].amount > 0) {
        amount = amount + parseFloat(expenses[i].amount);

      }
    }
    return amount.toFixed(2);
  };

  const calculateExpense = () => {
    let amount = 0.0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].amount < 0) {
        amount = amount + parseFloat(expenses[i].amount);

      }
    }
    return amount;
  };

  return (
    <div>
      <h3>Your Balance: </h3>
      <h3>€{calculateBalance()}</h3>
      <div className="divs">
        <span className="calculate"><b>Income:</b> <span style={{ color: "green" }}>{calculateIncome()}</span> <b>€</b></span>
        <span className="calculate"><b>Expense:</b> <span style={{ color: "red" }}>{(calculateExpense() * -1).toFixed(2)}</span> <b>€</b></span>
      </div>

    </div>
  );
}

export default Balance;

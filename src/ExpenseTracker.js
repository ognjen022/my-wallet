import React from 'react';
import Header from './Header';
import Balance from './Balance';
import History from './History';

function ExpenseTracker() {
  return (
    <div>
      <Header />
      <Balance />
      <History />
    </div>
  );
}

export default ExpenseTracker;

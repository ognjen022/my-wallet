import axios from 'axios';

export const addExpense = (payload) => ({
  type: 'ADD_EXPENSE',
  payload,
});

export const startAddExpense = (payload) => {
  return (dispatch) => {
    const {
      author = '',
      id = 0,
      name = '',
      amount = 0,
      createdAt = new Date(),
    } = payload;
    const expenseToAdd = { author, id, name, amount, createdAt };
    console.log('EXPENSE FROM ACTION', expenseToAdd);
    axios
      .post(`https://wallet-app-api.herokuapp.com/${author}`, expenseToAdd)
      .then((res) => {
        console.log(res.data);
        dispatch(addExpense(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const setExpenses = (payload) => ({
  type: 'SET_EXPENSES',
  payload,
});

export const startSetExpenses = (payload, userid) => {
  return (dispatch) => {
    axios
      .get(`https://wallet-app-api.herokuapp.com/${userid}`)
      .then((res) => dispatch(setExpenses(res.data)))
      .catch((err) => console.log(err));
  };
};

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const startRemoveExpense = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://wallet-app-api.herokuapp.com/${id}`)
      .then((res) => {
        dispatch(removeExpense(id));
      })
      .catch((err) => console.log(err));
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    axios
      .put(`https://wallet-app-api.herokuapp.com/${id}`, updates)
      .then((res) => dispatch(editExpense(id, updates)))
      .catch((err) => console.log(err));
  };
};

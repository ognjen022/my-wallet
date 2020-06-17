import axios from 'axios';

export const addExpense = (payload) => ({
  type: 'ADD_EXPENSE',
  payload,
});

export const startAddExpense = (payload, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const { name = '', amount = 0, createdAt = new Date() } = payload;
  const expenseToAdd = { name, amount, createdAt };
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/expenses`,
      expenseToAdd,
      config
    );
    dispatch(addExpense(data));
  } catch (err) {
    console.log(err);
  }
};

export const setExpenses = (payload) => ({
  type: 'SET_EXPENSES',
  payload,
});

export const startSetExpenses = (token, stopLoading) => async (dispatch) => {
  console.log(process.env.REACT_APP_API_URL);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/expenses`,
      config
    );
    dispatch(setExpenses(data));
    stopLoading();
  } catch (err) {
    console.log(err);
    stopLoading();
  }
};

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const startRemoveExpense = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/expenses/${id}`,
      config
    );
    dispatch(removeExpense(id));
  } catch (err) {
    console.log(err);
  }
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

export const startEditExpense = (id, updates, token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/expenses/${id}`,
      updates,
      config
    );
    dispatch(editExpense(id, updates));
  } catch (err) {
    console.log(err);
  }
};

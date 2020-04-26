const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense._id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    case 'SET_EXPENSES':
      return action.payload;
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense._id !== action.id);
    default:
      return state;
  }
};

export default expensesReducer;

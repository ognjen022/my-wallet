const initialState = JSON.parse(localStorage.getItem('theme'));

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return !state;
    default:
      return state;
  }
};

export default themeReducer;

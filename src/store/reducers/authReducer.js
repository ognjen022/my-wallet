const initialState = {
  id: localStorage.getItem('id'),
  email: localStorage.getItem('email'),
  token: localStorage.getItem('token'),
  name: localStorage.getItem('name'),
  lastName: localStorage.getItem('lastName'),
  pic: localStorage.getItem('pic'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_WITH_GOOGLE':
      return {
        ...state.user,
        id: action.payload.userid,
        email: action.payload.email,
        token: action.payload.token,
        name: action.payload.name,
        lastName: action.payload.lastName,
        pic: action.payload.pic,
      };
    case 'LOG_OUT':
      return {
        id: null,
        email: null,
        token: null,
        name: null,
        lastName: null,
        pic: null,
      };
    default:
      return state;
  }
};

export default authReducer;

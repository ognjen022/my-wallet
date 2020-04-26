import axios from 'axios';

export const logInWithGoogle = (payload) => ({
  type: 'LOG_IN_WITH_GOOGLE',
  payload,
});

export const startLoginWithGoogle = (payload, navigate, person) => {
  return (dispatch) => {
    const token = {
      token: payload,
    };
    axios
      .post('http://localhost:5000/login', { token })
      .then((res) => {
        localStorage.setItem('id', res.data.userid);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('name', person.name);
        localStorage.setItem('lastName', person.lastName);
        localStorage.setItem('pic', person.pic);
        const user = {
          ...person,
          ...res.data,
        };
        dispatch(logInWithGoogle(user));
        navigate();
      })
      .catch((err) => console.log(err));
  };
};

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const startLogOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    dispatch(logOut());
  };
};

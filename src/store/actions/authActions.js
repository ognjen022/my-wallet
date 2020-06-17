import axios from 'axios';

export const logInWithGoogle = (payload) => ({
  type: 'LOG_IN_WITH_GOOGLE',
  payload,
});

export const startLoginWithGoogle = (
  payload,
  navigate,
  person,
  stopLoading
) => {
  return (dispatch) => {
    const token = {
      token: payload,
    };
    axios
      .post(`https://wallet-app-api.herokuapp.com/users/login`, { token })
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
        stopLoading();
      })
      .catch((err) => {
        console.error(err.message);
        stopLoading();
      });
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

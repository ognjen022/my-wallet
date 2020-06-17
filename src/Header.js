import React from 'react';
import './Header.css';
import { switchTheme } from './store/actions/themeActions';
import { startLogOut } from './store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(switchTheme());
  };

  const logOut = () => {
    dispatch(startLogOut());
  };

  const user = useSelector((state) => state.user);

  return (
    <div>
      <label className="switch">
        <input type="checkbox" onChange={changeTheme} />
        <span className="slider round">
          <div className="icons">
            <i className="moon fas fa-moon"></i>
            <i className="sun fas fa-sun fa-1.5x"></i>
          </div>
        </span>
      </label>
      <div className="info">
        <img className="user-img" src={user.pic} alt={user.name} />
        <button onClick={logOut} className="caption">
          <b>Log Out</b>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
      <h1>{user.name}'s Wallet</h1>
    </div>
  );
}

export default Header;

import React, { useEffect } from 'react';
import './App.css';
import ExpenseTracker from './ExpenseTracker';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import PrivateRoute from './PrivateRoute';

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={theme ? ' App background-dark' : 'App background-light'}>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <Auth {...routeProps} />}
        />
        <PrivateRoute exact path="/expenses" component={ExpenseTracker} />
      </Switch>
    </div>
  );
}

export default App;

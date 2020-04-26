import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import expensesReducer from './reducers/expensesReducer';
import themeReducer from './reducers/themeReducer';
import authReducer from './reducers/authReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    theme: themeReducer,
    user: authReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

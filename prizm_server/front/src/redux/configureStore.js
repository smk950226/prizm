import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware  } from 'connected-react-router'
import { createBrowserHistory as createHistory  } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18nState } from 'redux-i18n';
import user from './modules/user';

const env= process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if(env === 'development'){
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const reducer = history => combineReducers({
    user,
    router: connectRouter(history),
    i18nState
})

let store;

if(env === 'development'){
    store = initialState =>  createStore(reducer(history), initialState, composeWithDevTools(applyMiddleware(...middlewares))); //unpack the list
}
else{
    store = initialState =>  createStore(reducer(history), initialState, compose(applyMiddleware(...middlewares))); //unpack the list
}

export { history };

export default store();
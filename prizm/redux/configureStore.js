import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { i18nState } from 'redux-i18n';
import thunk from 'redux-thunk';
import user from './modules/user';
import customer from './modules/customer';
import admin from './modules/admin';

const middlewares = [thunk];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const reducer = persistCombineReducers(persistConfig, {
    user,
    customer,
    admin,
    i18nState
});

const configureStore = () => {
    let store = createStore(reducer, applyMiddleware(...middlewares));
    let persistor = persistStore(store);
    return { store, persistor }
};

export default configureStore; 
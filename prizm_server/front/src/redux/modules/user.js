import { FETCH_URL } from '../../config/urls';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';

function saveToken(token) {
    return {
        type: SAVE_TOKEN,
        token
    }
}

function logout(){
    return {
        type: LOGOUT
    }
};

function getSaveToken(token){
    return (dispatch) => {
        dispatch(saveToken(token))
    }
}

function getLogout(){
    return (dispatch) => {
        dispatch(logout());
    }
}

const initialState = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false,
    token: localStorage.getItem('jwt')
};

function reducer(state = initialState, action){
    switch(action.type){
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case LOGOUT:
            return applyLogout(state, action);
        default:
           return state;
    }
}

function applySetToken(state, action){
    const { token } = action;
    localStorage.setItem("jwt", token);
    return {
        ...state,
        isLoggedIn: true,
        token
    };
};

function applyLogout(state, action){
    localStorage.removeItem("jwt");
    return {
        isLoggedIn: false,
        token: null,
    };
};

const actionCreators = {
    
}

export { actionCreators }

export default reducer; 
import { FETCH_URL } from '../../config/urls';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const SET_PROFILE = 'SET_PROFILE';

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

function setProfile(profile) {
    return {
        type: SET_PROFILE,
        profile
    }
}

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

function signUp(email, password, name, birth, countryNumber, countryCode, mobile){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/rest-auth/registration/`, {
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               username: email,
               password1: password,
               password2: password,
               name,
               birth,
               countryNumber,
               email,
               mobile,
               countryCode
           })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                return {
                    token: json.token
                }
            }
            else{
                return false
            }
        })
        .catch(err => console.log(err));
    }
}

function checkDuplicate(email, mobile, countryNumber){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/duplicate/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                mobile,
                countryNumber
            })
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function getProfileByToken(token){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/users/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
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
        case SET_PROFILE:
            return applySetProfile(state, action);
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

function applySetProfile(state, action){
    const { profile } = action;
    return {
        ...state,
        profile
    }
}

const actionCreators = {
    checkDuplicate,
    signUp,
    getProfileByToken,
    getSaveToken
}

export { actionCreators }

export default reducer; 
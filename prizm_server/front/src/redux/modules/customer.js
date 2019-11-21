import { FETCH_URL } from '../../config/urls';
import { actionCreators as userActions } from './user';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const SET_PHOTOGRAPHER_LIST = 'SET_PHOTOGRAPHER_LIST';
const SET_REQUEST = 'SET_REQUEST';
const RESET_REQUEST = 'RESET_REQUEST';

function setPhotographerList(photographerList) {
    return {
        type: SET_PHOTOGRAPHER_LIST,
        photographerList
    }
}

function setRequest(request){
    return {
        type: SET_REQUEST,
        request
    }
}

function resetRequest(){
    return {
        type: RESET_REQUEST
    }
}

function getRequest(request){
    return (dispatch) => {
        dispatch(setRequest(request))
    }
}

function removeRequest(){
    return (dispatch) => {
        dispatch(resetRequest())
    }
}

function getPhotographerList(){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/studio/photographer/?page=1`, {
           headers: {
               "Content-Type": "application/json"
           }
        })
        .then(response => response.json())
        .then(json => dispatch(setPhotographerList(json)))
    }
}
function getPhotographerListMore(page){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/studio/photographer/?page=${page}`, {
           headers: {
               "Content-Type": "application/json"
           }
        })
        .then(response => {
            if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getPhotographerDetail(photographerId){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/studio/photographer/detail/?photographerId=${photographerId}`, {
           headers: {
               "Content-Type": "application/json"
           }
        })
        .then(response => {
            if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function createRequest(photographerId, locationId, optionId, comment, dateOption, date, hour, min, startDate, endDate){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/order/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                photographerId, 
                locationId, 
                optionId, 
                comment, 
                dateOption, 
                date, 
                hour,
                min,
                startDate, 
                endDate
            })
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(userActions.getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

const initialState = {
    request: localStorage.getItem('request') ? JSON.parse(localStorage.getItem('request')) : {}
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_PHOTOGRAPHER_LIST:
            return applySetPhotographerList(state, action);
        case SET_REQUEST:
            return applySetRequest(state, action);
        case RESET_REQUEST:
            return applyResetRequest(state, action);
        default:
           return state;
    }
}

function applySetPhotographerList(state, action){
    const { photographerList } = action;
    return {
        ...state,
        photographerList
    };
};

function applySetRequest(state, action){
    const { request } = action;
    const requestJson = JSON.stringify(request)
    localStorage.setItem("request", requestJson);
    return {
        ...state,
        request
    }
}

function applyResetRequest(state, action){
    localStorage.removeItem("request")
    return {
        ...state,
        request: {}
    }
}

const actionCreators = {
    getPhotographerList,
    getPhotographerListMore,
    getPhotographerDetail,
    createRequest,
    getRequest,
    removeRequest
}

export { actionCreators }

export default reducer; 
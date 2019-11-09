import { FETCH_URL } from '../../config/urls';
import { actionCreators as userActions } from './user';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const SET_PHOTOGRAPHER_LIST = 'SET_PHOTOGRAPHER_LIST';

function setPhotographerList(photographerList) {
    return {
        type: SET_PHOTOGRAPHER_LIST,
        photographerList
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

const initialState = {
    
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_PHOTOGRAPHER_LIST:
            return applySetPhotographerList(state, action);
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

const actionCreators = {
    getPhotographerList,
    getPhotographerListMore,
    getPhotographerDetail
}

export { actionCreators }

export default reducer; 
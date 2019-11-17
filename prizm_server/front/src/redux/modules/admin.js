import { FETCH_URL } from '../../config/urls';
import { actionCreators as userActions } from './user';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const SET_PHOTOGRAPHER = 'SET_PHOTOGRAPHER';

function setPhotographer(photographer) {
    return {
        type: SET_PHOTOGRAPHER,
        photographer
    }
}

function getAdminOrderList(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/studio/admin/order/`, {
           headers: {
               "Content-Type": "application/json",
               "Authorization": `JWT ${token}`
           }
        })
        .then(response => {
            if(response.status === 401){
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

function responseToOrder(orderId, option, availableTime){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/studio/admin/order/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                orderId,
                option,
                availableTime
            })
        })
        .then(response => {
            if(response.status === 401){
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

function getOrderImage(orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/studio/order/image/?orderId=${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
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

function uploadOrderImage(images, orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        let formData = new FormData();
        formData.append('orderId', orderId)
        for (var i = 0; i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }
        return fetch(`${FETCH_URL}/api/studio/order/image/upload/`, {
            method: 'POST',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
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

function getPhotographer(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/studio/photographer/detail/bytoken/`, {
            headers: {
                "Authorization": `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setPhotographer(json)))
    }
}

function getPhotographerByToken(token){
    return (dispatch, getState) => {
        fetch(`${FETCH_URL}/api/studio/photographer/detail/bytoken/`, {
            headers: {
                "Authorization": `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setPhotographer(json)))
    }
}

const initialState = {
    
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_PHOTOGRAPHER:
            return applySetPhotographer(state, action);
        default:
            return state;
    }
}

function applySetPhotographer(state, action){
    const { photographer } = action;
    return {
        ...state,
        photographer
    };
};

const actionCreators = {
    getAdminOrderList,
    responseToOrder,
    getOrderImage,
    uploadOrderImage,
    getPhotographer,
    getPhotographerByToken
}

export { actionCreators }

export default reducer; 
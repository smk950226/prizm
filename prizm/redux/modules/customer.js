import { FETCH_URL } from '../../config/urls';
import { actionCreators as userActions } from './user';

const SET_PHOTOGRAPHER_LIST = 'SET_PHOTOGRAPHER_LIST';
const SET_REQUEST = 'SET_REQUEST';
const RESET_REQUEST = 'RESET_REQUEST';
const SET_PRICE = 'SET_PRICE';

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

function setPrice(price){
    return {
        type: SET_PRICE,
        price
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

function getPrice(price){
    return (dispatch) => {
        dispatch(setPrice(price))
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

function responseToOrder(orderId, responseType, selectedTime, messageId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/order/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                orderId, 
                responseType, 
                selectedTime,
                messageId
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

function createDeposit(name, price, orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/payment/deposit/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                name,
                price,
                orderId
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

function paymentExpire(orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/payment/expire/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                orderId
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

function checkPrice(orderId, price){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/payment/check/price/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                orderId,
                price
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

function pay(meta, orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/payment/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                orderId,
                meta
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

function paymentSuccess(impUid, merchantUid, impSuccess){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/payment/success/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                impUid,
                merchantUid,
                impSuccess
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.getLogout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getExchangeRate(country){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/common/exchange/rate/?country=${country}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
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

function getReviewList(photographerId){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/studio/review/?photographerId=${photographerId}&page=1`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function getReviewListMore(photographerId, page){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/studio/review/?photographerId=${photographerId}&page=${page}`, {
            method: 'GET',
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

function createReview(photographerId, orderId, rate, comment){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/studio/review/create/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                photographerId,
                orderId,
                rate,
                comment
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

function createCustomRequestByToken(token, photograpyType, person, hour, dateOption, selectedDate, selectedHour, selectedMin, startDate, endDate, locationOption, locations){
    return (dispatch, getState) => {
        let formData = new FormData();
        formData.append('photograpyType', photograpyType)
        formData.append('person', person)
        formData.append('hour', hour)
        formData.append('dateOption', dateOption)
        formData.append('selectedDate', selectedDate)
        formData.append('selectedHour', selectedHour)
        formData.append('selectedMin', selectedMin)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)
        formData.append('locationOption', locationOption)

        for (var i = 0; i < locations.length; i++) {
            formData.append('locations[]', JSON.stringify(locations[i]));
        }

        return fetch(`${FETCH_URL}/api/studio/custom/request/`, {
            method: 'POST',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
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

function createCustomRequest(photograpyType, person, hour, dateOption, selectedDate, selectedHour, selectedMin, startDate, endDate, locationOption, locations){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        let formData = new FormData();
        formData.append('photograpyType', photograpyType)
        formData.append('person', person)
        formData.append('hour', hour)
        formData.append('dateOption', dateOption)
        formData.append('selectedDate', selectedDate)
        formData.append('selectedHour', selectedHour)
        formData.append('selectedMin', selectedMin)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)
        formData.append('locationOption', locationOption)

        for (var i = 0; i < locations.length; i++) {
            formData.append('locations[]', JSON.stringify(locations[i]));
        }

        return fetch(`${FETCH_URL}/api/studio/custom/request/`, {
            method: 'POST',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
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

function cancelCustomRequest(requestId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                requestId
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

function getRequestOrderList(requestId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/order/?requestId=${requestId}&page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
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

function getRequestOrderListMore(requestId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/order/?requestId=${requestId}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(userActions.getLogout())
                return false
            }
            else if(response.status === 404){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function responsetToRequsetOrder(orderId, selectedTime){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/order/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                orderId,
                selectedTime
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
    request: {}
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_PHOTOGRAPHER_LIST:
            return applySetPhotographerList(state, action);
        case SET_REQUEST:
            return applySetRequest(state, action);
        case RESET_REQUEST:
            return applyResetRequest(state, action);
        case SET_PRICE:
            return applySetPrice(state, action);
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
    return {
        ...state,
        request
    }
}

function applyResetRequest(state, action){
    return {
        ...state,
        request: {}
    }
}

function applySetPrice(state, action){
    const { price } = action;
    return {
        ...state,
        price
    }
}

const actionCreators = {
    getPhotographerList,
    getPhotographerListMore,
    getPhotographerDetail,
    createRequest,
    getRequest,
    removeRequest,
    responseToOrder,
    getOrderImage,
    createDeposit,
    paymentExpire,
    getPrice,
    checkPrice,
    pay,
    getExchangeRate,
    getReviewList,
    getReviewListMore,
    createReview,
    paymentSuccess,
    createCustomRequest,
    createCustomRequestByToken,
    cancelCustomRequest,
    getRequestOrderList,
    getRequestOrderListMore,
    responsetToRequsetOrder
}

export { actionCreators }

export default reducer; 
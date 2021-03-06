import { FETCH_URL } from '../../config/urls';
import { GOOGLE_API_KEY_GEO_CODING, GOOGLE_API_KEY } from '../../config/secrets';
import { actionCreators as userActions } from './user';

const SET_PHOTOGRAPHER = 'SET_PHOTOGRAPHER';

function setPhotographer(photographer) {
    return {
        type: SET_PHOTOGRAPHER,
        photographer
    }
}

function getAdminOrderList(status){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/studio/admin/order/?page=1${status ? `&status=${status}` : ``}`, {
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

function getAdminOrderListMore(page, status){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/studio/admin/order/?page=${page}${status ? `&status=${status}` : ``}`, {
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
            if((response.status === 401) || (response.status === 403)){
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
            if((response.status === 401) || (response.status === 403)){
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

function updateStudio(portfolios, nickname, mainLocation, equipment, career, description, profileImage, locations, options, studioId, update){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        let formData = new FormData();
        for (var i = 0; i < portfolios.length; i++) {
            if(portfolios[i].image.type){
                formData.append('portfolios[]', portfolios[i].image, portfolios[i].image.name);
            }
            else{
                formData.append('portfolios[]', JSON.stringify(portfolios[i].image));
            }
        }
        formData.append('nickname', nickname)
        formData.append('mainLocation', mainLocation)
        formData.append('equipment', equipment)
        formData.append('career', career)
        formData.append('description', description)
        if(profileImage.type){
            formData.append('profileImage', profileImage, profileImage.name)
        }
        else{
            formData.append('profileImage', JSON.stringify(profileImage))
        }
        for (var i = 0; i < locations.length; i++) {
            formData.append('locations[]', JSON.stringify(locations[i]));
        }
        for (var i = 0; i < options.length; i++) {
            formData.append('options[]', JSON.stringify(options[i]));
        }
        formData.append('studioId', studioId)
        formData.append('update', update)

        return fetch(`${FETCH_URL}/api/studio/edit/`, {
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

function geocoding(address){
    return (dispatch) => {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY_GEO_CODING}`)
        .then(response => response.json())
        .then(json => json)
    }
}

function locationDetail(placeId){
    return (dispatch) => {
        return fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,type&key=${GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(json => json)
    }
}

function editAccount(legalName, birth, accountType, content){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/payment/photographer/account/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                legalName,
                birth,
                accountType,
                content
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

function orderComplete(orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/order/complete/`, {
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

function getRequestList(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/?page=1`, {
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

function getRequestListMore(page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/?page=${page}`, {
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

function createRequestOrder(requestId, location, availableTime, price){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/custom/request/order/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                requestId,
                location,
                availableTime,
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
    getAdminOrderListMore,
    responseToOrder,
    getOrderImage,
    uploadOrderImage,
    getPhotographer,
    getPhotographerByToken,
    geocoding,
    locationDetail,
    updateStudio,
    editAccount,
    orderComplete,
    getRequestList,
    getRequestListMore,
    createRequestOrder
}

export { actionCreators }

export default reducer; 
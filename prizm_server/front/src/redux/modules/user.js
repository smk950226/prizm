import { FETCH_URL } from '../../config/urls';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const SET_PROFILE = 'SET_PROFILE';
const SET_NOTIFICATION = 'SET_NOTIFICATION';
const SET_ORDER_LIST = 'SET_ORDER_LIST';
const SET_CHAT_LIST = 'SET_CHAT_LIST';
const SET_CHECK_NEW_MESSAGE = 'SET_CHECK_NEW_MESSAGE';

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

function setNotification(notification){
    return {
        type: SET_NOTIFICATION,
        notification
    }
}

function setOrderList(orderList){
    return {
        type: SET_ORDER_LIST,
        orderList
    }
}

function setChatList(chatList){
    return {
        type: SET_CHAT_LIST,
        chatList
    }
}

function setCheckNewMessage(newMessage){
    return {
        type: SET_CHECK_NEW_MESSAGE,
        newMessage
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

function getCheckNewMessage(newMessage){
    return (dispatch) => {
        dispatch(setCheckNewMessage(newMessage))
    }
}

function signUp(email, password, name, countryNumber, countryCode, mobile){
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
               countryNumber,
               countryCode,
               email,
               mobile
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

function signUpAdmin(email, password, name, countryNumber, countryCode, mobile, instagram, userType){
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
               countryNumber, 
               countryCode,
               email,
               mobile,
               instagram,
               userType
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

function login(username, password){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/rest-auth/login/`, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => {
            return response.json()
        })
        .then((json) => {
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

function checkPhotographer(token){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/photographer/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function checkDuplicate(email, mobile, countryNumber, instagram){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/duplicate/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                mobile,
                countryNumber,
                instagram
            })
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function getProfile(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function editProfile(name, countryNumber, mobile){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/profile/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                name,
                countryNumber,
                mobile,
            })
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function adminEditProfile(name, countryNumber, mobile, instagram){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/profile/admin/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                name,
                countryNumber,
                mobile,
                instagram
            })
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function editPassword(currentPassword, password){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/profile/password/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                currentPassword,
                password
            })
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getProfileByToken(token){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function getNotification(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/notification/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setNotification(json)))
    }
}

function getNotificationByToken(token){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/notification/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setNotification(json)))
    }
}

function getOrderList(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/studio/order/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setOrderList(json)))
    }
}

function getOrderDetail(orderId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/order/detail/?orderId=${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getOrderListByToken(token){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/studio/order/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setOrderList(json)))
    }
}

function getChatList(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/chat/?page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setChatList(json)))
    }
}

function getChatListMore(page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/chat/?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
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

function getMessages(chatId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/message/?chatId=${chatId}&page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getMessagesMore(chatId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/studio/message/?chatId=${chatId}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
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

function getTerm(name){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/common/terms/?name=${name}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function checkNotification(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/notification/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
            }
            else{
                dispatch(setNotification([]))
            }
        })
    }
}

function checkMessage(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/chat/check/message/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setCheckNewMessage(json.new_message)))
    }
}

function checkMessageByToken(token){
    return (dispatch) => {
        fetch(`${FETCH_URL}/api/chat/check/message/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if((response.status === 401) || (response.status === 403)){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setCheckNewMessage(json.new_message)))
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
        case SET_NOTIFICATION:
            return applySetNotification(state, action);
        case SET_ORDER_LIST:
            return applySetOrderList(state, action);
        case SET_CHAT_LIST:
            return applySetChatList(state, action);
        case SET_CHECK_NEW_MESSAGE:
            return applySetCheckNewMessage(state, action);
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

function applySetNotification(state, action){
    const { notification } = action;
    return {
        ...state,
        notification
    }
}

function applySetOrderList(state, action){
    const { orderList } = action;
    return {
        ...state,
        orderList
    }
}

function applySetChatList(state, action){
    const { chatList } = action;
    return {
        ...state,
        chatList
    }
}

function applySetCheckNewMessage(state, action){
    const { newMessage } = action;
    return {
        ...state,
        newMessage
    }
}

const actionCreators = {
    checkDuplicate,
    signUp,
    getProfileByToken,
    getSaveToken,
    login,
    getLogout,
    getProfile,
    getNotification,
    getNotificationByToken,
    getOrderList,
    getOrderListByToken,
    getOrderDetail,
    editProfile,
    editPassword,
    signUpAdmin,
    checkPhotographer,
    adminEditProfile,
    getChatList,
    getChatListMore,
    getMessages,
    getMessagesMore,
    getTerm,
    checkNotification,
    checkMessage,
    checkMessageByToken,
    getCheckNewMessage
}

export { actionCreators }

export default reducer; 
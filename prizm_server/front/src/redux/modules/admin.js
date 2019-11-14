import { FETCH_URL } from '../../config/urls';
import { actionCreators as userActions } from './user';
require('es6-promise').polyfill();
require('isomorphic-fetch');

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

const initialState = {
    
};

function reducer(state = initialState, action){
    switch(action.type){
        default:
           return state;
    }
}

const actionCreators = {
    getAdminOrderList,
}

export { actionCreators }

export default reducer; 
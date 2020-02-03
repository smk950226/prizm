import { FETCH_URL } from '../../config/urls';

function likeArtwork(artworkId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/artwork/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                artworkId
            })
        })
        .then(response => {
            if(response.status === 401){
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

function unlikeArtwork(artworkId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/artwork/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                artworkId
            })
        })
        .then(response => {
            if(response.status === 401){
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

function getArtworkReviewList(artworkId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/artwork/?artworkId=${artworkId}&page=1`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
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

function getArtworkReviewListMore(artworkId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/artwork/?artworkId=${artworkId}&page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
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

function createArtworkReview(artworkId, rating, expression, content){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/artwork/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                artworkId,
                rating,
                expression,
                content
            })
        })
        .then(response => {
            if(response.status === 401){
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

function updateArtworkReview(artworkId, reviewId, rating, expression, content){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/artwork/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                artworkId,
                reviewId,
                rating,
                expression,
                content
            })
        })
        .then(response => {
            if(response.status === 401){
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

function deleteArtworkReview(artworkId, reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/artwork/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                artworkId,
                reviewId
            })
        })
        .then(response => {
            if(response.status === 401){
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

function getArtworkLikeList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/artwork/${userId}/?page=1`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
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

function getArtworkLikeListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/artwork/${userId}/?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
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

const initialState = {
    
};

function reducer(state = initialState, action){
    switch(action.type){
        default:
           return state;
    }
}

const actionCreators = {
    likeArtwork,
    unlikeArtwork,
    getArtworkReviewList,
    getArtworkReviewListMore,
    createArtworkReview,
    getArtworkLikeList,
    getArtworkLikeListMore,
    updateArtworkReview,
    deleteArtworkReview
}

export { actionCreators }

export default reducer;   
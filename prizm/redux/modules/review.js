import { FETCH_URL } from '../../config/urls';

const SET_INITIAL_REVIEW = 'SET_INITIAL_REVIEW';
const SET_RECOMMENDED_REVIEW = 'SET_RECOMMENDED_REVIEW';
const SET_NEW_REVIEW = 'SET_NEW_REVIEW';
const SET_FOLLOWING_REVIEW = 'SET_FOLLOWING_REVIEW';
const ADD_BLOCK_REVIEW_LIST = 'ADD_BLOCK_REVIEW_LIST';
const ADD_BLOCK_USER_LIST = 'ADD_BLOCK_USER_LIST';
const ADD_BLOCK_REPLY_LIST = 'ADD_BLOCK_REPLY_LIST';
const RESET_BLOCK_REVIEW_LIST = 'RESET_BLOCK_REVIEW_LIST';
const RESET_BLOCK_USER_LIST = 'RESET_BLOCK_USER_LIST';
const RESET_BLOCK_REPLY_LIST = 'RESET_BLOCK_REPLY_LIST';

function setInitialReview(initial){
    return {
        type: SET_INITIAL_REVIEW,
        initial
    }
};

function setRecommendedReview(review){
    return {
        type: SET_RECOMMENDED_REVIEW,
        review
    }
};

function setNewReview(review){
    return {
        type: SET_NEW_REVIEW,
        review
    }
};

function setFollowingReview(review){
    return {
        type: SET_FOLLOWING_REVIEW,
        review
    }
};

function addBlockReviewList(reviewId){
    return {
        type: ADD_BLOCK_REVIEW_LIST,
        reviewId
    }
}

function addBlockUserList(userId){
    return {
        type: ADD_BLOCK_USER_LIST,
        userId
    }
}

function addBlockReplyList(replyId){
    return {
        type: ADD_BLOCK_REPLY_LIST,
        replyId
    }
}

function resetBlockReviewList(){
    return {
        type: RESET_BLOCK_REVIEW_LIST
    }
}

function resetBlockUserList(){
    return {
        type: RESET_BLOCK_USER_LIST
    }
}

function resetBlockReplyList(){
    return {
        type: RESET_BLOCK_REPLY_LIST
    }
}

function addBlockReview(reviewId){
    return (dispatch) => {
        dispatch(addBlockReviewList(reviewId))
    }
}

function addBlockUser(userId){
    return (dispatch) => {
        dispatch(addBlockUserList(userId))
    }
}

function resetBlockReview(){
    return (dispatch) => {
        dispatch(resetBlockReviewList())
    }
}

function resetBlockUser(){
    return (dispatch) => {
        dispatch(resetBlockUserList())
    }
}

function addBlockReply(replyId){
    return (dispatch) => {
        dispatch(addBlockReplyList(replyId))
    }
}

function resetBlockReply(){
    return (dispatch) => {
        dispatch(resetBlockReplyList())
    }
}

function initialReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/init/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setInitialReview(json)))
    }
}

function getRecommendedReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/review/recommended/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setRecommendedReview(json)))
    }
}

function getNewReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/review/new/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setNewReview(json)))
    }
}

function getFollowingReview(){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        fetch(`${FETCH_URL}/api/statics/review/following/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(json => dispatch(setFollowingReview(json)))
    }
}

function getReviewList(type, filter){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/?page=1&type=${type}&filter=${filter}`, {
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

function getReviewListMore(type, filter, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/review/?page=${page}&type=${type}&filter=${filter}`, {
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

function likeReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
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

function unlikeReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
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

function getReviewLikeList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/${userId}/?page=1`, {
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

function getReviewLikeListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/like/review/${userId}/?page=${page}`, {
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


function reportReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/report/review/?reviewId=${reviewId}`, {
            headers: {
                'Content-Type': 'application/json',
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

function blockReview(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/block/review/?reviewId=${reviewId}`, {
            headers: {
                'Content-Type': 'application/json',
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

function reportReply(replyId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/report/reply/?replyId=${replyId}`, {
            headers: {
                'Content-Type': 'application/json',
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

function blockReply(replyId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/block/reply/?replyId=${replyId}`, {
            headers: {
                'Content-Type': 'application/json',
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

const initialState = {
    banners: [],
    newReviews: [],
    recommendedReviews: [],
    followingReviews: [],
    blockReviewList: [],
    blockUserList: [],
    blockReplyList: []
};

function reducer(state = initialState, action){
    switch(action.type){
        case SET_INITIAL_REVIEW:
            return applySetInitialReview(state, action);
        case SET_RECOMMENDED_REVIEW:
            return applySetRecommendedReview(state, action);
        case SET_NEW_REVIEW:
            return applySetNewReview(state, action);
        case SET_FOLLOWING_REVIEW:
            return applySetFollowingReview(state, action);
        case ADD_BLOCK_REVIEW_LIST:
            return applyAddBlockReviewList(state, action);
        case ADD_BLOCK_USER_LIST:
            return applyAddBlockUserList(state, action);
        case ADD_BLOCK_REPLY_LIST:
            return applyAddBlockReplyList(state, action);
        case RESET_BLOCK_REVIEW_LIST:
            return applyResetBlockReviewList(state, action);
        case RESET_BLOCK_USER_LIST:
            return applyResetBlockUserList(state, action);
        case RESET_BLOCK_REPLY_LIST:
            return applyResetBlockReplyList(state, action);
        default:
           return state;
    }
}

function applySetInitialReview(state, action){
    const { initial } = action;
    return {
        ...state,
        banners: initial.banners,
        initialStatus: initial.status,
        newReviews: initial.new_reviews,
        recommendedReviews: initial.recommended_reviews,
        followingReviews: initial.following_reviews,
    };
};

function applySetRecommendedReview(state, action){
    const { review } = action;
    return {
        ...state,
        newReviews: review.new_reviews,
        recommendedReviews: review.recommended_reviews,
        followingReviews: review.following_reviews,
    };
};

function applySetNewReview(state, action){
    const { review } = action;
    return {
        ...state,
        newReviews: review.new_reviews,
        recommendedReviews: review.recommended_reviews,
        followingReviews: review.following_reviews,
    };
};

function applySetFollowingReview(state, action){
    const { review } = action;
    return {
        ...state,
        newReviews: review.new_reviews,
        recommendedReviews: review.recommended_reviews,
        followingReviews: review.following_reviews,
    };
};

function applyAddBlockReviewList(state, action){
    const { reviewId } = action;
    return {
        ...state,
        blockReviewList: [...state.blockReviewList, reviewId]
    }
}

function applyAddBlockUserList(state, action){
    const { userId } = action;
    return {
        ...state,
        blockUserList: [...state.blockUserList, userId]
    }
}

function applyAddBlockReplyList(state, action){
    const { replyId } = action;
    return {
        ...state,
        blockReplyList: [...state.blockReplyList, replyId]
    }
}

function applyResetBlockReviewList(state, action){
    return {
        ...state,
        blockReviewList: []
    }
}

function applyResetBlockUserList(state, action){
    return {
        ...state,
        blockUserList: []
    }
}

function applyResetBlockReplyList(state, action){
    return {
        ...state,
        blockReplyList: []
    }
}

const actionCreators = {
    initialReview,
    getReviewList,
    getReviewListMore,
    likeReview,
    unlikeReview,
    getReviewLikeList,
    getReviewLikeListMore,
    reportReview,
    getRecommendedReview,
    getNewReview,
    getFollowingReview,
    blockReview,
    addBlockReview,
    addBlockUser,
    resetBlockReview,
    resetBlockUser,
    reportReply,
    blockReply,
    addBlockReply,
    resetBlockReply
}

export { actionCreators }

export default reducer;   
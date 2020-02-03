import { FETCH_URL } from '../../config/urls';
import uuidv1 from 'uuid';

const LOGOUT = 'LOGOUT';
const SAVE_TOKEN = 'SAVE_TOKEN';
const SET_PROFILE = 'SET_PROFILE';
const SET_NOTICE_NEW = 'SET_NOTICE_NEW';
const SET_NOTIFICATION_NEW = 'SET_NOTIFICATION_NEW';

function logout(){
    return {
        type: LOGOUT
    }
};

function saveToken(token) {
    return {
        type: SAVE_TOKEN,
        token
    }
}

function setProfile(profile){
    return {
        type: SET_PROFILE,
        profile
    }
}

function setNoticeNew(noticeNew){
    return {
        type: SET_NOTICE_NEW,
        noticeNew
    }
}

function setNotificationNew(notificationNew){
    return {
        type: SET_NOTIFICATION_NEW,
        notificationNew
    }
}

function getLogout(){
    return (dispatch) => {
        dispatch(logout());
    }
}

function getSaveToken(token){
    return (dispatch) => {
        dispatch(saveToken(token))
    }
}

function getNoticeNew(noticeNew){
    return (dispatch) => {
        dispatch(setNoticeNew(noticeNew))
    }
}

function getNotificationNew(notificationNew){
    return (dispatch) => {
        dispatch(setNotificationNew(notificationNew))
    }
}

function getInitial(initial){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/initial/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                initial
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

function signUp(username, password, nickname, profile_image){
    return (dispatch) => {
        let formData = new FormData();
        if(profile_image){
            const temp = profile_image.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('profile_image',{
                uri: profile_image.uri,
                type: profile_image.type,
                name: `${uuidv1()}.` + ext
            })
        }
        formData.append('username', username)
        formData.append('email', username)
        formData.append('password1', password)
        formData.append('password2', password)
        formData.append('nickname', nickname)
        return fetch(`${FETCH_URL}/rest-auth/registration/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: formData
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

function checkEmail(email){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/email/?email=${email}`,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function checkNickname(nickname){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/nickname/?nickname=${nickname}`,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => json)
    }
}

function getProfile(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
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
        .then(json => dispatch(setProfile(json)))
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
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function getProfileByTokenReturn(token){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
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
        .then(json => {
            return json
        })
    }
}

function followUser(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/follow/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                userId
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

function unfollowUser(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/follow/`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                userId
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

function getNotice(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/?page=1`, {
            headers: {
                "Content-Type": "application/json",
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

function getNoticeMore(page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
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

function checkNoticeAll(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/check/`, {
            headers: {
                "Content-Type": "application/json",
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

function getNotification(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notification/?page=1`, {
            headers: {
                "Content-Type": "application/json",
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

function getNotificationMore(page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notification/?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
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

function checkNotice(noticeId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notice/check/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                noticeId
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 200){
                return true
            }
            else if(response.status === 201){
                return 'clear'
            }
            else{
                return false
            }
        })
        .then(json => json)
    }
}

function checkNotification(notificationId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notification/check/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                notificationId
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 200){
                return true
            }
            else if(response.status === 201){
                return 'clear'
            }
            else{
                return false
            }
        })
        .then(json => json)
    }
}

function checkNotificationAll(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/notification/check/`, {
            headers: {
                "Content-Type": "application/json",
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

function followerList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/follower/list/?userId=${userId}&page=1`, {
            headers: {
                "Content-Type": "application/json",
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

function followerListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/follower/list/?userId=${userId}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
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

function followingList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/following/list/?userId=${userId}&page=1`, {
            headers: {
                "Content-Type": "application/json",
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

function followingListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/following/list/?userId=${userId}&page=${page}`, {
            headers: {
                "Content-Type": "application/json",
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

function search(q){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/search/?q=${q}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(getLogout())
                return false
            }
            else if(response.status === 203){
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function recommended(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/recommended/`, {
            headers: {
                "Content-Type": "application/json",
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

function getReviewList(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/list/review/${userId}/?page=1`, {
            headers: {
                "Content-Type": "application/json",
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

function getReviewListMore(userId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/list/review/${userId}/?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
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

function changeNickname(nickname){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch(`${FETCH_URL}/api/users/change/nickname/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${token}`
            },
            body: JSON.stringify({
                nickname,
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function changeProfileImg(profileImg){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        let formData = new FormData();
        if(profileImg){
            const temp = profileImg.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('profileImg',{
                uri: profileImg.uri,
                type: profileImg.type,
                name: `${uuidv1()}.` + ext
            })
        }
        fetch(`${FETCH_URL}/api/users/change/profileimg/`, {
            method: 'PUT',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function changeProfile(nickname, profileImg, backgroundImg){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        let formData = new FormData();
        if(backgroundImg){
            const bgtemp = backgroundImg.type.split('/')
            const bgext = bgtemp[bgtemp.length - 1]
            formData.append('backgroundImg',{
                uri: backgroundImg.uri,
                type: backgroundImg.type,
                name: `${uuidv1()}.` + bgext
            })
        }
        if(profileImg){
            const pftemp = profileImg.type.split('/')
            const pfext = pftemp[pftemp.length - 1]
            formData.append('profileImg',{
                uri: profileImg.uri,
                type: profileImg.type,
                name: `${uuidv1()}.` + pfext
            })
        }
        if(nickname){
            formData.append('nickname', nickname)
        }
        fetch(`${FETCH_URL}/api/users/change/profile/`, {
            method: 'PUT',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function changeBackgroundImg(backgroundImg){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        let formData = new FormData();
        if(backgroundImg){
            const temp = backgroundImg.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('backgroundImg',{
                uri: backgroundImg.uri,
                type: backgroundImg.type,
                name: `${uuidv1()}.` + ext
            })
        }
        fetch(`${FETCH_URL}/api/users/change/backgroundimg/`, {
            method: 'PUT',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function addInfo(token, nickname, profileImg){
    return (dispatch, getState) => {
        let formData = new FormData();
        if(profileImg){
            const temp = profileImg.type.split('/')
            const ext = temp[temp.length - 1]
            formData.append('profileImg',{
                uri: profileImg.uri,
                type: profileImg.type,
                name: `${uuidv1()}.` + ext
            })
        }
        formData.append('nickname', nickname)
        fetch(`${FETCH_URL}/api/users/addinfo/`, {
            method: 'PUT',
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: formData
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => dispatch(setProfile(json)))
    }
}

function kakaoLogin(accessToken){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/login/kakao/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token: accessToken,
            })
        })
        .then(response => {
            return response.json()
        })
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
   };
}

function googleLogin(accessToken){
    return (dispatch) => {
        if(accessToken){
            return fetch(`${FETCH_URL}/api/users/login/google/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_token: accessToken,
                })
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if(json.token && json.user){
                    return {
                        token: json.token
                    }
                }
                else{
                    return false
                }
            })
        }
   };
}

function facebookLogin(accessToken){
    return (dispatch) => {
        if(accessToken){
            return fetch(`${FETCH_URL}/api/users/login/facebook/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_token: accessToken,
                })
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                if(json.token && json.user){
                    return {
                        token: json.token
                    }
                }
                else{
                    return false
                }
            })
        }
   };
}

function appleLogin(user, password){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/rest-auth/registration/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password1: password,
                password2: password
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
    };
}

function checkUsername(username){
    return (dispatch) => {
        return fetch(`${FETCH_URL}/api/users/check/username/?username=${username}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 200){
                return response.json()
            }
            else{
                return false
            }
        })
        .then(json => json)
    }
}

function getReplyList(reviewId){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/reply/?reviewId=${reviewId}&page=1`, {
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function getReplyListMore(reviewId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/reply/?reviewId=${reviewId}&page=${page}`, {
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
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

function getRepliesList(replyId, page){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/replies/?replyId=${replyId}&page=${page}`, {
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else if (response.status === 200){
                return response.json()
            }
            else{
                return false
            }
        })
        .then(json => json)
    }
}

function createReviewReply(reviewId, content){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/reply/`, {
            method: 'POST',
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reviewId,
                content
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function createReplyReply(replyId, content){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/statics/replies/`, {
            method: 'POST',
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                replyId,
                content
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function setPushToken(pushToken){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        return fetch(`${FETCH_URL}/api/users/push/token/`, {
            method: 'POST',
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pushToken
            })
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
                return false
            }
            else{
                return response.json()
            }
        })
        .then(json => json)
    }
}

function reportUser(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/report/user/?userId=${userId}`, {
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

function blockUser(userId){
    return (dispatch, getState) => {
        const { user : { token } } = getState()
        return fetch(`${FETCH_URL}/api/statics/block/user/?userId=${userId}`, {
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
    isLoggedIn: false,
    token: null,
    noticeNew: false,
    notificationNew: false,
};

function reducer(state = initialState, action){
    switch(action.type){
        case LOGOUT:
            return applyLogout(state, action);
        case SAVE_TOKEN:
            return applySaveToken(state, action);
        case SET_PROFILE:
            return applySetProfile(state, action);
        case SET_NOTICE_NEW:
            return applySetNoticeNew(state, action);
        case SET_NOTIFICATION_NEW:
            return applySetNotificationNew(state, action);
        default:
           return state;
    }
}

function applyLogout(state, action){
    return {
        isLoggedIn: false
    };
};

function applySaveToken(state, action){
    const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token
    };
}

function applySetProfile(state, action){
    const { profile } = action;
    return {
        ...state,
        profile
    }
}

function applySetNoticeNew(state, action){
    const { noticeNew } = action;
    return {
        ...state,
        noticeNew
    }
}

function applySetNotificationNew(state, action){
    const { notificationNew } = action;
    return {
        ...state,
        notificationNew
    }
}

const actionCreators = {
    getLogout,
    getSaveToken,
    getProfile,
    getProfileByToken,
    getProfileByTokenReturn,
    signUp,
    login,
    checkEmail,
    checkNickname,
    followUser,
    unfollowUser,
    getInitial,
    getNotice,
    getNoticeMore,
    checkNotice,
    checkNoticeAll,
    followerList,
    followerListMore,
    followingList,
    followingListMore,
    search,
    recommended,
    getReviewList,
    getReviewListMore,
    changeNickname,
    changeProfileImg,
    changeBackgroundImg,
    changeProfile,
    addInfo,
    kakaoLogin,
    getNotification,
    getNotificationMore,
    checkNotification,
    checkNotificationAll,
    googleLogin,
    facebookLogin,
    appleLogin,
    getReplyList,
    getReplyListMore,
    getRepliesList,
    createReviewReply,
    createReplyReply,
    setPushToken,
    getNoticeNew,
    getNotificationNew,
    reportUser,
    checkUsername,
    blockUser
}

export { actionCreators }

export default reducer;   
import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        login: (email, password) => {
            return dispatch(userAction.login(email, password))
        },
        getProfileByToken: (token) => {
            dispatch(userAction.getProfileByToken(token))
        },
        getSaveToken: (token) => {
            dispatch(userAction.getSaveToken(token))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goSignUp: (goRequest, photographerId) => {
            dispatch(push({
                pathname: `/signup/`,
                state: { 
                    goRequest,
                    photographerId
                }
            }))
        },
        goDetail: (photographerId) => {
            dispatch(push({
                pathname: `/photographer/${photographerId}/`,
                state: { 
                    isConfirmPage: true,
                    fromAuth: true
                }
            }))
        },
        getNotificationByToken: (token) => {
            dispatch(userAction.getNotificationByToken(token))
        },
        getOrderListByToken: (token) => {
            dispatch(userAction.getOrderListByToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
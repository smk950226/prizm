import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';
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
            return dispatch(userActions.login(email, password))
        },
        getProfileByToken: (token) => {
            dispatch(userActions.getProfileByToken(token))
        },
        getSaveToken: (token) => {
            dispatch(userActions.getSaveToken(token))
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
            dispatch(userActions.getNotificationByToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        checkDuplicate: (email, mobile, countryNumber) => {
            return dispatch(userAction.checkDuplicate(email, mobile, countryNumber))
        },
        signUp: (email, password, firstName, lastName, countryNumber, countryCode, mobile) => {
            return dispatch(userAction.signUp(email, password, firstName, lastName, countryNumber, countryCode, mobile))
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
        goSignUpClear: () => {
            dispatch(push('/signup/clear/'))
        },
        goSignIn: (goRequest, photographerId) => {
            dispatch(push({
                pathname: `/signin/`,
                state: { 
                    goRequest,
                    photographerId
                }
            }))
        },
        goDetail: (photographerId) => {
            dispatch(push({
                pathname: `/${photographerId}/`,
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
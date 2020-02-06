import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile } } = state;
    return {
        isLoggedIn,
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
        getNotificationByToken: (token) => {
            dispatch(userAction.getNotificationByToken(token))
        },
        getOrderListByToken: (token) => {
            dispatch(userAction.getOrderListByToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
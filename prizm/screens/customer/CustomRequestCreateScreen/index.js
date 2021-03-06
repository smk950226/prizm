import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';
import { actionCreators as customerAction } from '../../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile } } = state;
    return {
        isLoggedIn,
        profile
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
        checkDuplicate: (email, mobile, countryNumber) => {
            return dispatch(userAction.checkDuplicate(email, mobile, countryNumber))
        },
        signUp: (email, password, firstName, lastName, countryNumber, countryCode, mobile) => {
            return dispatch(userAction.signUp(email, password, firstName, lastName, countryNumber, countryCode, mobile))
        },
        getNotificationByToken: (token) => {
            dispatch(userAction.getNotificationByToken(token))
        },
        getOrderListByToken: (token) => {
            dispatch(userAction.getOrderListByToken(token))
        },
        checkMessageByToken: (token) => {
            dispatch(userAction.checkMessageByToken(token))
        },
        createCustomRequest: (photograpyType, person, hour, dateOption, selectedDate, selectedHour, selectedMin, startDate, endDate, locationOption, locations) => {
            return dispatch(customerAction.createCustomRequest(photograpyType, person, hour, dateOption, selectedDate, selectedHour, selectedMin, startDate, endDate, locationOption, locations))
        },
        createCustomRequestByToken: (token, photograpyType, person, hour, dateOption, selectedDate, selectedHour, selectedMin, startDate, endDate, locationOption, locations) => {
            return dispatch(customerAction.createCustomRequestByToken(token, photograpyType, person, hour, dateOption, selectedDate, selectedHour, selectedMin, startDate, endDate, locationOption, locations))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        },
        getOrderDetail: (orderId) => {
            return dispatch(userAction.getOrderDetail(orderId))
        },
        cancelCustomRequest: (requestId) => {
            return dispatch(customerAction.cancelCustomRequest(requestId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
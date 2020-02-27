import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { isLoggedIn, profile }, i18nState : { lang } } = state;
    return {
        pathname: location.pathname,
        isLoggedIn,
        profile,
        lang
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
        goHome: () => {
            window.location.reload()
        },
        goCustomRequest: () => {
            dispatch(push('/'))
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
        goPayment: (order) => {
            dispatch(push({
                pathname: '/payment/',
                state: {
                    order
                }
            }))
        },
        cancelCustomRequest: (requestId) => {
            return dispatch(customerAction.cancelCustomRequest(requestId))
        },
        goRequestOrderList: (requestId) => {
            dispatch(push({
                pathname: '/custom/request/order/list/',
                state: {
                    requestId
                }
            }))
        },
        goSignin: () => {
            dispatch(push('/signin/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
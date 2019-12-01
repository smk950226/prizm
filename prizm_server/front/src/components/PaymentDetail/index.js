import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        pathname: location.pathname,
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        createDeposit: (name, price, orderId) => {
            return dispatch(customerAction.createDeposit(name, price, orderId))
        },
        paymentExpire: (orderId) => {
            return dispatch(customerAction.paymentExpire(orderId))
        },
        refresh: () => {
            dispatch(userAction.getNotification())
            dispatch(userAction.getOrderList())
            dispatch(userAction.getChatList())
        },
        goPaymentSuccess: (isDeposit) => {
            dispatch(push({
                pathname: '/payment/success/',
                state: {
                    isDeposit
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
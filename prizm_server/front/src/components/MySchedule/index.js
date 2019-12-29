import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { orderList, isLoggedIn, profile }, router : { location } } = state;
    return {
        orderList,
        pathname: location.pathname,
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOrderList: () => {
            dispatch(userAction.getOrderList())
        },
        getOrderListMore: (page) => {
            return dispatch(userAction.getOrderListMore(page))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goMyScheduleDetail: (orderId, order) => {
            dispatch(push({
                pathname: `/my/schedule/${orderId}/`,
                state: {
                    order
                }
            }))
        },
        goPayment: (order) => {
            dispatch(push({
                pathname: '/payment/',
                state: {
                    order
                }
            }))
        },
        goReveiwCreate: (order) => {
            dispatch(push({
                pathname: '/review/create/',
                state: {
                    order
                }
            }))
        },
        checkNotification: () => {
            dispatch(userAction.checkNotification())
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
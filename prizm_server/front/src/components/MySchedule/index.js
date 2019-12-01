import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { orderList, isLoggedIn }, router : { location } } = state;
    return {
        orderList,
        pathname: location.pathname,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOrderList: () => {
            dispatch(userAction.getOrderList())
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
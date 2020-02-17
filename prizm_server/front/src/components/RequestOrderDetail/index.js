import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { isLoggedIn } } = state;
    return {
        pathname: location.pathname,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        goRequestOrderList: (requestId) => {
            dispatch(push({
                pathname: '/custom/request/order/list/',
                state: {
                    requestId
                }
            }))
        },
        responsetToRequsetOrder: (orderId, selectedTime) => {
            return dispatch(customerAction.responsetToRequsetOrder(orderId, selectedTime))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
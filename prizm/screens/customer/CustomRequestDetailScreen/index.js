import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../../redux/modules/customer';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn } } = state;
    return {
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        responsetToRequsetOrder: (orderId, selectedTime) => {
            return dispatch(customerAction.responsetToRequsetOrder(orderId, selectedTime))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        },
        getOrderList: () => {
            dispatch(userAction.getOrderList())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
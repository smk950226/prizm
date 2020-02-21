import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { orderList, isLoggedIn, profile } } = state;
    return {
        orderList,
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
        checkNotification: () => {
            dispatch(userAction.checkNotification())
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
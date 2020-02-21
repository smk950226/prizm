import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn } } = state;
    return {
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOrderDetail: (orderId) => {
            return dispatch(userAction.getOrderDetail(orderId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
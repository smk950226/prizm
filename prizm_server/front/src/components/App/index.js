import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile, isLoggedIn, notification, orderList }, router : { location } } = state;
    return {
        profile,
        isLoggedIn,
        pathname: location.pathname,
        notification,
        orderList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initApp: () => {
            dispatch(userAction.getProfile())
            dispatch(userAction.getNotification())
            dispatch(userAction.getOrderList())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
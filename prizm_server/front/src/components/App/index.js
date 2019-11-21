import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile, isLoggedIn, notification, orderList, chatList }, router : { location }, admin: { photographer } } = state;
    return {
        profile,
        isLoggedIn,
        pathname: location.pathname,
        notification,
        orderList,
        photographer,
        chatList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initApp: () => {
            dispatch(userAction.getProfile())
            dispatch(userAction.getNotification())
            dispatch(userAction.getOrderList())
            dispatch(userAction.getChatList())
        },
        initAdmin: () => {
            dispatch(userAction.getProfile())
            dispatch(adminAction.getPhotographer())
            dispatch(userAction.getChatList())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile, isLoggedIn, notification, newMessage }, router : { location }, admin: { photographer } } = state;
    return {
        profile,
        isLoggedIn,
        pathname: location.pathname,
        notification,
        photographer,
        newMessage
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        initApp: () => {
            dispatch(userAction.getProfile())
            dispatch(userAction.getNotification())
            dispatch(userAction.checkMessage())
        },
        initAdmin: () => {
            dispatch(userAction.getProfile())
            dispatch(adminAction.getPhotographer())
            dispatch(userAction.checkMessage())
        },
        goHome: () => {
            dispatch(push('/'))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile, notification }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        notification,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        logout: () => {
            dispatch(userAction.getLogout())
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goSignUp: () => {
            dispatch(push('/signup/'))
        },
        goMySchedule: () => {
            dispatch(push('/my/schedule/'))
        },
        goProfile: () => {
            dispatch(push('/profile/'))
        },
        goMyPhotos: () => {
            dispatch(push('/my/photos/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
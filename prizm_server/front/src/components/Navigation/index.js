import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile, notification }, router : { location } } = state;
    return {
        isLoggedIn,
        profile,
        pathname: location.pathname,
        notification
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        logout: () => {
            dispatch(userActions.getLogout())
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goSignUp: () => {
            dispatch(push('/signup/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
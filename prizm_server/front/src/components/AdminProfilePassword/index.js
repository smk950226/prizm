import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        editPassword: (currentPassword, password) => {
            return dispatch(userAction.editPassword(currentPassword, password))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        },
        goProfile: () => {
            dispatch(push('/profile/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
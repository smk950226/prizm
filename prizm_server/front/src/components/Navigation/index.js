import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
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
        goProfileMenu: () => {
            dispatch(push('/menu/profile/'))
        },
        goTerms: (name) => {
            dispatch(push(`/terms/${name}/`))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
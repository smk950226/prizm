import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location }, admin : { photographer } } = state;
    return {
        isLoggedIn,
        profile,
        pathname: location.pathname,
        photographer
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
        goMenu: () => {
            dispatch(push('/menu/'))
        },
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goSignUp: () => {
            dispatch(push('/signup/'))
        },
        goReservation: () => {
            dispatch(push('/reservation/'))
        },
        logout: () => {
            dispatch(userAction.getLogout())
        },
        goTouristPhoto: () => {
            dispatch(push('/tourist/photo/'))
        },
        goStudioSetting: () => {
            dispatch(push('/studio/edit/'))
        },
        goProfile: () => {
            dispatch(push('/profile/'))
        },
        goAccount: () => {
            dispatch(push('/profile/account/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
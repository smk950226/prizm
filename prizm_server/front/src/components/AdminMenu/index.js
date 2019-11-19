import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location }, admin : { photographer } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        photographer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goSignUp: () => {
            dispatch(push('/signup/'))
        },
        goReservation: () => {
            dispatch(push('/reservation/'))
        },
        goHome: () => {
            dispatch(push('/'))
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
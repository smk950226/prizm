import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';
import { setLanguage } from "redux-i18n";

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile, notification }, router : { location }, i18nState : { lang } } = state;
    return {
        isLoggedIn,
        profile,
        pathname: location.pathname,
        notification,
        lang
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
        goMyPhotos: () => {
            dispatch(push('/my/photos/'))
        },
        goProfile: () => {
            dispatch(push('/profile/'))
        },
        goTerms: (name) => {
            dispatch(push(`/terms/${name}/`))
        },
        goDescription: (menu) => {
            dispatch(push({
                pathname: '/description/',
                state: {
                    menu
                }
            }))
        },
        changeLang: (lang) => {
            dispatch(setLanguage(lang))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
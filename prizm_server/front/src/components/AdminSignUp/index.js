import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location }, admin : { photographer }, i18nState : { lang } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile,
        photographer,
        lang
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        checkDuplicate: (email, mobile, countryNumber, instagram) => {
            return dispatch(userAction.checkDuplicate(email, mobile, countryNumber, instagram))
        },
        signUpAdmin: (email, password, firstName, lastName, countryNumber, countryCode, mobile, instagram, userType) => {
            return dispatch(userAction.signUpAdmin(email, password, firstName, lastName, countryNumber, countryCode, mobile, instagram, userType))
        },
        getProfileByToken: (token) => {
            dispatch(userAction.getProfileByToken(token))
        },
        getSaveToken: (token) => {
            dispatch(userAction.getSaveToken(token))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goReservation: () => {
            dispatch(push('/reservation/'))
        },
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goStudioSettingCreate: () => {
            dispatch(push('/studio/create/'))
        },
        getPhotographerByToken: (token) => {
            dispatch(adminAction.getPhotographerByToken(token))
        },
        getSetPhotographer: (photographer) => {
            dispatch(adminAction.getSetPhotographer(photographer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
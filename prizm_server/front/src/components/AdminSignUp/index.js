import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        checkDuplicate: (email, mobile, countryNumber) => {
            return dispatch(userAction.checkDuplicate(email, mobile, countryNumber))
        },
        signUpAdmin: (email, password, name, birth, countryNumber, mobile, instagram, userType) => {
            return dispatch(userAction.signUpAdmin(email, password, name, birth, countryNumber, mobile, instagram, userType))
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
        getPhotographerByToken: (token) => {
            dispatch(adminAction.getPhotographerByToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
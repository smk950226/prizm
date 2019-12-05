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
        login: (email, password) => {
            return dispatch(userAction.login(email, password))
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
        goSignUp: () => {
            dispatch(push(`/signin/`))
        },
        checkPhotographer: (token) => {
            return dispatch(userAction.checkPhotographer(token))
        },
        getPhotographerByToken: (token) => {
            dispatch(adminAction.getPhotographerByToken(token))
        },
        checkMessageByToken: (token) => {
            dispatch(userAction.checkMessageByToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
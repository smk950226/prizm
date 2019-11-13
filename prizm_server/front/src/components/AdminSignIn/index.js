import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
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
        goSignUp: () => {
            dispatch(push(`/signin/`))
        },
        checkPhotographer: (token) => {
            return dispatch(userAction.checkPhotographer(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';
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
        findPasswordUrl: (uuid) => {
            return dispatch(userActions.findPasswordUrl(uuid))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        findPasswordResult: (uuid, email, password1, password2) => {
            return dispatch(userActions.findPasswordResult(uuid, email, password1, password2))
        },
        goSignin: () => {
            dispatch(push('/signin/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
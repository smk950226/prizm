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
        findPassword: (email) => {
            return dispatch(userActions.findPassword(email))
        },
        goSignin: () => {
            dispatch(push('/signin/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
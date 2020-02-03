import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
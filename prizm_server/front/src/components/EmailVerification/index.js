import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { profile, isLoggedIn } } = state;
    return {
        pathname: location.pathname,
        profile,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        emailVerification: (uuid) => {
            return dispatch(userAction.emailVerification(uuid))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
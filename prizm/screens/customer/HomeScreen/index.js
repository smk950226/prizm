import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../../redux/modules/user';
import { actionCreators as customerActions } from '../../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile } } = state;
    return {
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getProfile: () => {
            dispatch(userActions.getProfile())
        },
        cancelCustomRequest: (requestId) => {
            return dispatch(customerActions.cancelCustomRequest(requestId))
        },
        sendVerificationEmail: () => {
            return dispatch(userActions.sendVerificationEmail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
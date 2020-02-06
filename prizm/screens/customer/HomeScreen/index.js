import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';
import { actionCreators as customerAction } from '../../../redux/modules/customer';

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
            dispatch(userAction.getProfile())
        },
        cancelCustomRequest: (requestId) => {
            return dispatch(customerAction.cancelCustomRequest(requestId))
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
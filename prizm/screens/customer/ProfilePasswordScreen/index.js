import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn } } = state;
    return {
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        editPassword: (currentPassword, password) => {
            return dispatch(userAction.editPassword(currentPassword, password))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
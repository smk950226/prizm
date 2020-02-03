import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../../redux/modules/user';

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
            dispatch(userActions.getProfile());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
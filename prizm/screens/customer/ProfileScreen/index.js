import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile } } = state;
    return {
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        editProfile: (firstName, lastName, countryNumber, mobile) => {
            return dispatch(userAction.editProfile(firstName, lastName, countryNumber, mobile))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
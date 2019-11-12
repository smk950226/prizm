import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        isLoggedIn,
        profile,
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        editProfile: (name, countryNumber, mobile, birth, countryCode) => {
            return dispatch(userAction.editProfile(name, countryNumber, mobile, birth, countryCode))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
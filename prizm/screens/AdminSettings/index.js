import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { isLoggedIn } } = state;
    return{
        pathname: location.pathname,
        isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        goProfile: () => {
            dispatch(push('/profile/'))
        },
        goAccount: () => {
            dispatch(push('/profile/account/'))
        },
        logout: () => {
            dispatch(userAction.getLogout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
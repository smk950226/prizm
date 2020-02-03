import { connect } from 'react-redux';
import AppContainer from './presenter';
import { actionCreators as userActions } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile, appType } } = state;
    return {
        isLoggedIn,
        profile,
        appType
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        logout: () => {
            dispatch(userActions.getLogout());
        },
        initApp: () => {
            dispatch(userActions.getProfile())
        },
        setPushToken: (pushToken) => {
            return dispatch(userActions.setPushToken(pushToken))
        },
        getAppType: (appType) => {
            dispatch(userActions.getAppType(appType))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
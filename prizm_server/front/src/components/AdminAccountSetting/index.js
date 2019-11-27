import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location }, admin : { photographer } } = state;
    return {
        isLoggedIn,
        profile,
        photographer,
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        editAccount: (legalName, birth, accountType, content) => {
            return dispatch(adminAction.editAccount(legalName, birth, accountType, content))
        },
        getPhotographer: () => {
            dispatch(adminAction.getPhotographer())
        },
        goPasswordChange: () => {
            dispatch(push('/profile/password/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
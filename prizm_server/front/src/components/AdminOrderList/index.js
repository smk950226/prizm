import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { isLoggedIn, profile } } = state;
    return{
        pathname: location.pathname,
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getAdminOrderList: () => {
            return dispatch(adminAction.getAdminOrderList())
        },
        goHome: () => {
            dispatch(push('/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
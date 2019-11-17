import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location }, admin : { photographer } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile,
        photographer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        geocoding: (address) => {
            return dispatch(adminAction.geocoding(address))
        },
        locationDetail: (placecId) => {
            return dispatch(adminAction.locationDetail(placecId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
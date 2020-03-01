import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { isLoggedIn, profile }, admin : { photographer } } = state;
    return{
        pathname: location.pathname,
        isLoggedIn,
        profile,
        photographer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goReservation: () => {
            dispatch(push('/reservation/'))
        },
        goStudioSetting: () => {
            dispatch(push('/studio/edit/'))
        },
        goHome: () => {
            dispatch(push('/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
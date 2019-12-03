import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname
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
        goProfileMenu: () => {
            dispatch(push('/menu/profile/'))
        },
        goMessage: () => {
            dispatch(push('/message/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
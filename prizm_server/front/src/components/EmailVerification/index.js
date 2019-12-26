import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        emailVerification: (uuid) => {
            return dispatch(userAction.emailVerification(uuid))
        },
        goHome: () => {
            dispatch(push('/'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
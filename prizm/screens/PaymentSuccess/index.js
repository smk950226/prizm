import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        paymentSuccess: (impUid, merchantUid, impSuccess) => {
            return dispatch(customerAction.paymentSuccess(impUid, merchantUid, impSuccess))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
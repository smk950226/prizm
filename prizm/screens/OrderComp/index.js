import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return{
        pathname: location.pathname,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        responseToOrder: (orderId, option, availableTime) => {
            return dispatch(adminAction.responseToOrder(orderId, option, availableTime))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
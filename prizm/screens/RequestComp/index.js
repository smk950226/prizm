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
        createRequestOrder: (requestId, location, availableTime, price) => {
            return dispatch(adminAction.createRequestOrder(requestId, location, availableTime, price))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
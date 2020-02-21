import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { user : { profile } } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getRequestOrderList: (requestId) => {
            return dispatch(customerAction.getRequestOrderList(requestId))
        },
        getRequestOrderListMore: (requestId, page) => {
            return dispatch(customerAction.getRequestOrderListMore(requestId, page))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
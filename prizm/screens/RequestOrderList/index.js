import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { profile } } = state;
    return {
        pathname: location.pathname,
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
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goRequestOrderDetail: (order) => {
            dispatch(push({
                pathname: '/custom/request/order/detail/',
                state: {
                    order
                }
            }))
        },
        goCustomRequest: () => {
            dispatch(push('/'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
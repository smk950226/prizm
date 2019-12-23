import { connect } from 'react-redux';
import Container from './container';
import { push } from 'react-router-redux';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { actionCreators as userAction } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, user : { profile } } = state;
    return {
        pathname: location.pathname,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goCustomRequestCreate: () => {
            dispatch(push('/custom/request/create/'))
        },
        cancelCustomRequest: (requestId) => {
            return dispatch(customerAction.cancelCustomRequest(requestId))
        },
        goSignin: () => {
            dispatch(push('/signin/'))
        },
        getProfile: () => {
            dispatch(userAction.getProfile())
        },
        goRequestOrderList: (requestId) => {
            dispatch(push({
                pathname: '/custom/request/order/list/',
                state: {
                    requestId
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
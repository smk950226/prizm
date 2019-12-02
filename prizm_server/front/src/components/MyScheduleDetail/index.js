import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location } } = state;
    return {
        pathname: location.pathname,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOrderDetail: (orderId) => {
            dispatch(userAction.getOrderDetail(orderId))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goPayment: (order) => {
            dispatch(push({
                pathname: '/payment/',
                state: {
                    order
                }
            }))
        },
        goReveiwCreate: (order) => {
            dispatch(push({
                pathname: '/review/create/',
                state: {
                    order
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
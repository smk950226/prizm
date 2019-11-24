import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
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
        goHome: () => {
            dispatch(push('/'))
        },
        getOrderPhotoList: (orderId) => {
            return dispatch(customerAction.getOrderImage(orderId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
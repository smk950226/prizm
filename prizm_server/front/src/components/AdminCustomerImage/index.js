import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOrderImage: (orderId) => {
            return dispatch(adminAction.getOrderImage(orderId))
        },
        uploadOrderImage: (images, orderId) => {
            return dispatch(adminAction.uploadOrderImage(images, orderId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
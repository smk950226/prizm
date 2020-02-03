import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        createReview: (photographerId, orderId, rate, comment) => {
            return dispatch(customerAction.createReview(photographerId, orderId, rate, comment))
        },
        goReviewCreateComplete: () => {
            dispatch(push('/review/complete/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
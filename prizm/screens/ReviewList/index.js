import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getReviewList: (photographerId) => {
            return dispatch(customerAction.getReviewList(photographerId))
        },
        getReviewListMore: (photographerId, page) => {
            return dispatch(customerAction.getReviewListMore(photographerId, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
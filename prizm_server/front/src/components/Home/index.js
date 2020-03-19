import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { customer : { photographerList }, router : { location } } = state;
    return {
        photographerList,
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getPhotographerList: () => {
            dispatch(customerAction.getPhotographerList())
        },
        getPhotographerListMore: (page) => {
            return dispatch(customerAction.getPhotographerListMore(page))
        },
        getPhotographerPortfoliomore: (photographerId) => {
            return dispatch(customerAction.getPhotographerPortfoliomore(photographerId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
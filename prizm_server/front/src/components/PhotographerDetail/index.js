import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getPhotographerDetail: (photographerId) => {
            return dispatch(customerAction.getPhotographerDetail(photographerId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
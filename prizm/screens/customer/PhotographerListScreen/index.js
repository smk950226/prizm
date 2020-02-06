import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../../redux/modules/customer';

const mapStateToProps = (state, ownProps) => {
    const { customer : { photographerList } } = state;
    return {
        photographerList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getPhotographerList: () => {
            dispatch(customerAction.getPhotographerList())
        },
        getPhotographerListMore: (page) => {
            return dispatch(customerAction.getPhotographerListMore(page))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
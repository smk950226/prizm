import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../../redux/modules/customer';
import { actionCreators as userAction } from '../../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { customer : { request }, user : { isLoggedIn, profile } } = state;
    return {
        request,
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getPhotographerDetail: (photographerId) => {
            return dispatch(customerAction.getPhotographerDetail(photographerId))
        },
        createRequest: (photographerId, locationId, optionId, comment, dateOption, date, hour, min, startDate, endDate) => {
            return dispatch(customerAction.createRequest(photographerId, locationId, optionId, comment, dateOption, date, hour, min, startDate, endDate))
        },
        getRequest: (request) => {
            dispatch(customerAction.getRequest(request))
        },
        removeRequest: () => {
            dispatch(customerAction.removeRequest())
        },
        getOrderList: () => {
            dispatch(userAction.getOrderList())
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
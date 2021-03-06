import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as customerAction } from '../../redux/modules/customer';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location }, customer : { request }, user : { isLoggedIn, profile } } = state;
    return {
        pathname: location.pathname,
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
        goSignUp: (photographerId) => {
            dispatch(push({
                pathname: `/signup/`,
                state: { 
                    goRequest: true,
                    photographerId
                }
            }))
        },
        removeRequest: () => {
            dispatch(customerAction.removeRequest())
        },
        goHome: () => {
            dispatch(push('/'))
        },
        getOrderList: () => {
            dispatch(userAction.getOrderList())
        },
        goReviewList: (photographerId) => {
            dispatch(push({
                pathname: '/review/list/',
                state: {
                    photographerId
                }
            }))
        },
        sendVerificationEmail: () => {
            return dispatch(userAction.sendVerificationEmail())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
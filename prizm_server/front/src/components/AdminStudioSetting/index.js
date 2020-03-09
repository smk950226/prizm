import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { actionCreators as adminAction } from '../../redux/modules/admin';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location }, admin : { photographer }, i18nState : { lang } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile,
        photographer,
        lang
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        geocoding: (address) => {
            return dispatch(adminAction.geocoding(address))
        },
        locationDetail: (placecId) => {
            return dispatch(adminAction.locationDetail(placecId))
        },
        updateStudio: (portfolios, nickname, mainLocation, equipment, career, description, profileImage, locations, options, studioId, update) => {
            return dispatch(adminAction.updateStudio(portfolios, nickname, mainLocation, equipment, career, description, profileImage, locations, options, studioId, update))
        },
        getPhotographer: () => {
            dispatch(adminAction.getPhotographer())
        },
        goClear: (studioId) => {
            dispatch(push({
                pathname: '/studio/edit/complete/',
                state: {
                    valid: true,
                    studioId
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        checkDuplicate: (email, mobile, countryNumber) => {
            return dispatch(userActions.checkDuplicate(email, mobile, countryNumber))
        },
        signUp: (email, password, name, birth, countryNumber, countryCode, mobile) => {
            return dispatch(userActions.signUp(email, password, name, birth, countryNumber, countryCode, mobile))
        },
        getProfileByToken: (token) => {
            dispatch(userActions.getProfileByToken(token))
        },
        getSaveToken: (token) => {
            dispatch(userActions.getSaveToken(token))
        },
        goHome: () => {
            dispatch(push('/'))
        },
        goSignIn: (goRequest) => {
            dispatch(push({
                pathname: `/signin/`,
                state: { goRequest }
            }))
        },
        goSignIn: (goRequest, photographerId) => {
            dispatch(push({
                pathname: `/signin/`,
                state: { 
                    goRequest,
                    photographerId
                }
            }))
        },
        goDetail: (photographerId) => {
            dispatch(push({
                pathname: `/photographer/${photographerId}/`,
                state: { 
                    isConfirmPage: true,
                    fromAuth: true
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
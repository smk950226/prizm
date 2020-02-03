import { connect } from 'react-redux';
import Container from './container';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location }, user : { profile }, admin : { photographer } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        profile,
        photographer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goSignUp: () => {
            dispatch(push('/signup/'))
        },
        goReservation: () => {
            dispatch(push('/reservation/'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
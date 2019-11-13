import { connect } from 'react-redux';
import Container from './container';
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
        goSignIn: () => {
            dispatch(push('/signin/'))
        },
        goSignUp: () => {
            dispatch(push('/signup/'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
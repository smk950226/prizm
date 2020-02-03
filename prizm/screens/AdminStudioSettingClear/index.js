import { connect } from 'react-redux';
import Container from './container';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn }, router : { location }, admin : { photographer } } = state;
    return {
        isLoggedIn,
        pathname: location.pathname,
        photographer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
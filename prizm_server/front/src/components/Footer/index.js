import { connect } from 'react-redux';
import Container from './container';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goTerms: (name) => {
            dispatch(push(`/terms/${name}/`))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
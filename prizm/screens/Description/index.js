import { connect } from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname,
    }
}

export default connect(mapStateToProps)(Container);
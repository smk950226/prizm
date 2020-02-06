import { connect } from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn } } = state;
    return {
        isLoggedIn
    }
}

export default connect(mapStateToProps)(Container);
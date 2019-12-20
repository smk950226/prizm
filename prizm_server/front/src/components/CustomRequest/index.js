import { connect } from 'react-redux';
import Container from './container';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return {
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goCustomRequestCreate: () => {
            dispatch(push('/custom/request/create/'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
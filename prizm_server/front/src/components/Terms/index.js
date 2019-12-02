import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { router : { location } } = state;
    return{
        pathname: location.pathname
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getTerm: (name) => {
            return dispatch(userAction.getTerm(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
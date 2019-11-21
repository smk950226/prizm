import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, profile }, router : { location } } = state;
    return {
        pathname: location.pathname,
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        getMessages: (chatId) => {
            return dispatch(userAction.getMessages(chatId))
        },
        getMessagesMore: (chatId, page) => {
            return dispatch(userAction.getMessagesMore(chatId, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
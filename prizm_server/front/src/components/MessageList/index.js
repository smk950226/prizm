import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userAction } from '../../redux/modules/user';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { isLoggedIn, chatList }, router : { location } } = state;
    return {
        pathname: location.pathname,
        isLoggedIn,
        chatList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        goHome: () => {
            dispatch(push('/'))
        },
        getChatList: () => {
            dispatch(userAction.getChatList())
        },
        getChatListMore: (page) => {
            return dispatch(userAction.getChatListMore(page))
        },
        goMessageDetail: (chatId, order) => {
            dispatch(push({
                pathname: `/message/detail/${chatId}/`,
                state: {
                    order
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
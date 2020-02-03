import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageList from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        getChatList: PropTypes.func.isRequired,
        getChatListMore: PropTypes.func.isRequired,
        chatList: PropTypes.array,
        goMessageDetail: PropTypes.func.isRequired,
        getCheckNewMessage: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { chatList } = props;
        this.state = {
            loading: true,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            fetchedChatList: false,
            fetchClear: false,
            chatList
        }
    }

    componentDidMount = async() => {
        const { getChatList, isLoggedIn, goHome, chatList } = this.props;

        if(!isLoggedIn){
            goHome()
        }
        else{
            if(chatList){
                this.setState({
                    loading: false,
                    fetchClear: true
                })
            }
            else{
                await getChatList();
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedChatList } = prevState;
        if(!fetchedChatList){
            let update = {}
            if(nextProps.chatList){
                update.fetchedChatList = true
                update.chatList = nextProps.chatList
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedChatList && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    _chatListMore = async() => {
        const { page, isLoadingMore, hasNextPage } = this.state;
        const { getChatListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getChatListMore(page+1)
                if(result){
                    this.setState({
                        page: page+1,
                        chatList: [...this.state.chatList, ...result]
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
                else{
                    this.setState({
                        hasNextPage: false
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
            }
        }
    }

    // _refreshChat = (chatId, exist_new_message) => {
    //     const { chatList } = this.state;
    //     const { getCheckNewMessage } = this.props;
    //     let newChatList = []
    //     let newChatroomCount = false
    //     chatList.map(chat => {
    //         if(chat.id === chatId){
    //             newChatList.push({
    //                 ...chat,
    //                 exist_new_message
    //             })
    //             if(exist_new_message){
    //                 newChatroomCount = true
    //             }
    //         }
    //         else{
    //             newChatList.push(chat)
    //             if(chat.exist_new_message){
    //                 newChatroomCount = true
    //             }
    //         }
    //     })
    //     this.setState({
    //         chatList: newChatList
    //     })
    //     getCheckNewMessage(newChatroomCount)
    // }

    render(){
        const { chatList } = this.state;
        return(
            <MessageList 
            {...this.props} 
            {...this.state} 
            chatListMore={this._chatListMore}
            chatList={chatList}
            />
        )
    }
}

export default Container;
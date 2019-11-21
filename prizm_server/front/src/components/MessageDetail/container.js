import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageList from './presenter';
import WebSocketInstance from '../../utils/WebSocket';


class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired,
        getMessagesMore: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    initialize = (chatId) => {
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this), this.moreMessage.bind(this));
            WebSocketInstance.fetchMessages(chatId)
        })

        WebSocketInstance.connect(chatId)
    }

    constructor(props){
        super(props)
        const { match : { params : { chatId } } } = props;
        this.state = {
            loading: true,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            chatId,
            messages: [],
            nickname: props.location.state ? props.location.state.order ? props.location.state.order.photographer.nickname : null : null,
            profileImage: props.location.state ? props.location.state.order ? props.location.state.order.photographer.profile_image : null : null,
            toUser: props.location.state ? props.location.state.order ? props.location.state.order.photographer.user.id : null : null,
            photographer: props.location.state ? props.location.state.order ? props.location.state.order.photographer : null : null,
            order: props.location.state ? props.location.state.order ? props.location.state.order : null : null,
            text: "",
            messageType: 'normal',
            added: false,
            showMap: false
        }

        this.initialize(chatId)
    }

    waitForSocketConnection(callback){
        const component = this;
        setTimeout(
            function(){
                if(WebSocketInstance.state() === 1){
                    console.log('connection is secure')
                    callback()
                    return;
                }
                else{
                    console.log('waiting for conenction');
                    component.waitForSocketConnection(callback)
                }
            }, 100
        )
    }

    setMessages(messages){
        this.setState({
            messages: messages.reverse(),
            loading: false
        })
    }

    addMessage(message){
        this.setState({
            messages: [...this.state.messages, message],
            added: true
        })
    }

    moreMessage(messages, hasNextPage){
        if(hasNextPage){
            this.setState({
                messages: [...messages.reverse(), ...this.state.messages],
                isLoadingMore: false,
                page: this.state.page + 1,
                hasNextPage
            })
        }
        else{
            this.setState({
                messages: [...messages.reverse(), ...this.state.messages],
                isLoadingMore: false,
                hasNextPage
            })
        }
        
    }

    _handleAdded = () => {
        this.setState({
            added: false
        })
    }

    componentDidMount = async() => {
        const { isLoggedIn, goHome } = this.props;
        const { chatId, nickname, toUser } = this.state;
        if(!isLoggedIn){
            goHome()
        }
        else if(chatId && nickname && toUser){
            
        }
        else{
            goHome()
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.match.params.chatId !== this.props.match.params.chatId){
            WebSocketInstance.disconnect()
            this.initialize(this.props.match.params.chatId)
        }
    }

    componentWillUnmount = () => {
        WebSocketInstance.disconnect()
    }

    _goBack = () => {
        this.props.history.goBack()
    }

    _messagesMore = async() => {
        const { page, isLoadingMore, hasNextPage, chatId } = this.state;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                WebSocketInstance.moreMessages(chatId, page);
            }
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        });
    }

    _handleMessageTypeChange = (messageType) => {
        this.setState({
            messageType
        })
    }

    _send = () => {
        const { profile } = this.props;
        const { chatId, text, messageType, toUser } = this.state;
        if(text){
            const messageObj = {
                fromUser: profile.id,
                toUser: toUser,
                chatId: chatId,
                text: text,
                messageeType: messageType
            }
            WebSocketInstance.newChatMessage(messageObj);
            this.setState({
                text: ''
            })
        }
    }

    _handleKeyPress = async(event) => {
        const { key } = event;
        if (key === "Enter"  && !event.shiftKey) {
            event.preventDefault();
            const { profile } = this.props;
            const { chatId, text, messageType, toUser } = this.state;
            if(text){
                const messageObj = {
                    fromUser: profile.id,
                    toUser: toUser,
                    chatId: chatId,
                    text: text,
                    messageeType: messageType
                }
                WebSocketInstance.newChatMessage(messageObj);
                this.setState({
                    text: ''
                })
            }
        }
    }

    _openMap = () => {
        this.setState({
            showMap: true
        })
    }

    _closeMap = () => {
        this.setState({
            showMap: false
        })
    }

    render(){
        const { messages } = this.state;
        return(
            <MessageList 
            {...this.props} 
            {...this.state} 
            messagesMore={this._messagesMore}
            messages={messages}
            goBack={this._goBack}
            handleInputChange={this._handleInputChange}
            handleMessageTypeChange={this._handleMessageTypeChange}
            send={this._send}
            handleKeyPress={this._handleKeyPress}
            handleAdded={this._handleAdded}
            openMap={this._openMap}
            closeMap={this._closeMap}
            />
        )
    }
}

export default Container;
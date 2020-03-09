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
        profile: PropTypes.object.isRequired,
        responseToOrder: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    initialize = (chatId, fromUser) => {
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this), this.moreMessage.bind(this));
            WebSocketInstance.fetchMessages(chatId, fromUser)
        })

        WebSocketInstance.connect(chatId)
    }

    constructor(props){
        super(props)
        const { match : { params : { chatId } }, profile : { id } } = props;
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
            showMap: false,
            redating: false,
            isSubmitting: false,
            redatingMsgId: -1,
        }

        this.initialize(chatId,id)
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

    setMessages(messages, redating, redatingMsgId, existNewMessage){
        this.setState({
            messages: messages.reverse(),
            loading: false,
            redating,
            redatingMsgId,
            existNewMessage
        })
    }

    addMessage(message){
        this.setState({
            messages: [...this.state.messages, message],
            added: true
        })
    }

    moreMessage(messages, hasNextPage, redating, redatingMsgId, existNewMessage){
        if(hasNextPage){
            this.setState({
                messages: [...messages.reverse(), ...this.state.messages],
                isLoadingMore: false,
                page: this.state.page + 1,
                hasNextPage,
                redating,
                redatingMsgId,
                existNewMessage
            })
        }
        else{
            this.setState({
                messages: [...messages.reverse(), ...this.state.messages],
                isLoadingMore: false,
                hasNextPage,
                redatingMsgId,
                existNewMessage
            })
        }
        if(this.state.refreshChat){
            this.state.refreshChat(existNewMessage)
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
            this.initialize(this.props.match.params.chatId, this.props.profile.id)
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
                WebSocketInstance.moreMessages(chatId, this.props.profile.id, page);
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

    _cancel = async() => {
        const { responseToOrder, profile } = this.props;
        const { order, isSubmitting, chatId, messageType, toUser, redatingMsgId } = this.state;
        if(!isSubmitting){
            this.setState({
                isSubmitting: true
            })
            const result = await responseToOrder(order.id, 'cancel', [], redatingMsgId)
            if(result.status === 'ok'){
                const messageObj = {
                    fromUser: profile.id,
                    toUser: toUser,
                    chatId: chatId,
                    text: this.context.t("Sorry, I couldn't find the time available. I'd like to cancel the reservation."),
                    messageeType: messageType
                }
                WebSocketInstance.newChatMessage(messageObj);
                this.setState({
                    text: '',
                    isSubmitting: false,
                    redating: false
                })
            }
            else if(result.error){
                this.setState({
                    isSubmitting: false
                })
                alert(result.error)
            }
            else{
                this.setState({
                    isSubmitting: false
                })
                alert(this.context.t("An error has occurred.."))
            }
        }
    }

    _save = async(selectedTime) => {
        const { responseToOrder, profile } = this.props;
        const { order, isSubmitting, redatingMsgId, toUser, chatId, messageType } = this.state;
        if(!isSubmitting){
            if(selectedTime.length === order.option.hour){
                this.setState({
                    isSubmitting: true
                })
                selectedTime.sort((a,b) => {
                    const aDate = new Date(Number(a.time.slice(0,4)), Number(a.time.slice(5,7)) - 1, Number(a.time.slice(8,10)), Number(a.time.slice(11,13)), Number(a.time.slice(14,16)))
                    const bDate = new Date(Number(b.time.slice(0,4)), Number(b.time.slice(5,7)) - 1, Number(b.time.slice(8,10)), Number(b.time.slice(11,13)), Number(b.time.slice(14,16)))
                    if(aDate < bDate){
                        return -1
                    }
                    else{
                        return 1
                    }
                })
                const result = await responseToOrder(order.id, 'confirm', selectedTime[0].time, redatingMsgId)
                if(result.status === 'ok'){
                    const messageObj = {
                        fromUser: profile.id,
                        toUser: toUser,
                        chatId: chatId,
                        text: `No worries, I’d take photos at ${selectedTime[0].time.slice(0,4)}/${selectedTime[0].time.slice(5,7)}/${selectedTime[0].time.slice(8,10)} ${selectedTime[0].time.slice(11,13)}:00 instead. Thank you!`,
                        messageeType: messageType
                    }
                    WebSocketInstance.newChatMessage(messageObj);
                    this.setState({
                        text: '',
                        isSubmitting: false,
                        redating: false
                    })
                }
                else if(result.error){
                    this.setState({
                        isSubmitting: false
                    })
                    alert(result.error)
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                    alert(this.context.t("An error has occurred.."))
                }
            }
            else{
                alert(`${order.option.hour}` + this.context.t("hour(s) must be selected."))
            }
        }
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
            cancel={this._cancel}
            save={this._save}
            />
        )
    }
}

export default Container;
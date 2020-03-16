import { SOCKET_URL } from '../config/urls';

class WebSocketService{
    static instance = null;

    callbacks = {};

    static getInstance(){
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor(){
        this.socketRef = null
    }

    connect(chatId){
        const path = `wss://${SOCKET_URL}/ws/chat/${chatId}/`;
        this.socketRef = new WebSocket(path)

        this.socketRef.onopen = () => {
            console.log('Web Socket Open')
        }

        // this.socketNewMessage(JSON.stringify({
        //     command: 'fetch_messages'
        // }))
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }

        this.socketRef.onerror = e => {
            console.log('Error: ',e)
        }

        this.socketRef.onclose = () => {
            console.log('Web Socket Closed')
            // this.connect()
        }
    }

    disconnect(){
        this.socketRef.close()
    }

    socketNewMessage(data){
        const parsedData = JSON.parse(data);
        const command = parsedData.command
        if(Object.keys(this.callbacks).length === 0){
            return;
        }
        if (command === 'messages'){
            this.callbacks[command](parsedData.messages, parsedData.has_next_page, parsedData.redating, parsedData.redating_msg_id, parsedData.exist_new_message)
        }
        if (command === 'new_message'){
            this.callbacks[command](parsedData.message)
        }
        if (command === 'more_messages'){
            this.callbacks[command](parsedData.messages, parsedData.has_next_page, parsedData.redating, parsedData.redating_msg_id, parsedData.exist_new_message)
        }
    }

    fetchMessages(chatId, fromUser){
        this.sendMessage({
            command: 'fetch_messages',
            chatId,
            fromUser
        })
    }

    newChatMessage(message){
        this.sendMessage({
            command: 'new_message',
            from_user: message.fromUser,
            to_user: message.toUser,
            chat: message.chatId,
            message: message.text,
            message_type: message.messageeType
        })
    }

    moreMessages(chatId, fromUser, page){
        this.sendMessage({
            command: 'more_messages',
            chatId,
            fromUser,
            page
        })
    }

    addCallbacks(messagesCallback, newMessageCallback, moreMessagesCallback){
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
        this.callbacks['more_messages'] = moreMessagesCallback;
    }

    sendMessage(data){
        try{
            this.socketRef.send(JSON.stringify({...data}))
        }
        catch (err){
            console.log('Error: ', err)
        }
    }

    state(){
        return this.socketRef.readyState
    }

    waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function(){
                if(socket.readyState === 1){
                    console.log('connection is secure')
                    if(callback !== null){
                        callback()
                    }
                    return;
                }
                else{
                    console.log('waiting for conenction');
                    recursion(callback)
                }
            }, 1
        )
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
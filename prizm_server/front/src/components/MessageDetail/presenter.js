import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ProfileDiv = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;
`

const EmptyProfileDivLg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #333333;
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;
`

class MessageList extends Component{
    static propTypes = {
        messages: PropTypes.array,
        messagesMore: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        nickname: PropTypes.string,
        goBack: PropTypes.func.isRequired,
        profileImage: PropTypes.string,
        handleInputChange: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        profile: PropTypes.object.isRequired,
        handleMessageTypeChange: PropTypes.func.isRequired,
        send: PropTypes.func.isRequired,
        handleKeyPress: PropTypes.func.isRequired,
        handleAdded: PropTypes.func.isRequired,
        added: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        initialized: false
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
    }

    _scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.loading && !this.props.loading){
            this._scrollToBottom()
            await sleep(1000)
            this.setState({
                initialized: true
            })
        }
        if(!prevProps.added && this.props.added){
            this._scrollToBottom()
            this.props.handleAdded()
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _isTop(el) {
        return (el.getBoundingClientRect().top >= -5) && (el.getBoundingClientRect().top < 5);
    }

    _handleScroll = async() => {
        const wrappedElement = this.refs.messageListContainer
        if (this._isTop(wrappedElement)) {
            if(this.state.initialized){
                if(!this.props.isLoadingMore){
                    this.props.messagesMore()
                }
            }
        }
    }

    render(){
        const { loading, messages, nickname, profileImage, text, profile } = this.props;
        return(
            <Fragment>
            <div className={`${styles.widthFull} ${styles.containerCustomer} ${styles.px3} ${styles.bgGrayF2} ${styles.minHeightFull}`}>
                <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull} ${styles.positionNav}`} style={{zIndex: 2}}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py4} ${styles.px3} ${styles.bgWhite} ${styles.widthFull} ${styles.containerCustomer}`}>
                        <div className={`${styles.col1} ${styles.px0}`}>
                            <img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Detail")} className={`${styles.iconArrowRight} ${styles.cursorPointer}`} onClick={this.props.goBack} />
                        </div>
                        <div className={`${styles.col10} ${styles.px0} ${styles.textCenter}`}>
                            <p className={`${styles.fontBold} ${styles.font1618}`}>{nickname}</p>
                        </div>
                        <div className={`${styles.col1} ${styles.px0}`}></div>
                    </div>
                </div>
                {loading ? (
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.pb3} ${styles.ptMsg}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                        <div style={{float: 'left', clear: 'both'}} ref={(el) => this.messagesEnd = el}></div>
                    </div>
                ) : (
                    <Fragment>
                    <div ref={"messageListContainer"} className={`${styles.ptMsg} ${styles.pb6}`}>
                        {messages && messages.map((message, index) => {
                            if(message.from_user_id === profile.id){
                                return (
                                    <Fragment key={index}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                        <div className={`${styles.containerFromMsg}`}>
                                            {message.message_type === 'normal' && (
                                                <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>{message.text}</p>
                                            )}
                                        </div>
                                    </div>
                                    <p className={`${styles.font9} ${styles.gray6d} ${styles.mt1} ${index === messages.length -1 ? null : styles.mb3} ${styles.textRight}`}>{`${message.created_at.slice(0,4)}/${message.created_at.slice(5,7)}/${message.created_at.slice(8,10)} ${message.created_at.slice(11,13)}:${message.created_at.slice(14,16)}`}</p>
                                    </Fragment>
                                )
                            }
                            else{
                                return (
                                    <Fragment key={index}>
                                    <div className={`${styles.row} ${styles.mx0}`}>
                                        <div className={`${styles.containerToMsgProfile}`}>
                                            {profileImage ? (
                                                <ProfileDiv image={profileImage} />
                                            ) : (
                                                <EmptyProfileDivLg />
                                            )}
                                        </div>
                                        <div className={`${styles.containerToMsgOutside}`}>
                                            <div className={`${styles.containerToMsg}`}>
                                                {message.message_type === 'normal' && (
                                                    <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>{message.text}</p>
                                                )}
                                            </div>
                                        <p className={`${styles.font9} ${styles.gray6d} ${styles.mt1} ${index === messages.length -1 ? null : styles.mb3} ${styles.textRight}`}>{`${message.created_at.slice(0,4)}/${message.created_at.slice(5,7)}/${message.created_at.slice(8,10)} ${message.created_at.slice(11,13)}:${message.created_at.slice(14,16)}`}</p>
                                        </div>
                                    </div>
                                    </Fragment>
                                )
                            }
                        })}
                        <div style={{float: 'left', clear: 'both'}} ref={(el) => this.messagesEnd = el}></div>
                    </div>
                    </Fragment>
                )}
                
            </div>
            <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`} style={{position: 'fixed', bottom: 0, height: 50, marginLeft: 'auto', marginRight: 'auto'}}>
                <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.px3} ${styles.containerCustomer} ${styles.widthFull}`}>
                    <TextareaAutosize maxRows={3} className={`${styles.textInput10}`} type={"text"} name={"text"} value={text} placeholder={this.context.t("message")} onChange={this.props.handleInputChange} onKeyPress={this.props.handleKeyPress} />
                    <img src={require('../../assets/images/icon_send.png')} alt={this.context.t("Send")} style={{width: 40, height: 40}} onClick={this.props.send} />
                </div>
            </div>
            </Fragment>
        )
    }
}

export default MessageList
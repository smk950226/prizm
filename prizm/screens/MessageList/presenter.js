import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

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
        chatList: PropTypes.array,
        chatListMore: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        goMessageDetail: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    _handleScroll = async() => {
        const wrappedElement = this.refs.messageListContainer
        if (this._isBottom(wrappedElement)) {
            if(!this.props.isLoadingMore){
                this.props.chatListMore()
            }
        }
    }

    render(){
        const { loading, chatList } = this.props;
        return(
            <div ref={"messageListContainer"} className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.mb3}`}>{this.context.t("Messages")}</p>
                {loading ? (
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    <div>
                        {chatList && chatList.length > 0 ? (
                            chatList.map((chat, index) => (
                                <div key={index} className={`${index === chatList.length - 1 ? null : styles.borderBtmGrayDc} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={(chat.order.status !== 'cancelled') ? () => this.props.goMessageDetail(chat.id, chat.order) : null}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.col11} ${styles.px0}`}>
                                        {chat.order.photographer.profile_image ? (
                                            <ProfileDiv image={chat.order.photographer.profile_image} />
                                        ) : (
                                            <EmptyProfileDivLg />
                                        )}
                                        <div className={`${styles.ml3}`}>
                                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                <p className={`${styles.fontBold} ${styles.font1416}`}>{chat.order.photographer.nickname}</p>
                                                {chat.exist_new_message && (
                                                        <div className={`${styles.circle8} ${styles.bgRed} ${styles.ml2} ${styles.mb1}`} />
                                                    )}
                                            </div>
                                            {chat.order.status === 'pending' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt2} ${styles.pending}`}>{this.context.t(`Pending  (${chat.order.date_option === 'Specific' ? `${chat.order.specific_date.slice(2,4)}/${chat.order.specific_date.slice(5,7)}/${chat.order.specific_date.slice(8,10)}` : `${chat.order.start_date.slice(2,4)}/${chat.order.start_date.slice(5,7)}/${chat.order.start_date.slice(8,10)}`})`)}</p>
                                            )}
                                            {((chat.order.status === 'confirmed') || (chat.order.status === 'waiting_payment')) && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.confirmed} ${styles.mt2}`}>{this.context.t(`Confirmed (${chat.order.confirmed_date.slice(2,4)}/${chat.order.confirmed_date.slice(5,7)}/${chat.order.confirmed_date.slice(8,10)})`)}</p>
                                            )}
                                            {chat.order.status === 'paid' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.paid} ${styles.mt2}`}>{this.context.t(`Paid (${chat.order.confirmed_date.slice(2,4)}/${chat.order.confirmed_date.slice(5,7)}/${chat.order.confirmed_date.slice(8,10)})`)}</p>
                                            )}
                                            {chat.order.status === 'cancelled' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.cancelled} ${styles.mt2}`}>{this.context.t(`Cancelled (${chat.order.date_option === 'Specific' ? `${chat.order.specific_date.slice(2,4)}/${chat.order.specific_date.slice(5,7)}/${chat.order.specific_date.slice(8,10)}` : `${chat.order.start_date.slice(2,4)}/${chat.order.start_date.slice(5,7)}/${chat.order.start_date.slice(8,10)}`})`)}</p>
                                            )}
                                            {chat.order.status === 'completed' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt2} ${styles.completed}`}>{this.context.t(`Completed (${chat.order.confirmed_date.slice(2,4)}/${chat.order.confirmed_date.slice(5,7)}/${chat.order.confirmed_date.slice(8,10)})`)}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.col1} ${styles.px0} ${styles.textRight}`}>
                                        <img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Detail")} className={`${styles.iconArrowRight}`} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/email_verifing.png')} alt={this.context.t("This request no longer exists")} className={`${styles.mt5} ${styles.pt3}`} style={{width: '80%', maxWidth: 400}} />
                                <p className={`${styles.font1214} ${styles.mt3}`}>
                                    {this.context.t("You haven't received any messages yet.")}<br/>
                                    {this.context.t("A new chatroom will appear when you submit a request to a photographer.")}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default MessageList
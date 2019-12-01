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
            <div ref={"messageListContainer"} className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.mb3}`}>{this.context.t("Messages")}</p>
                {loading ? (
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    <div>
                        {chatList && chatList.length > 0 ? (
                            chatList.map((chat, index) => (
                                <div key={index} className={`${index === chatList.length - 1 ? null : styles.borderBtmGrayDc} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={(chat.order.status !== 'cancelled') && (chat.order.status !== 'done') ? () => this.props.goMessageDetail(chat.id, chat.order) : null}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.col11} ${styles.px0}`}>
                                        {chat.order.photographer.profile_image ? (
                                            <ProfileDiv image={chat.order.photographer.profile_image} />
                                        ) : (
                                            <EmptyProfileDivLg />
                                        )}
                                        <div className={`${styles.ml3}`}>
                                            <p className={`${styles.fontBold} ${styles.font1416}`}>{chat.order.photographer.nickname}</p>
                                            {chat.order.status === 'pending' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt2}`}>{this.context.t(`Pending  (${chat.order.date_option === 'Specific' ? `${chat.order.specific_date.slice(2,4)}/${chat.order.specific_date.slice(5,7)}/${chat.order.specific_date.slice(8,10)}` : `${chat.order.start_date.slice(2,4)}/${chat.order.start_date.slice(5,7)}/${chat.order.start_date.slice(8,10)}`})`)}</p>
                                            )}
                                            {chat.order.status === 'confirmed' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.confirmed} ${styles.mt2}`}>{this.context.t(`Confirmed (${chat.order.confirmed_date.slice(2,4)}/${chat.order.confirmed_date.slice(5,7)}/${chat.order.confirmed_date.slice(8,10)})`)}</p>
                                            )}
                                            {chat.order.status === 'cancelled' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.pink} ${styles.mt2}`}>{this.context.t(`Cancelled (${chat.order.date_option === 'Specific' ? `${chat.order.specific_date.slice(2,4)}/${chat.order.specific_date.slice(5,7)}/${chat.order.specific_date.slice(8,10)}` : `${chat.order.start_date.slice(2,4)}/${chat.order.start_date.slice(5,7)}/${chat.order.start_date.slice(8,10)}`})`)}</p>
                                            )}
                                            {chat.order.status === 'done' && (
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt2}`}>{this.context.t(`Done (${chat.order.confirmed_date.slice(2,4)}/${chat.order.confirmed_date.slice(5,7)}/${chat.order.confirmed_date.slice(8,10)})`)}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.col1} ${styles.px0} ${styles.textRight}`}>
                                        <img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Detail")} className={`${styles.iconArrowRight}`} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            null
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default MessageList
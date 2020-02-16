import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import Modal from 'react-responsive-modal';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker icon={require('../../assets/images/icon_marker.png')} position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
)))

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

const DayContainer = styled.div`
    height: ${props => `${(props.length*32)+15}px`};
    width: 100%;
    overflow-x: scroll !important;
    margin-top: 15px;
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
        added: PropTypes.bool.isRequired,
        openMap: PropTypes.func.isRequired,
        closeMap: PropTypes.func.isRequired,
        showMap: PropTypes.bool.isRequired,
        order: PropTypes.object.isRequired,
        redating: PropTypes.bool.isRequired,
        cancel: PropTypes.func.isRequired,
        save: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        initialized: false,
        loadingDay: true,
        availableTime: [],
        selectedTime: []
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
        const { order } = this.props;

        let availableFrom = null;
        let availableTo = null
        let dayList = []
        const timeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

        if(order.date_option === 'Specific'){
            availableFrom = new Date(new Date(order.specific_date).getTime() - 1000*60*60*24)
            availableTo = new Date(new Date(order.specific_date).getTime() + 1000*60*60*24)
            const day = new Date(order.specific_date)
            const prev = new Date(day.getTime() - (1000*60*60*24))
            const next = new Date(day.getTime() + (1000*60*60*24))
            dayList.push(prev)
            dayList.push(day)
            dayList.push(next)
            this.setState({
                dayList,
                timeList,
                availableFrom,
                availableTo,
                loadingDay: false,
                availableTime: order.available_time ? JSON.parse(order.available_time) : []
            })
        }
        else{
            availableFrom = new Date(order.start_date)
            availableTo = new Date(order.end_date)
            const start = new Date(order.start_date)
            const end = new Date(order.end_date)
            let index = 0
            while(true){
                const day = new Date(start.getTime() + (1000*60*60*24*index))
                if (day.getTime() >= end.getTime()){
                    dayList.push(end)
                    break;
                }
                else{
                    index += 1
                    dayList.push(day)
                }
            }
            this.setState({
                dayList,
                timeList,
                availableFrom,
                availableTo,
                loadingDay: false,
                availableTime: order.available_time ? JSON.parse(order.available_time.replace(/'/gi, '"')) : []
            })
        }
    }

    _scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevState.loadingDay && !this.state.loadingDay){
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

    _selectTime = (time, timeIndex, dayIndex) => {
        const { selectedTime } = this.state;
        const { order } = this.props;
        if(selectedTime.length < order.option.hour){
            if(selectedTime.length > 0){
                let ok = false
                selectedTime.map(selected => {
                    if(selected.dayIndex === dayIndex){
                        if((selected.timeIndex - timeIndex === -1) || (selected.timeIndex - timeIndex === 1)){
                            ok = true
                        }
                    }
                })
                if(ok){
                    this.setState({
                        selectedTime: [...this.state.selectedTime, {
                            time,
                            timeIndex,
                            dayIndex
                        }]
                    })
                }
            }
            else{
                this.setState({
                    selectedTime: [...this.state.selectedTime, {
                        time,
                        timeIndex,
                        dayIndex
                    }]
                })
            }
        }
    }

    _removeTime = (time) => {
        this.setState({
            selectedTime: []
        })
    }

    render(){
        const { loading, messages, nickname, profileImage, text, profile, showMap, order, redating } = this.props;
        const { availableFrom, availableTo, loadingDay, availableTime, timeList, dayList, selectedTime } = this.state;
        return(
            <Fragment>
            <div className={`${styles.widthFull} ${styles.containerCustomer} ${styles.bgGrayF2} ${styles.minHeightFull}`}>
                <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.px3}`} style={{zIndex: 2, position: 'fixed', top: 0, left: 0, right: 0}}>
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
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.px3} ${styles.pb3} ${styles.ptMsg}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                        <div style={{float: 'left', clear: 'both'}} ref={(el) => this.messagesEnd = el}></div>
                    </div>
                ) : (
                    !loadingDay ? (
                    <Fragment>
                        <div ref={"messageListContainer"} className={`${styles.ptMsg} ${styles.pb6}`}>
                            {messages && messages.map((message, index) => {
                                if(message.from_user_id === profile.id){
                                    return (
                                        <Fragment key={index}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd} ${styles.px3}`}>
                                            <div className={`${styles.containerFromMsgOutside}`}>
                                            <div className={`${styles.containerFromMsg}`}>
                                                {message.message_type === 'normal' && (
                                                    <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>{message.text}</p>
                                                )}
                                                {message.message_type === 'order_confirm' && (
                                                    <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>
                                                        {`Hi, ${profile.first_name} ${profile.last_name}. Thank you very much for the reservation. Your reservation is confirmed! Our meeting location is as follows : `}<span className={`${styles.fontBold} ${styles.underline} ${styles.cursorPointer}`} onClick={this.props.openMap}>{this.context.t("HERE")}</span>
                                                        <br/><br/>
                                                        {`If you have any questions, feel free to leave a message here or contact me at :`}
                                                        <br/><br/>
                                                        {`Instagram : `}<span className={`${styles.cursorPointer}`}><a href={`https://instagram.com/${order.photographer.user.instagram_account}/`} className={`${styles.textDecorationNone} ${styles.white}`} target={'_blank'}>{`@${order.photographer.user.instagram_account}`}</a></span>
                                                        <br/>
                                                        {`Phone : +${order.photographer.user.country_number} ${order.photographer.user.mobile}`}
                                                        <br/><br/>
                                                        {`Have a great day!`}
                                                    </p>
                                                )}
                                                {message.message_type === 'order_redating' && (
                                                    <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>
                                                        {`Hi, ${profile.first_name} ${profile.last_name}.  I just saw your reservation! Below is my availability from ${availableFrom.getFullYear()}/${availableFrom.getMonth() + 1}/${availableFrom.getDate()} to ${availableTo.getFullYear()}/${availableTo.getMonth() + 1}/${availableTo.getDate()}. Please select your preferred timeslot at the timetable below and send me back. I will reach you back as soon as possible. Thank you!`}
                                                    </p>
                                                )}
                                            </div>
                                            <p className={`${styles.font9} ${styles.gray6d} ${styles.mt1} ${index === messages.length -1 ? null : styles.mb3} ${styles.textRight}`}>{`${message.created_at.slice(0,4)}/${message.created_at.slice(5,7)}/${message.created_at.slice(8,10)} ${message.created_at.slice(11,13)}:${message.created_at.slice(14,16)}`}</p>
                                            </div>
                                        </div>
                                        </Fragment>
                                    )
                                }
                                else{
                                    return (
                                        <Fragment key={index}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.px3}`}>
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
                                                    {message.message_type === 'order_confirm' && (
                                                        <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>
                                                            {`Hi, ${profile.first_name} ${profile.last_name}. Thank you very much for the reservation. Your reservation is confirmed! Our meeting location is as follows : `}<span className={`${styles.fontBold} ${styles.underline} ${styles.cursorPointer}`} onClick={this.props.openMap}>{this.context.t("HERE")}</span>
                                                            <br/><br/>
                                                            {`If you have any questions, feel free to leave a message here or contact me at :`}
                                                            <br/><br/>
                                                            {`Instagram : `}<span className={`${styles.cursorPointer}`}><a href={`https://instagram.com/${order.photographer.user.instagram_account}/`} className={`${styles.textDecorationNone} ${styles.white}`} target={'_blank'}>{`@${order.photographer.user.instagram_account}`}</a></span>
                                                            <br/>
                                                            {`Phone : +${order.photographer.user.country_number} ${order.photographer.user.mobile}`}
                                                            <br/><br/>
                                                            {`Have a great day!`}
                                                        </p>
                                                    )}
                                                    {message.message_type === 'order_redating' && (
                                                        <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.42}}>
                                                            {`Hi, ${profile.first_name} ${profile.last_name}.  I just saw your reservation! Below is my availability from ${availableFrom.getFullYear()}/${availableFrom.getMonth() + 1}/${availableFrom.getDate()} to ${availableTo.getFullYear()}/${availableTo.getMonth() + 1}/${availableTo.getDate()}. Please select your preferred timeslot at the timetable below and send me back. I will reach you back as soon as possible. Thank you!`}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className={`${styles.font9} ${styles.gray6d} ${styles.mt1} ${index === messages.length -1 ? null : styles.mb3} ${styles.textRight}`}>{`${message.created_at.slice(0,4)}/${message.created_at.slice(5,7)}/${message.created_at.slice(8,10)} ${message.created_at.slice(11,13)}:${message.created_at.slice(14,16)}`}</p>
                                            </div>
                                        </div>
                                        {redating && (
                                            <div className={`${styles.bgGray33} ${styles.py3} ${styles.px3} ${styles.mt4}`}>
                                                <p className={`${styles.font1214} ${styles.white}`} style={{lineHeight: 1.2}}>
                                                    {this.context.t("Please select time or Cancel reservation")}<br/>
                                                </p>
                                                <DayContainer length={dayList.length}>
                                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.flexNowrap}`} style={{height: 15}}>
                                                        <p className={`${styles.hidden} ${styles.nowrapInner}`} style={{width: 70}}>{'hidden'}</p>
                                                        {timeList.map((time, index) => (
                                                            <p key={index} className={`${styles.fontBold} ${styles.font9} ${styles.white} ${styles.nowrapInner}`} style={{width: 31, marginLeft: -5}}>{time}</p>
                                                        ))}
                                                    </div>
                                                    {dayList.map((day, index) => (
                                                        <div key={index} className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.flexNowrap}`} style={{height: 32}}>
                                                            <p className={`${styles.fontBold} ${styles.font1113} ${styles.white} ${styles.nowrapInner}`} style={{width: 70}}>{`${String(day.getFullYear()).slice(2,4)}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}`}</p>
                                                            {timeList.map((time, idx) => {
                                                                const isAvailable = availableTime.find(se => se === `${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) ? true : false
                                                                const isSelected = selectedTime.find(se => se.time === `${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) ? true : false
                                                                
                                                                return(
                                                                    <div key={idx} className={`${isAvailable ? isSelected ? styles.bgPink : styles.bgConfirmed :styles.bgWhite} ${styles.containerDayBox} ${styles.cursorPointer}`} onClick={isAvailable ? isSelected ? () => this._removeTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) :() => this._selectTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`, idx, index) : null}>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    ))}
                                                </DayContainer>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd} ${styles.mt3}`}>
                                                    <p className={`${styles.fontBold} ${styles.font1416} ${styles.white} ${styles.cursorPointer} ${styles.mr3}`} onClick={this.props.cancel}>
                                                        {this.context.t("Cancel")}
                                                    </p>
                                                    <p className={`${styles.fontBold} ${styles.font1416} ${styles.white} ${styles.cursorPointer}`} onClick={() => this.props.save(selectedTime)}>
                                                        {this.context.t("Send")}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        </Fragment>
                                    )
                                }
                            })}
                            <div style={{float: 'left', clear: 'both'}} ref={(el) => this.messagesEnd = el}></div>
                        </div>
                        </Fragment>
                    ): (
                        <div style={{float: 'left', clear: 'both'}} ref={(el) => this.messagesEnd = el}></div>
                    )
                )}
            </div>
            {order.status === 'confirmed' && (order.photographer.user.id !== profile.id) && (
                <div className={`${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`} style={{position: 'fixed', bottom: 70, marginLeft: 'auto', marginRight: 'auto'}}>
                    <div className={`${styles.px3} ${styles.containerCustomer} ${styles.widthFull}`}>
                        <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => this.props.goPayment(order)} style={{height: 48}}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Add Payment Details")}</p>
                        </div>
                        <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>
                            {this.context.t("Please add payment details by : ")}
                            {this.context.t(`${new Date(new Date(order.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
                        </p>
                    </div>
                </div>
            )}
            {order.status === 'waiting_payment' && (order.photographer.user.id !== profile.id) && (
                <div className={`${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`} style={{position: 'fixed', bottom: 70, marginLeft: 'auto', marginRight: 'auto'}}>
                    <div className={`${styles.px3} ${styles.containerCustomer} ${styles.widthFull}`}>
                        <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => this.props.goPayment(order)} style={{height: 48}}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("View Payment Information")}</p>
                        </div>
                        <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>
                            {this.context.t("Please make payment by : ")}
                            {this.context.t(`${new Date(new Date(order.deposit.created_at).getTime() + 1000*60*60*24*1)}`)}
                        </p>
                    </div>
                </div>
            )}
            <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`} style={{position: 'fixed', bottom: 0, height: 50, marginLeft: 'auto', marginRight: 'auto'}}>
                <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.px3} ${styles.containerCustomer} ${styles.widthFull}`}>
                    <TextareaAutosize readOnly={((order.status === 'cancelled') || (order.status === 'pending') || (order.status === 'completed')) ? true : redating} maxRows={3} className={`${styles.textInput10}`} type={"text"} name={"text"} value={text} placeholder={this.context.t("Message")} onChange={this.props.handleInputChange} onKeyPress={this.props.handleKeyPress} />
                    <img src={require('../../assets/images/icon_send.png')} alt={this.context.t("Send")} style={{width: 40, height: 40}} onClick={this.props.send} />
                </div>
            </div>
            <Modal
            open={showMap} 
            onClose={this.props.closeMap} 
            center
            styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
            >
                <div className={`${styles.containerModal}`}>
                        <Map
                        isMarkerShown={true}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div className={`${styles.containerMapLg}`} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        lng={order.location.lng}
                        lat={order.location.lat}
                        />
                </div>
            </Modal>
            </Fragment>
        )
    }
}

export default MessageList
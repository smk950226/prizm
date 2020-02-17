import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import PortfolioSlider from '../PortfolioSlider';
import LocationComp from '../LocationComp';
import styled from 'styled-components';
import Truncate from 'react-truncate';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import { Collapse } from 'react-collapse';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

const ProfileDivLg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;
`

const DayContainer = styled.div`
    height: ${props => `${(props.length*32)+45}px`};
    width: 100%;
    overflow-x: scroll !important;
    margin-top: 15px;
    background-color: #333333;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 15px;
    padding-bottom: 15px;
`

class PhotographerDetail extends Component{
    static propTypes = {
        order: PropTypes.object,
        doTruncate: PropTypes.func.isRequired,
        undoTruncate: PropTypes.func.isRequired,
        isTruncated: PropTypes.bool.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        open1: PropTypes.func.isRequired,
        close1: PropTypes.func.isRequired,
        open2: PropTypes.func.isRequired,
        close2: PropTypes.func.isRequired,
        open3: PropTypes.func.isRequired,
        close3: PropTypes.func.isRequired,
        show1: PropTypes.bool.isRequired,
        show2: PropTypes.bool.isRequired,
        show3: PropTypes.bool.isRequired,
        submit: PropTypes.func.isRequired,
        requestSubmitted: PropTypes.bool.isRequired,
        dayList: PropTypes.array.isRequired,
        timeList: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        selectTime: PropTypes.func.isRequired,
        removeTime: PropTypes.func.isRequired,
        selectedTime: PropTypes.array,
        goRequestOrderList: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isOpen: false,
        photoIndex: 0
    }

    render(){
        const { order, isTruncated, isSubmitting, show1, show2, show3, requestSubmitted, dayList, timeList, loading, selectedTime } = this.props;
        const location = JSON.parse(order.location.replace(/'/gi, '"'))
        const availableTime = order.available_time ? JSON.parse(order.available_time.replace(/'/gi, '"')) : []
        return(
            <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${requestSubmitted ? `${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.minHeightFull}` : null}`}>
                {loading ? (
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    !requestSubmitted ? (
                        <Fragment>
                            {order.photographer.portfolio_set && order.photographer.portfolio_set.length > 0 ? (
                                <PortfolioSlider portfolio={order.photographer.portfolio_set} nickname={order.photographer.nickname} lg={false} />
                            ) : (
                                null
                            )}
                            <div className={`${styles.px3}`}>
                                <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                    <ProfileDivLg image={order.photographer.profile_image} />
                                    <div className={`${styles.ml3}`}>
                                        <p className={`${styles.fontBold} ${styles.font14}`}>{order.photographer.nickname}</p>
                                        <p className={`${styles.font12} ${styles.mt1}`}>{order.photographer.main_location}</p>
                                    </div>
                                </div>
                                <div className={`${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                    <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Career")}</p>
                                    <p className={`${styles.font10}`}>{order.photographer.career}</p>
                                </div>
                                {order.photographer.equipment ? (
                                    <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Equipment")}</p>
                                        <p className={`${styles.font10}`}>{order.photographer.equipment}</p>
                                    </div>
                                ) : (
                                    null
                                )}
                                <div className={`${styles.mt3}`}>
                                    <p className={`${styles.font11}`} style={{lineHeight: 1.45}}>
                                        <Truncate lines={isTruncated ? 4 : null} ellipsis={<span>...</span>}>
                                            {order.photographer.description}
                                        </Truncate>
                                    </p>
                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.green} ${styles.mt2} ${styles.cursorPointer}`} onClick={isTruncated ? this.props.undoTruncate : this.props.doTruncate}>{isTruncated ? this.context.t("More ...") : this.context.t("Abbr")}</p>
                                </div>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.my3}`}>
                                    <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Review")}</p>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font11} ${styles.mr1}`}>{order.photographer.total_rating.toFixed(1)}</p>
                                        <Rating 
                                        initialRating={order.photographer.total_rating} 
                                        emptySymbol={<MdStar fontSize={"15px"} color={"#f4f4f4"} />}
                                        fullSymbol={<MdStar fontSize={"15px"} color={"#fffb64"} />}
                                        fractions={2}
                                        readonly
                                        />
                                        <p className={`${styles.font9} ${styles.ml1}`}>({order.photographer.review_count})</p>
                                        <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} onClick={() => this.props.goReviewList(order.photographer.id)} />
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                            <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={show1 ? this.props.close1 : this.props.open1}>
                                    <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("1. Photography Location")}</p>
                                    <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show1 ? styles.rotate : null}`} />
                                </div>
                                <Collapse isOpened={show1} theme={{collapse: styles.collapse}}>
                                    <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                        <LocationComp location={location} selectedLocation={location} index={0} total={1} blankLocation={() => console.log('blank')} selectLocation={() => console.log('select')} />
                                    </div>
                                    {location.lat ? (
                                        <div className={`${styles.mt3}`}>
                                            <Map
                                            isMarkerShown={true}
                                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className={`${styles.containerMap}`} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            lng={location.lng}
                                            lat={location.lat}
                                            />
                                        </div>
                                    ) : null}
                                </Collapse>
                            </div>
                            <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                            <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={show2 ? this.props.close2 : this.props.open2}>
                                    <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("2. Price")}</p>
                                    <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show2 ? styles.rotate : null}`}/>
                                </div>
                                <Collapse isOpened={show2} theme={{collapse: styles.collapse}}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`}>
                                    <p className={`${styles.font13} ${styles.fontBold}`}>{`$${numberWithCommas(order.price)}`} <span className={`${styles.pink} ${styles.fontNormal}`}>{`(${order.custom_request.person} ${order.custom_request.person > 1 ? `people` : `person`}, ${order.custom_request.hour} ${order.custom_request.hour > 1 ? `hours` : `hour`})`}</span></p>
                                </div>
                                </Collapse>
                            </div>
                            <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                            <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={show3 ? this.props.close3 : this.props.open3}>
                                    <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("3. Date & Time")}</p>
                                    <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show3 ? styles.rotate : null}`}/>
                                </div>
                                <Collapse isOpened={show3} theme={{collapse: styles.collapse}}>
                                <div className={`${styles.mt4}`}>
                                    {order.custom_request.date_option === 'Specific' ? (
                                        <Fragment>
                                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3} ${styles.px3}`}>
                                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}}>
                                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${order.custom_request.specific_date.slice(0,4)}/${order.custom_request.specific_date.slice(5,7)}/${order.custom_request.specific_date.slice(8,10)}`}</p>
                                                </div>
                                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}}>
                                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${order.custom_request.specific_date.slice(11,13)}:${order.custom_request.specific_date.slice(14,16)}`}</p>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <div className={`${styles.py3} ${styles.bgGray33}`}>
                                            <p className={`${styles.font1214} ${styles.white} ${styles.px3}`} style={{lineHeight: 1.2}}>
                                                {this.context.t("Please select your desired time(s).")}<br/>
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
                                                                <div key={idx} className={`${isAvailable ? isSelected ? styles.bgPink : styles.bgConfirmed :styles.bgWhite} ${styles.containerDayBox} ${styles.cursorPointer}`} onClick={isAvailable ? isSelected ? () => this.props.removeTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) :() => this.props.selectTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`, idx, index) : null}>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ))}
                                            </DayContainer>
                                        </div>
                                    )}
                                </div>
                                </Collapse>
                            </div>
                            <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                    <div className={`${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48, width: 'calc(50% - 8px)'}} onClick={this.props.submit}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Select this proposal")}</p>
                                    </div>
                                    <div className={`${styles.bgGray97} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn}`} style={{height: 48, width: 'calc(50% - 8px)'}} onClick={() => this.props.goRequestOrderList(order.custom_request.id)}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Back")}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </Fragment>
                    ) : (
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.heightFullPercent} ${styles.px3}`} style={{position: 'relative'}}>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/request_complete.png')} alt={this.context.t("Submitted")} className={`${styles.mb4}`} style={{width: '100%', maxWidth: 400}} />
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.mt5}`}>{this.context.t("Your request was submitted successfully")}</p>
                                <p className={`${styles.font12} ${styles.mt5} ${styles.textCenter}`} style={{lineHeight: 1.25}}>
                                    {order.photographer.nickname}{this.context.t(" is now reviewing your request.")}<br/>
                                    {this.context.t("We will soon send you a confirmation message")}<br/>
                                    {this.context.t("to your email and mobile number.")}
                                </p>
                                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goHome}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go to the main page")}</p>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default PhotographerDetail;
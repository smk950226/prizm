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
import Calendar from 'react-calendar';
import Modal from 'react-responsive-modal';
import { Collapse } from 'react-collapse';
import Picker from 'react-mobile-picker-scroll';

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

class PhotographerDetail extends Component{
    static propTypes = {
        photographer: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        doTruncate: PropTypes.func.isRequired,
        undoTruncate: PropTypes.func.isRequired,
        isTruncated: PropTypes.bool.isRequired,
        selectLocation: PropTypes.func.isRequired,
        blankLocation: PropTypes.func.isRequired,
        selectedLocation: PropTypes.object.isRequired,
        handleChangeDateOption: PropTypes.func.isRequired,
        dateOption: PropTypes.number.isRequired,
        blankDateOption: PropTypes.func.isRequired,
        selectOption: PropTypes.func.isRequired,
        blankOption: PropTypes.func.isRequired,
        selectedOption: PropTypes.object.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        comment: PropTypes.string.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        open1: PropTypes.func.isRequired,
        close1: PropTypes.func.isRequired,
        open2: PropTypes.func.isRequired,
        close2: PropTypes.func.isRequired,
        open3: PropTypes.func.isRequired,
        close3: PropTypes.func.isRequired,
        open4: PropTypes.func.isRequired,
        close4: PropTypes.func.isRequired,
        show1: PropTypes.bool.isRequired,
        show2: PropTypes.bool.isRequired,
        show3: PropTypes.bool.isRequired,
        show4: PropTypes.bool.isRequired,
        openCalendar1: PropTypes.func.isRequired,
        closeCalendar1: PropTypes.func.isRequired,
        showCalendar1: PropTypes.bool.isRequired,
        openCalendar2: PropTypes.func.isRequired,
        closeCalendar2: PropTypes.func.isRequired,
        showCalendar2: PropTypes.bool.isRequired,
        selectDate: PropTypes.func.isRequired,
        selectedDate :PropTypes.any.isRequired,
        confirmDate: PropTypes.func.isRequired,
        dateConfirm: PropTypes.bool.isRequired,
        selectDateStep: PropTypes.number.isRequired,
        changeDateStep: PropTypes.func.isRequired,
        selectedHour: PropTypes.string.isRequired,
        selectedMin: PropTypes.string.isRequired,
        selectedAmPm: PropTypes.string.isRequired,
        selectDateRange: PropTypes.func.isRequired,
        selectedStartDate: PropTypes.any.isRequired,
        selectedEndDate: PropTypes.any.isRequired,
        isConfirmPage: PropTypes.bool.isRequired,
        goConfirm: PropTypes.func.isRequired,
        fromAuth: PropTypes.bool.isRequired,
        request: PropTypes.object,
        submit: PropTypes.func.isRequired,
        requestSubmitted: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        dateRange: PropTypes.array.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        goReviewList: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        isSendingEmail: PropTypes.bool.isRequired,
        send: PropTypes.func.isRequired,
        handleChangeTimes: PropTypes.func.isRequired,
        optionGroups: PropTypes.object.isRequired,
        valueGroups: PropTypes.object.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isOpen: false,
        photoIndex: 0
    }

    render(){
        const { photographer, loading, isTruncated, selectedLocation, dateOption, selectedOption, comment, isSubmitting, show1, show2, show3, show4, showCalendar1, showCalendar2, selectedDate, dateConfirm, selectDateStep, selectedHour, selectedMin, selectedAmPm, selectedStartDate, selectedEndDate, isConfirmPage, fromAuth, request, requestSubmitted, dateRange, isLoggedIn, profile, isSendingEmail, optionGroups, valueGroups } = this.props;
        return(
            <div className={`${requestSubmitted ? styles.safearea : isConfirmPage ? styles.safearea : styles.safeareaTop} ${styles.containerCustomer} ${requestSubmitted ? `${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.minHeightFull}` : `${styles.minHeightFull}`}`}>
                {loading ? (
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    !requestSubmitted ? (
                        !isConfirmPage ? (
                            <Fragment>
                                {photographer.portfolio_set && photographer.portfolio_set.length > 0 ? (
                                    <PortfolioSlider portfolio={photographer.portfolio_set} nickname={photographer.nickname} lg={false} />
                                ) : (
                                    null
                                )}
                                <div className={`${styles.px3}`}>
                                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <ProfileDivLg image={photographer.profile_image} />
                                        <div className={`${styles.ml3}`}>
                                            <p className={`${styles.fontBold} ${styles.font14}`}>{photographer.nickname}</p>
                                            <p className={`${styles.font12} ${styles.mt1}`}>{photographer.main_location}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Career")}</p>
                                        <p className={`${styles.font10}`}>{photographer.career}</p>
                                    </div>
                                    {photographer.equipment ? (
                                        <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                            <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Equipment")}</p>
                                            <p className={`${styles.font10}`}>{photographer.equipment}</p>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                    <div className={`${styles.mt3}`}>
                                        <p className={`${styles.font11}`} style={{lineHeight: 1.45}}>
                                            <Truncate lines={isTruncated ? 4 : null} ellipsis={<span>...</span>}>
                                                {photographer.description}
                                            </Truncate>
                                        </p>
                                        <p className={`${styles.fontBold} ${styles.font13} ${styles.green} ${styles.mt2} ${styles.cursorPointer}`} onClick={isTruncated ? this.props.undoTruncate : this.props.doTruncate}>{isTruncated ? this.context.t("More ...") : this.context.t("Abbr")}</p>
                                    </div>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.my3}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Review")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <p className={`${styles.fontBold} ${styles.font11} ${styles.mr1}`}>{photographer.total_rating.toFixed(1)}</p>
                                            <Rating 
                                            initialRating={photographer.total_rating} 
                                            emptySymbol={<MdStar fontSize={"15px"} color={"#f4f4f4"} />}
                                            fullSymbol={<MdStar fontSize={"15px"} color={"#fffb64"} />}
                                            fractions={2}
                                            readonly
                                            />
                                            <p className={`${styles.font9} ${styles.ml1}`}>({photographer.review_count})</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} onClick={() => this.props.goReviewList(photographer.id)} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                                <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={show1 ? selectedLocation.id ? this.props.close1 : null : this.props.open1}>
                                        <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("1. Select Location")}<span className={`${styles.pink}`}>{`  (${photographer.location_set.length})`}</span></p>
                                        <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show1 ? styles.rotate : null}`} />
                                    </div>
                                    <Collapse isOpened={show1} theme={{collapse: styles.collapse}}>
                                        {photographer.location_set && photographer.location_set.length > 0 ? (
                                            <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                                {photographer.location_set.map((location, index) => (
                                                    <LocationComp key={index} location={location} selectedLocation={selectedLocation} index={index} total={photographer.location_set.length} blankLocation={this.props.blankLocation} selectLocation={this.props.selectLocation} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{this.context.t("There is no available location.")}</p>
                                        )}
                                        {selectedLocation.lat ? (
                                            <div className={`${styles.mt3}`}>
                                                <Map
                                                isMarkerShown={true}
                                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div className={`${styles.containerMap}`} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                                lng={selectedLocation.lng}
                                                lat={selectedLocation.lat}
                                                />
                                            </div>
                                        ) : null}
                                    </Collapse>
                                </div>
                                <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                                <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={(dateConfirm ) ? show2 ? this.props.close2 : this.props.open2 : null}>
                                        <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("2. Date&Time")}</p>
                                        <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show2 ? styles.rotate : null}`}/>
                                    </div>
                                    <Collapse isOpened={show2} theme={{collapse: styles.collapse}} initialStyle={{height: 'auto'}}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={dateOption === 1 ? this.props.blankDateOption : () => this.props.handleChangeDateOption(1)}>
                                        <div className={`${styles.checkBox} ${dateOption !== 1 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                            {dateOption === 1 && (
                                                <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("I have a specific date in mind")} className={`${styles.iconCheck}`} />
                                            )}
                                        </div>
                                        <div className={`${styles.checkBoxText}`}>
                                            <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{this.context.t("I have a specific date in mind")}</p>
                                        </div>
                                    </div>
                                    {dateConfirm && (dateOption === 1) && (
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => this.props.openCalendar1(1)}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).length === 2 ? (selectedDate.getMonth() + 1) : '0'.concat(String(selectedDate.getMonth() + 1))}/${selectedDate.getDate()}`}</p>
                                            </div>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => this.props.openCalendar1()}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedAmPm} ${selectedHour}:${selectedMin}`}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={dateOption === 2 ? this.props.blankDateOption : () => this.props.handleChangeDateOption(2)}>
                                        <div className={`${styles.checkBox} ${dateOption !== 2 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                            {dateOption === 2 && (
                                                <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")} className={`${styles.iconCheck}`} />
                                            )}
                                        </div>
                                        <div className={`${styles.checkBoxText}`}>
                                            <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}</p>
                                        </div>
                                    </div>
                                    {dateConfirm && (dateOption === 2) && (
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={this.props.openCalendar2}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedStartDate.getFullYear()}/${String(selectedStartDate.getMonth() + 1).length === 2 ? (selectedStartDate.getMonth() + 1) : '0'.concat(String(selectedStartDate.getMonth() + 1))}/${selectedStartDate.getDate()}`}</p>
                                            </div>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={this.props.openCalendar2}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedEndDate.getFullYear()}/${String(selectedEndDate.getMonth() + 1).length === 2 ? (selectedEndDate.getMonth() + 1) : '0'.concat(String(selectedEndDate.getMonth() + 1))}/${selectedEndDate.getDate()}`}</p>
                                            </div>
                                        </div>
                                    )}
                                    </Collapse>
                                </div>
                                <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                                <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={selectedOption.id ? show3 ?  this.props.close3 : this.props.open3 : null}>
                                        <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("3. Service&Pricing")}</p>
                                        <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show3 ? styles.rotate : null}`}/>
                                    </div>
                                    <Collapse isOpened={show3} theme={{collapse: styles.collapse}}>
                                    <div className={`${styles.my3}`}>
                                        {photographer.option_set && photographer.option_set.length > 0 ? (
                                            photographer.option_set.map((option, index) => (
                                                <div key={index} className={`${styles.py4} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.index === photographer.option_set.length - 1 ? null : styles.mb2} ${styles.cursorPointer} ${selectedOption.id === option.id ? styles.borderPink : styles.borderGrayD9} ${selectedOption.id === option.id ? styles.bgPink : styles.bgWhite}`} onClick={selectedOption.id === option.id ? this.props.blankOption : () => this.props.selectOption(option)}>
                                                    <div>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${selectedOption.id === option.id ? styles.white : styles.black}`}>{`${option.title} (${option.person > 1 ? `${option.person} people` : `${option.person} person`}, ${option.hour > 1 ? `${option.hour} hrs` : `${option.hour} hr`})`}</p>
                                                        <p className={`${styles.font10} ${styles.mt2} ${selectedOption.id === option.id ? styles.white : styles.black}`}>{option.description}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`${styles.font14} ${selectedOption.id === option.id ? styles.white : styles.black}`}>{`$${numberWithCommas(option.price)}`}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{this.context.t("There is no available service & pricing option.")}</p>
                                        )}
                                    </div>
                                    </Collapse>
                                </div>
                                <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                                <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`}>
                                        <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("4. Comments (Optional)")}</p>
                                        <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show4 ? styles.rotate : null}`} />
                                    </div>
                                    <Collapse isOpened={show4} theme={{collapse: styles.collapse}}>
                                    <textarea className={`${styles.textArea} ${styles.mt3} ${styles.py3} ${styles.px2}`} placeholder={this.context.t("Please leave your message here.")} value={comment} name={"comment"} onChange={this.props.handleInputChange} />
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.goConfirm}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{isLoggedIn ? this.context.t("Submit the request") : this.context.t("Sign up & Submit the request")}</p>
                                    </div>
                                    </Collapse>
                                </div>
                                {/* <div className={`${styles.py3} ${styles.px3} ${styles.bgGrayE7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={this.props.goHome}>
                                    <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("Find other photographers in Seoul")}</p>
                                    <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Find More")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                                </div> */}
                            </Fragment>
                        ) : (
                            <Fragment>
                                {fromAuth ? (
                                    <div className={`${styles.px3}`}>
                                        <p className={`${styles.mt5} ${styles.fontBold} ${styles.font17}`}>{this.context.t("Please review your reservation deatils : ")}</p>
                                        <p className={`${styles.mt3} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Location")}</p>
                                        <p className={`${styles.mt2} ${styles.fontBold} ${styles.font14}`}>{request.location.name}</p>
                                        <div className={`${styles.mt3}`}>
                                            <Map
                                            isMarkerShown={true}
                                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className={`${styles.containerMap}`} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            lng={request.location.lng}
                                            lat={request.location.lat}
                                            />
                                        </div>
                                        <p className={`${styles.mt5} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Date&Time")}</p>
                                        {request.dateOption === 1 ? (
                                            <Fragment>
                                                <p className={`${styles.mt2} ${styles.fontBold} ${styles.font14}`}>{`${request.date.split('-')[0]}/${String(request.date.split('-')[1]).length === 2 ? (request.date.split('-')[1]) : '0'.concat(String(request.date.split('-')[1]))}/${request.date.split('-')[2]} ${request.hour}:${request.min}`}</p>
                                                <p className={`${styles.mt1} ${styles.font11}`}>{this.context.t("I have a specific date in mind")}</p>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <p className={`${styles.mt2} ${styles.fontBold} ${styles.font14}`}>{`${request.startDate.split('-')[0]}/${String(request.startDate.split('-')[1]).length === 2 ? (request.startDate.split('-')[1]) : '0'.concat(String(request.startDate.split('-')[1]))}/${request.startDate.split('-')[2]} ~ ${request.endDate.split('-')[0]}/${String(request.endDate.split('-')[1]).length === 2 ? (request.endDate.split('-')[1]) : '0'.concat(String(request.endDate.split('-')[1]))}/${request.endDate.split('-')[2]}`}</p>
                                                <p className={`${styles.mt1} ${styles.font11}`}>{this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}</p>
                                            </Fragment>
                                        )}
                                        <p className={`${styles.mt5} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Service&Pricing")}</p>
                                        <p className={`${styles.mt2} ${styles.fontBold} ${styles.font13}`}>{`${request.option.title} (${request.option.person > 1 ? `${request.option.person} people` : `${request.option.person} person`}, ${request.option.hour > 1 ? `${request.option.hour} hrs` : `${request.option.hour} hr`})`}</p>
                                        <p className={`${styles.mt1} ${styles.font11}`}>{request.option.description}</p>
                                        {request.comment ? (
                                            <Fragment>
                                                <p className={`${styles.mt5} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Comment")}</p>
                                                <p className={`${styles.mt2} ${styles.font13}`}>{request.comment}</p>
                                            </Fragment>
                                        ) : (
                                            null
                                        )}
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt5} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.submit}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Confirm and Submit Request")}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`${styles.px3}`}>
                                        <p className={`${styles.mt5} ${styles.fontBold} ${styles.font17}`}>{this.context.t("Submit Request")}</p>
                                        <p className={`${styles.mt3} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Location")}</p>
                                        <p className={`${styles.mt2} ${styles.fontBold} ${styles.font14}`}>{selectedLocation.name}</p>
                                        <div className={`${styles.mt3}`}>
                                            <Map
                                            isMarkerShown={true}
                                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className={`${styles.containerMap}`} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            lng={selectedLocation.lng}
                                            lat={selectedLocation.lat}
                                            />
                                        </div>
                                        <p className={`${styles.mt5} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Date&Time")}</p>
                                        {dateOption === 1 ? (
                                            <Fragment>
                                                <p className={`${styles.mt2} ${styles.fontBold} ${styles.font14}`}>{`${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).length === 2 ? (selectedDate.getMonth() + 1) : '0'.concat(String(selectedDate.getMonth() + 1))}/${selectedDate.getDate()} ${selectedAmPm} ${selectedHour}:${selectedMin}`}</p>
                                                <p className={`${styles.mt1} ${styles.font11}`}>{this.context.t("I have a specific date in mind")}</p>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <p className={`${styles.mt2} ${styles.fontBold} ${styles.font14}`}>{`${selectedStartDate.getFullYear()}/${String(selectedStartDate.getMonth() + 1).length === 2 ? (selectedStartDate.getMonth() + 1) : '0'.concat(String(selectedStartDate.getMonth() + 1))}/${selectedStartDate.getDate()} ~ ${selectedEndDate.getFullYear()}/${String(selectedEndDate.getMonth() + 1).length === 2 ? (selectedEndDate.getMonth() + 1) : '0'.concat(String(selectedEndDate.getMonth() + 1))}/${selectedEndDate.getDate()}`}</p>
                                                <p className={`${styles.mt1} ${styles.font11}`}>{this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}</p>
                                            </Fragment>
                                        )}
                                        <p className={`${styles.mt5} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Service&Pricing")}</p>
                                        <p className={`${styles.mt2} ${styles.fontBold} ${styles.font13}`}>{`${selectedOption.title} (${selectedOption.person > 1 ? `${selectedOption.person} people` : `${selectedOption.person} person`}, ${selectedOption.hour > 1 ? `${selectedOption.hour} hrs` : `${selectedOption.hour} hr`})`}</p>
                                        <p className={`${styles.mt1} ${styles.font11}`}>{selectedOption.description}</p>
                                        {comment ? (
                                            <Fragment>
                                                <p className={`${styles.mt5} ${styles.fontBold} ${styles.font13}`}>{this.context.t("Comment")}</p>
                                                <p className={`${styles.mt2} ${styles.font13}`}>{comment}</p>
                                            </Fragment>
                                        ) : (
                                            null
                                        )}
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt5} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.submit}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Confirm and Submit Request")}</p>
                                        </div>
                                    </div>
                                )}
                            </Fragment>
                        )
                    ) : (
                        profile.is_verified ? (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.heightFullPercent} ${styles.px3}`} style={{position: 'relative'}}>
                                <div className={`${styles.textCenter}`}>
                                    <img src={require('../../assets/images/request_complete.png')} alt={this.context.t("Submitted")} className={`${styles.mb4}`} style={{width: '100%', maxWidth: 400}} />
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.mt5}`}>{this.context.t("Your request was submitted successfully")}</p>
                                    <p className={`${styles.font12} ${styles.mt5} ${styles.textCenter}`} style={{lineHeight: 1.25}}>
                                        {photographer.nickname}{this.context.t(" is now reviewing your request.")}<br/>
                                        {this.context.t("We will soon send you a confirmation message")}<br/>
                                        {this.context.t("to your email and mobile number.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goHome}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go to the main page")}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles.mt3} ${styles.mtMd5} ${styles.px3}`}>
                                <p className={`${styles.fontExtraBold} ${styles.font1416} ${styles.textCenter}`}>{this.context.t("Your Reservation Request has been submitted!")}</p>
                                <div className={`${styles.mt2} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    <img src={require('../../assets/images/email_verifing.png')} width={'60%'} className={`${styles.imgVerifing}`} />
                                </div>
                                <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`}>
                                    {this.context.t("We sent a ")}
                                    <span className={`${styles.pink}`}>{this.context.t("verification email ")}</span>
                                    {this.context.t("to the following address :")}
                                </p>
                                <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`}>
                                    {profile.email}
                                </p>
                                <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`}>
                                    <span className={`${styles.pink}`}>{this.context.t("Please verify yourself by clicking the link attached in the email.")}</span>
                                    {this.context.t("When you complete the email verification, your request details will be sent to the selected photographer")}
                                </p>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.justifyContentMdCenter} ${styles.mt5}`}>
                                    <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mxMd3} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48}} onClick={this.props.send}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Resend")}</p>
                                    </div>
                                    <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mxMd3} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goHome}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Main")}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                )}
                <Modal
                open={showCalendar1} 
                onClose={this.props.closeCalendar1} 
                center
                styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                >
                    <div className={`${styles.containerModal}`}>
                        {selectDateStep === 1 && (
                            <Fragment>
                                <Calendar
                                locale={'en'}
                                calendarType={'US'}
                                className={`${styles.p3} ${styles.containerModal}`}
                                nextLabel={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Month")} className={`${styles.iconArrowRight}`} /></span>}
                                next2Label={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /></span>}
                                prevLabel={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Month")} className={`${styles.iconArrowRight}`} /></span>}
                                prev2Label={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /></span>}
                                navigationLabel={({ date, view, label }) => <p className={`${styles.fontBold} ${styles.font14}`}>{label}</p>}
                                tileClassName={`${styles.font12}`}
                                value={selectedDate}
                                onChange={this.props.selectDate}
                                />
                                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={() => this.props.changeDateStep(2)}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Next")}</p>
                                </div>
                            </Fragment>
                        )}
                        {selectDateStep === 2 && (
                            <Fragment>
                                <div className={`${styles.p3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <div className={`${styles.col1} ${styles.px0}`}>
                                            <img src={require('../../assets/images/icon_arrow_left.png')} alt={this.context.t("Before")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} onClick={() => this.props.changeDateStep(1)} />
                                        </div>
                                        <div className={`${styles.col10} ${styles.px0}`}>
                                            <p className={`${styles.fontBold} ${styles.font13} ${styles.textCenter}`}>{`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.py5}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                            <Picker
                                            optionGroups={optionGroups}
                                            valueGroups={valueGroups}
                                            onChange={this.props.handleChangeTimes} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.confirmDate}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Done")}</p>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </Modal>
                <Modal
                open={showCalendar2} 
                onClose={this.props.closeCalendar2} 
                center
                styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                >
                    <div className={`${styles.containerModal}`}>
                        <Fragment>
                            <Calendar
                            locale={'en'}
                            calendarType={'US'}
                            selectRange={true}
                            value={dateRange.length > 0 ? dateRange : null}
                            className={`${styles.p3} ${styles.containerModal}`}
                            nextLabel={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Month")} className={`${styles.iconArrowRight}`} /></span>}
                            next2Label={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /></span>}
                            prevLabel={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Month")} className={`${styles.iconArrowRight}`} /></span>}
                            prev2Label={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /></span>}
                            navigationLabel={({ date, view, label }) => <p className={`${styles.fontBold} ${styles.font14}`}>{label}</p>}
                            tileClassName={`${styles.font12}`}
                            onChange={this.props.selectDateRange}
                            />
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.confirmDate}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Done")}</p>
                            </div>
                        </Fragment>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PhotographerDetail;
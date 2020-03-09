import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Truncate from 'react-truncate';
import { Collapse } from 'react-collapse';
import styled from 'styled-components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import LocationComp from '../LocationComp';

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

const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker icon={require('../../assets/images/icon_marker.png')} position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
)))

class RequestComp extends Component{
    static propTypes = {
        request: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        showResponse: PropTypes.bool.isRequired,
        openResponse: PropTypes.func.isRequired,
        closeResponse: PropTypes.func.isRequired,
        dayList: PropTypes.array.isRequired,
        timeList: PropTypes.array.isRequired,
        selectedTime: PropTypes.array.isRequired,
        selectTime: PropTypes.func.isRequired,
        removeTime: PropTypes.func.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        submit: PropTypes.func.isRequired,
        photographer: PropTypes.object.isRequired,
        selectLocation: PropTypes.func.isRequired,
        blankLocation: PropTypes.func.isRequired,
        selectedLocation: PropTypes.object.isRequired,
        selectTime: PropTypes.func.isRequired,
        removeTime: PropTypes.func.isRequired,
        handleChangeCheckTime: PropTypes.func.isRequired,
        checkTime: PropTypes.bool.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        price: PropTypes.string.isRequired,
        readOnly: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { index, total, showResponse, request, photographer, selectedLocation, dayList, timeList, selectedTime, checkTime, price, isSubmitting, readOnly } = this.props;
        return(
            <Fragment>
                <div className={`${styles.py4} ${index === total - 1 ? null : styles.borderBtmGrayDc} ${styles.cursorPointer}`} onClick={showResponse ? this.props.closeResponse : this.props.openResponse}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                        <p className={`${styles.fontBold} ${styles.font1316}`}>
                            {`#${new Date().getFullYear()}-${request.id}`}
                        </p>
                        <p className={`${styles.fontBold} ${styles.font13} ${styles.px2} ${styles.py1} ${styles.cursorPointer} ${((request.status === 'selected')) ? styles.bgConfirmed : null} ${request.status === 'closed' ? styles.bgCancelled : null} ${request.status === 'submitted' ? styles.bgGray97 : null} ${request.status === 'none' ? styles.bgBlack : null} ${styles.white}`}>
                            {request.status === 'selected' && this.context.t('Selected')}
                            {request.status === 'closed' && this.context.t('Closed')}
                            {request.status === 'submitted' && this.context.t('Submitted')}
                            {request.status === 'none' && this.context.t('Apply')}
                        </p>
                    </div>
                    <div className={`${styles.mobileOnly}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                            <p className={`${styles.font1214} ${styles.fontBold}`}>
                                {`${request.photograpy_type.split(',')[0]}, etc`}
                            </p>
                            <div className={`${styles.bgBlack} ${styles.mx2}`} style={{width: 2, height: 14}} />
                            <p className={`${styles.font1214} ${styles.fontBold}`}>{`${request.person} ${request.person > 1 ? 'people' : 'person'}`}</p>
                            <div className={`${styles.bgBlack} ${styles.mx2}`} style={{width: 2, height: 14}} />
                            <p className={`${styles.font1214} ${styles.fontBold}`}>{`${request.hour} ${request.hour > 1 ? 'hours' : 'hour'}`}</p>
                        </div>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.widthFull}`}>
                            <p className={`${styles.font1214} ${styles.fontBold}`}>
                                {request.date_option === 'Specific' && `${request.specific_date.slice(2,4).concat('/',request.specific_date.slice(5,7), '/', request.specific_date.slice(8,10), ' ', request.specific_date.slice(11,13), ':', request.specific_date.slice(14,16))}`}
                                {request.date_option === 'Range' && (
                                    `${request.start_date.slice(2,4).concat('/',request.start_date.slice(5,7), '/', request.start_date.slice(8,10), ' ~ ', request.end_date.slice(2,4), '/',request.end_date.slice(5,7), '/', request.end_date.slice(8,10))}`
                                )}
                            </p>
                            <div className={`${styles.bgBlack} ${styles.mx2}`} style={{width: 2, height: 14}} />
                            <div className={`${styles.col5} ${styles.colSm6} ${styles.colMd9} ${styles.px0}`}>
                            <p className={`${styles.font1214} ${styles.fontBold}`}>
                                <Truncate lines={1} ellipsis={<span>...</span>}>
                                    {request.location_option === 'Specific' && `${request.locations && request.locations.length > 0 ? (
                                        request.locations.length > 1 ? (
                                            `${request.locations[0].name}, etc`
                                        ) : (
                                            `${request.locations[0].name}`
                                        )
                                    ) : (`location not selected`)}`}
                                    {request.location_option === 'Range' && (
                                        `as recommended by photographer`
                                    )}
                                </Truncate>
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.mobileNone}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontRBold} ${styles.font1214}`}>{this.context.t("Photograpy Type")}</p>
                            </div>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontRBold} ${styles.font1214}`}>{this.context.t("Person(s)/Hour(s)")}</p>
                            </div>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontRBold} ${styles.font1214}`}>{this.context.t("Date&Time")}</p>
                            </div>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontRBold} ${styles.font1214}`}>{this.context.t("Desired Location")}</p>
                            </div>
                        </div>
                        <div className={`${styles.row} ${styles.mx0} ${styles.mt2}`}>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontBold} ${styles.font1214}`}>
                                    {`${request.photograpy_type.split(',')[0]}, etc`}
                                </p>
                            </div>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontBold} ${styles.font1214}`}>{`${request.person} ${request.person > 1 ? 'people' : 'person'}/${request.hour} ${request.hour > 1 ? 'hours' : 'hour'}`}</p>
                            </div>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontBold} ${styles.font1214}`}>
                                    {request.date_option === 'Specific' && `${request.specific_date.slice(2,4).concat('/',request.specific_date.slice(5,7), '/', request.specific_date.slice(8,10), ' ', request.specific_date.slice(11,13), ':', request.specific_date.slice(14,16))}`}
                                    {request.date_option === 'Range' && (
                                        `${request.start_date.slice(2,4).concat('/',request.start_date.slice(5,7), '/', request.start_date.slice(8,10), ' ~ ', request.end_date.slice(2,4), '/',request.end_date.slice(5,7), '/', request.end_date.slice(8,10))}`
                                    )}
                                </p>
                            </div>
                            <div className={`${styles.col3} ${styles.pr3} ${styles.pl0}`}>
                                <p className={`${styles.fontBold} ${styles.font1214}`}>
                                    <Truncate lines={1} ellipsis={<span>...</span>}>
                                        {request.location_option === 'Specific' && `${request.locations && request.locations.length > 0 ? (
                                            request.locations.length > 1 ? (
                                                `${request.locations[0].name}, etc`
                                            ) : (
                                                request.locations[0].name
                                            )
                                        ) : (`location not selected`)}`}
                                        {request.location_option === 'Range' && (
                                            `as recommended by photographer`
                                        )}
                                    </Truncate>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {(request.status !== 'closed') && (
                    <Collapse isOpened={showResponse} theme={{collapse: styles.collapse}}>
                        <div className={`${styles.py3}`}>
                            <p className={`${styles.fontBold} ${styles.font16} ${styles.px3}`}>{this.context.t("Your Proposal")}</p>
                            <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt3} ${styles.px3}`}>{this.context.t("1. Photography Type : ")}{request.photograpy_type}</p>
                            <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt3} ${styles.px3}`}>{this.context.t("2. Person(s)/Hour(s) : ")}{`${request.person} ${request.person > 1 ? 'people' : 'person'}/${request.hour} ${request.hour > 1 ? 'hours' : 'hour'}`}</p>
                            <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt3} ${styles.px3}`}>{this.context.t("3. Photography Location")}</p>
                            {request.location_option === 'Specific' ? (
                                request.locations && request.locations.length > 0 ? (
                                    <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap} ${styles.px3}`}>
                                        {request.locations.map((location, index) => (
                                            <LocationComp key={index} location={location} selectedLocation={selectedLocation} index={index} total={request.locations.length} blankLocation={this.props.blankLocation} selectLocation={this.props.selectLocation} readOnly={readOnly} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3} ${styles.px3}`}>{this.context.t("There is no available location.")}</p>
                                )
                            ) : (
                                photographer.location_set && photographer.location_set.length > 0 ? (
                                    <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap} ${styles.px3}`}>
                                        {photographer.location_set.map((location, index) => (
                                            <LocationComp key={index} location={location} selectedLocation={selectedLocation} index={index} total={photographer.location_set.length} blankLocation={this.props.blankLocation} selectLocation={this.props.selectLocation} readOnly={readOnly} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3} ${styles.px3}`}>{this.context.t("There is no available location.")}</p>
                                )
                            )}
                            {selectedLocation.lat ? (
                                <div className={`${styles.mt3} ${styles.px3}`}>
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
                            <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt3} ${styles.px3}`}>{this.context.t("4. Date&Time")}</p>
                            {request.date_option === 'Specific' ? (
                                <Fragment>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3} ${styles.px3}`}>
                                        <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${request.specific_date.slice(0,4)}/${request.specific_date.slice(5,7)}/${request.specific_date.slice(8,10)}`}</p>
                                        </div>
                                        <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${request.specific_date.slice(11,13)}:${request.specific_date.slice(14,16)}`}</p>
                                        </div>
                                    </div>
                                    {request.status === 'none' && (
                                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3} ${styles.px3}`} onClick={this.props.handleChangeCheckTime}>
                                            <div className={`${styles.checkBoxDark} ${checkTime ? styles.checked : null} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                                {checkTime && (
                                                    <img src={require('../../assets/images/icon_checked.png')} className={`${styles.iconChecked}`} />
                                                )}
                                            </div>
                                            <div className={`${styles.checkBoxDarkText}`}>
                                                <p className={`${checkTime ? styles.fontBold : null} ${styles.font1113} ${styles.ml2}`}>
                                                    {this.context.t("Yes, I’m available at the date&time. I’d like to confirm the reservation.")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            ) : (
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
                                            {timeList.map((time, index) => {
                                                const isSelected = selectedTime.find(se => se === `${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) ? true : false
                                                return(
                                                    <div key={index} className={`${isSelected ? styles.bgConfirmed :styles.bgWhite} ${styles.containerDayBox} ${styles.cursorPointer}`} onClick={readOnly ? null : isSelected ? () => this.props.removeTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) :() => this.props.selectTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`)}>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ))}
                                </DayContainer>
                            )}
                            <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt3} ${styles.px3}`}>{this.context.t("5. Price")}</p>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.px3}`}>
                                <p className={`${styles.font14} ${styles.fontBold}`}>
                                    $
                                </p>
                                <input className={`${styles.textInput11} ${styles.ml2}`} readOnly={readOnly} style={{width: 100}} type={"text"} name={'price'} value={price} onChange={this.props.handleInputChange} />
                                <p className={`${styles.font14} ${styles.ml2}`}>
                                    {`for ${request.hour} ${request.hour > 1 ? `hours` : 'hour'} photography, ${request.person} ${request.person > 1 ? `people` : `person`}`}
                                </p>
                            </div>
                            {request.status === 'none' && (
                                <div className={`${styles.row} ${styles.mx0} ${styles.justifyContentCenter}`}>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${request.date_option === 'Specific' ? checkTime ? null : styles.opacity7 : null} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48, width: 200}} onClick={this.props.submit}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Send Your Proposal")}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Collapse>
                )}
            </Fragment>
        )
    }
}

export default RequestComp
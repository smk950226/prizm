import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import PortfolioSlider from '../PortfolioSlider';
import styled from 'styled-components';
import Truncate from 'react-truncate';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import Calendar from 'react-calendar';
import Modal from 'react-responsive-modal';

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

const hourList = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
]

const minList = [
    '00',
    '30'
]

class PhotographerDetail extends Component{
    static propTypes = {
        photographer: PropTypes.array,
        loading: PropTypes.string.isRequired,
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
        selectHour: PropTypes.func.isRequired,
        selectMin: PropTypes.func.isRequired,
        handleShowHourList: PropTypes.func.isRequired,
        handleShowMinList: PropTypes.func.isRequired,
        showHourList: PropTypes.bool.isRequired,
        showMinList: PropTypes.bool.isRequired,
        selectDateRange: PropTypes.func.isRequired,
        selectedStartDate: PropTypes.any.isRequired,
        selectedEndDate: PropTypes.any.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isOpen: false,
        photoIndex: 0
    }

    render(){
        const { photographer, loading, isTruncated, selectedLocation, dateOption, selectedOption, comment, isSubmitting, show1, show2, show3, show4, showCalendar1, showCalendar2, selectedDate, dateConfirm, selectDateStep, selectedHour, selectedMin, showHourList, showMinList, selectedStartDate, selectedEndDate } = this.props;
        return(
            <div className={`${styles.safeareaTop} ${styles.containerCustomer}`}>
                {loading ? (
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    <Fragment>
                        {photographer.portfolio_set && photographer.portfolio_set.length > 0 ? (
                            <PortfolioSlider portfolio={photographer.portfolio_set} />
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
                                <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Education")}</p>
                                <p className={`${styles.font10}`}>{photographer.education}</p>
                            </div>
                            <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Career")}</p>
                                <p className={`${styles.font10}`}>{photographer.career}</p>
                            </div>
                            {photographer.portfolio_url ? (
                                <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                    <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Portfolio")}</p>
                                    <a href={photographer.portfolio_url} target={'_blank'} className={`${styles.font10} ${styles.black}`} style={{textDecoration: 'none'}}>{photographer.portfolio_url}</a>
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
                                    <p className={`${styles.fontBold} ${styles.font11} ${styles.mr1}`}>{photographer.total_rating}</p>
                                    <Rating 
                                    initialRating={photographer.total_rating} 
                                    emptySymbol={<MdStar fontSize={"15px"} color={"#f4f4f4"} />}
                                    fullSymbol={<MdStar fontSize={"15px"} color={"#fffb64"} />}
                                    fractions={2}
                                    readonly
                                    />
                                    <p className={`${styles.font9} ${styles.ml1}`}>({photographer.review_count})</p>
                                    <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("1. Select Location")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show1 ? styles.rotate : null}`} onClick={show1 ? selectedLocation.id ? this.props.close1 : null : this.props.open1} />
                            </div>
                            <SlideDown closed={!show1} className={'my-dropdown-slidedown'}>
                                {photographer.location_set && photographer.location_set.length > 0 ? (
                                    <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                        {photographer.location_set.map((location, index) => (
                                            <div key={index} className={`${styles.containerLocation} ${selectedLocation.id === location.id ? styles.selected : null} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer} ${index === photographer.location_set.length - 1 ? null : styles.mr3}`} onClick={selectedLocation.id === location.id ? this.props.blankLocation : () => this.props.selectLocation(location)}>
                                                <div>
                                                    <p className={`${styles.font10}`}>{this.context.t(`Location ${index + 1}`)}</p>
                                                    <p className={`${styles.fontBold} ${styles.font11} ${styles.mt1}`}>{location.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{this.context.t("선택가능한 지역이 없습니다.")}</p>
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
                            </SlideDown>
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("2. Date&Time")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show2 ? styles.rotate : null}`} onClick={(dateConfirm ) ? show2 ? this.props.close2 : this.props.open2 : null}/>
                            </div>
                            <SlideDown closed={!show2}>
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
                                    <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`} style={{width: 'calc(50% - 8px)'}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`}</p>
                                    </div>
                                    <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`} style={{width: 'calc(50% - 8px)'}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedHour}:${selectedMin}`}</p>
                                    </div>
                                </div>
                            )}
                            <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={dateOption === 2 ? this.props.blankDateOption : () => this.props.handleChangeDateOption(2)}>
                                <div className={`${styles.checkBox} ${dateOption !== 2 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    {dateOption === 2 && (
                                        <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("I don’t have a specific date in mind yes, but my availability in Newyork City is as follows :")} className={`${styles.iconCheck}`} />
                                    )}
                                </div>
                                <div className={`${styles.checkBoxText}`}>
                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{this.context.t("I don’t have a specific date in mind yes, but my availability in Newyork City is as follows :")}</p>
                                </div>
                            </div>
                            {dateConfirm && (dateOption === 2) && (
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                    <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`} style={{width: 'calc(50% - 8px)'}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedStartDate.getFullYear()}/${selectedStartDate.getMonth() + 1}/${selectedStartDate.getDate()}`}</p>
                                    </div>
                                    <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`} style={{width: 'calc(50% - 8px)'}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedEndDate.getFullYear()}/${selectedEndDate.getMonth() + 1}/${selectedEndDate.getDate()}`}</p>
                                    </div>
                                </div>
                            )}
                            </SlideDown>
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("3. Service&Pricing")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show3 ? styles.rotate : null}`} onClick={selectedOption.id ? show3 ?  this.props.close3 : this.props.open3 : null}/>
                            </div>
                            <SlideDown closed={!show3}>
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
                                    <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{this.context.t("선택가능한 옵션이 없습니다.")}</p>
                                )}
                            </div>
                            </SlideDown>
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("4. Comments")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show4 ? styles.rotate : null}`} />
                            </div>
                            <SlideDown closed={!show4}>
                            <textarea className={`${styles.textArea} ${styles.mt3} ${styles.py3} ${styles.px2}`} placeholder={this.context.t("comment")} value={comment} name={"comment"} onChange={this.props.handleInputChange} />
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("submit the request")}</p>
                            </div>
                            </SlideDown>
                        </div>
                        <div className={`${styles.py3} ${styles.px3} ${styles.bgGrayE7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("Find other photogrpahes in New York")}</p>
                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Find More")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                        </div>
                    </Fragment>
                )}
                <Modal
                open={showCalendar1} 
                onClose={this.props.closeCalendar1} 
                center
                classNames={`${styles.px0}`}
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
                                            <p className={`${styles.fontBold} ${styles.font13} ${styles.textCenter}`}>{`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDay()}`}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.py5}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                            <div className={`${styles.textInput5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer}`} type={"text"} name={"time"} onClick={this.props.handleShowHourList} style={{position: 'relative'}}>
                                                <p className={`${styles.font13} ${styles.mx2} ${styles.textCenter}`}>{selectedHour}</p>
                                                {showHourList && (
                                                    <div style={{position: 'absolute', top: 25, width: 50, maxHeight: 150}} className={`${styles.bgWhite} ${styles.borderDropdown} ${styles.overflowYScroll}`}>
                                                        {hourList.map((hour,index) => (
                                                            <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer} ${styles.textCenter}`} onClick={() => this.props.selectHour(hour)}>{hour}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <p className={`${styles.font13} ${styles.mx2}`}>:</p>
                                            <div className={`${styles.textInput5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer}`} type={"text"} name={"time"} onClick={this.props.handleShowMinList} style={{position: 'relative'}}>
                                                <p className={`${styles.font13} ${styles.mx2} ${styles.textCenter}`}>{selectedMin}</p>
                                                {showMinList && (
                                                    <div style={{position: 'absolute', top: 25, width: 50, maxHeight: 150}} className={`${styles.bgWhite} ${styles.borderDropdown} ${styles.overflowYScroll}`}>
                                                        {minList.map((min,index) => (
                                                            <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer} ${styles.textCenter}`} onClick={() => this.props.selectMin(min)}>{min}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
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
                classNames={`${styles.px0}`}
                styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                >
                    <div className={`${styles.containerModal}`}>
                        <Fragment>
                            <Calendar
                            locale={'en'}
                            calendarType={'US'}
                            selectRange={true}
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
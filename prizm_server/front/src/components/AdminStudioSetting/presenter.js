import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import styled from 'styled-components';
import PortfolioSlider from '../PortfolioSlider';
import MdClose from 'react-ionicons/lib/MdClose';
import MdCheckmark from 'react-ionicons/lib/MdCheckmark';
import Truncate from 'react-truncate';
import Modal from 'react-modal';
import MdAdd from 'react-ionicons/lib/MdAdd';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import Picker from 'react-mobile-picker-scroll';
import MyLoader from '../Loader';
import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { Collapse } from 'react-collapse';
import LocationComp from '../LocationComp';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import Calendar from 'react-calendar';
import RModal from 'react-responsive-modal';
import InputMask from 'react-input-mask';
import DragSortableList from 'react-drag-sortable';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Slider from "react-slick";
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import { CITY_LIST } from '../../utils/city';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    accessibility: false,
    draggable: false,
    infinite: false,
    touchMove: false,
    pauseOnHover: false,
    swipe: false,
    adaptiveHeight: true
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className={`${styles.widthFull} ${styles.heightFullPercent}`} />,
    }),
    lifecycle({
        componentWillMount() {
        const refs = {}

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {
            refs.searchBox = ref;
            },
            onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            this.props.searchLocation(places)
            this.setState({
                places,
            });
            },
        })
        },
    }),
    withScriptjs  
)(props =>
    <div data-standalone-searchbox="" className={`${styles.widthFull}`}>
        <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
        >
        <input
            type="text"
            placeholder="Search location"
            style={{
            boxSizing: `border-box`,
            border: `none`,
            width: `100%`,
            height: `40px`,
            padding: `0 12px`,
            fontSize: `13px`,
            outline: `none`,
            textOverflow: `ellipses`,
            color: '#333333'
            }}
        />
        </StandaloneSearchBox>
    </div>
);

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

const EmptyProfileDivLg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-color: #333333;
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;
`

const customStyles = {
    content : {
      top                   : '0',
      left                  : '0',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '0',
      border                : 'none',
      width                 : '100%',
      zIndex                : 99999,
      padding               : 0
    }
};

const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    center={props.selectedLocation.geometry ? { lat: props.selectedLocation.geometry.location.lat(), lng: props.selectedLocation.geometry.location.lng() } : props.searchedLocations.length > 0 ? { lat: props.searchedLocations[0].geometry.location.lat(), lng: props.searchedLocations[0].geometry.location.lng()} : { lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && props.searchedLocations.length > 0 && (
        props.searchedLocations.map((location, index) => {
            const find = props.locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
            return(
                <MarkerWithLabel 
                key={index}
                icon={find ? require('../../assets/images/icon_marker_selected.png') : require('../../assets/images/icon_marker_not.png')} 
                position={location.geometry.location} 
                onClick={() => props.selectLocation(location)}
                labelAnchor={index > 8 ? {x: 6, y: 20} : {x: 3.5, y: 20}}
                >
                    <p className={`${styles.fontBold} ${styles.font11} ${styles.white}`}>{index + 1}</p>
                </MarkerWithLabel>
            )
        })
    )}
  </GoogleMap>
)))

const Map2 = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker icon={require('../../assets/images/icon_marker.png')} position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
)))

class AdminSignUp extends Component{
    static propTypes = {
        images: PropTypes.array.isRequired,
        opacityList: PropTypes.array.isRequired,
        submit: PropTypes.func.isRequired,
        removeImage: PropTypes.func.isRequired,
        nickname: PropTypes.string.isRequired,
        mainLocation: PropTypes.string.isRequired,
        showMobile: PropTypes.bool.isRequired,
        openMobile: PropTypes.func.isRequired,
        closeMobile: PropTypes.func.isRequired,
        submitProfile: PropTypes.func.isRequired,
        profileImage: PropTypes.any,
        handleInputChange: PropTypes.func.isRequired,
        equipment: PropTypes.string.isRequired,
        career: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isTruncated: PropTypes.bool.isRequired,
        doTruncate: PropTypes.func.isRequired,
        undoTruncate: PropTypes.func.isRequired,
        locations: PropTypes.array.isRequired,
        options: PropTypes.array.isRequired,
        openLocationModal: PropTypes.func.isRequired,
        closeLocationModal: PropTypes.func.isRequired,
        showLocationModal: PropTypes.bool.isRequired,
        locationSearch: PropTypes.string.isRequired,
        locationSearched: PropTypes.bool.isRequired,
        searchLocation: PropTypes.func.isRequired,
        searchedLocations: PropTypes.array,
        selectLocation: PropTypes.func.isRequired,
        selectedLocation: PropTypes.object,
        completeLocationSearch: PropTypes.func.isRequired,
        removeLocation: PropTypes.func.isRequired,
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
        customerSelectedLocation: PropTypes.object,
        selectCustomerLocation: PropTypes.func.isRequired,
        blankCustomerLocation: PropTypes.func.isRequired,
        openOptionModal: PropTypes.func.isRequired,
        closeOptionModal: PropTypes.func.isRequired,
        showOptionModal: PropTypes.bool.isRequired,
        optionTitle: PropTypes.string.isRequired,
        optionType: PropTypes.string.isRequired,
        optionDescription: PropTypes.string.isRequired,
        optionPerson: PropTypes.string.isRequired,
        optionHour: PropTypes.string.isRequired,
        optionPrice: PropTypes.string.isRequired,
        completeAddOption: PropTypes.func.isRequired,
        removeOption: PropTypes.func.isRequired,
        openOptionPlus: PropTypes.func.isRequired,
        closeOptionPlus: PropTypes.func.isRequired,
        showOptionPlus: PropTypes.bool.isRequired,
        dateConfirm: PropTypes.bool.isRequired,
        selectDateStep: PropTypes.number.isRequired,
        selectedHour: PropTypes.string.isRequired,
        selectedMin: PropTypes.string.isRequired,
        selectedAmPm: PropTypes.string.isRequired,
        dateOption: PropTypes.number.isRequired,
        selectedDate: PropTypes.string.isRequired,
        selectedStartDate: PropTypes.string.isRequired,
        selectedEndDate: PropTypes.string.isRequired,
        changeDateStep: PropTypes.func.isRequired,
        handleChangeDateOption: PropTypes.func.isRequired,
        blankDateOption: PropTypes.func.isRequired,
        selectDate: PropTypes.func.isRequired,
        selectDateRange: PropTypes.func.isRequired,
        confirmDate: PropTypes.func.isRequired,
        dateRange: PropTypes.array.isRequired,
        customerSelectedOption: PropTypes.object.isRequired,
        selectOption: PropTypes.func.isRequired,
        blankOption: PropTypes.func.isRequired,
        comment: PropTypes.string.isRequired,
        studioId: PropTypes.string.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        confirm: PropTypes.func.isRequired,
        update: PropTypes.bool.isRequired,
        onSort: PropTypes.func.isRequired,
        handleChangeTimes: PropTypes.func.isRequired,
        step: PropTypes.number.isRequired,
        openCityList: PropTypes.func.isRequired,
        closeCityList: PropTypes.func.isRequired,
        handleCityList: PropTypes.func.isRequired,
        showCityList: PropTypes.bool.isRequired,
        selectCity: PropTypes.func.isRequired,
        changeStep: PropTypes.func.isRequired,
        studioIdError: PropTypes.bool.isRequired,
        handleStudioIdChange: PropTypes.func.isRequired,
        showLocationAdded: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.step !== this.props.step){
            window.scrollTo(0,0)
        }
    }

    _nextSlide = async() => {
        const { step, changeStep, profileImage, nickname, images, mainLocation, description } = this.props;
        if(step === 1){
            if(profileImage && nickname && (images && (images.length > 0)) && mainLocation){
                changeStep(2)
                this.slider.slickNext()
            }
            else{
                alert(this.context.t("Please fill out all informations."))
            }
        }
        else if(step === 2){
            changeStep(3)
            this.slider.slickNext()
        }
        else if(step === 3){
            if(description){
                changeStep(4)
                this.slider.slickNext()
            }
            else{
                alert(this.context.t("Please fill out all informations."))
            }
        }
    }

    _previousSlide = () => {
        const { step, changeStep } = this.props;
        if(step > 1){
            changeStep(step - 1)
        }
        this.slider.slickPrev()
    }

    render(){
        const { 
            showMobile,
            update,
            nickname,
            images,
            opacityList,
            profileImage,
            mainLocation,
            career,
            equipment,
            description,
            locations,
            searchedLocations,
            locationSearched,
            selectedLocation,
            options,
            optionTitle,
            optionType,
            optionDescription,
            optionPerson,
            optionPrice,
            optionHour,
            studioId,
            isSubmitting,
            show1,
            show2,
            show3,
            show4,
            customerSelectedLocation,
            dateConfirm,
            dateOption,
            selectedDate,
            selectedAmPm,
            selectedHour,
            selectedMin,
            selectedStartDate,
            selectedEndDate,
            customerSelectedOption,
            comment,
            showLocationModal,
            showOptionModal,
            showCalendar1,
            showCalendar2,
            selectDateStep,
            optionGroups,
            valueGroups,
            dateRange,
            showOptionPlus,
            step,
            showCityList,
            studioIdError,
            showLocationAdded
         } = this.props;
        let displayImages = []
        const dragableImages = images.map((image, index) => {
            displayImages.push(image.image)
            return{
                content: (<img key={index} src={image.image.image} alt={`portfolio-${index+1}`} className={`${styles.containerAdminPortfolioInner} ${styles.mr3} ${styles.cursorPointer}`} onDoubleClick={() => this.props.removeImage(index)}/>),
                image: image
            }
        })
        return(
            <div className={`${styles.containerAdmin} ${showMobile ? null : styles.pxAdmin2}`}>
                <div className={`${styles.mobileNone}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.widthFull}`}>
                        <div className={`${styles.safearea} ${styles.containerAdminStudioSide} ${styles.heightFull} ${styles.overflowYScroll}`}>
                            <p className={`${styles.mtStudio} ${styles.fontBold} ${styles.font2024}`}>{update ? this.context.t(`Hello, ${nickname}!`) : this.context.t("My Studio Setup")}</p>
                            <p className={`${styles.mt1} ${styles.mtMd2} ${styles.font1416}`}>{this.context.t("Please fill out information below to create your first ")}<span className={`${styles.fontBold}`}>{'PRIZM'}</span>{this.context.t(" Studio")}</p>
                            <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Your Portfolio")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${images && images.length > 0 ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please upload sample images to be shown at the top of your PRIZM studio.")}<br/>{this.context.t("If you want to remove an uploaded image, double click the image.")}</p>
                            <div className={`${styles.containerAdminPortfolio} ${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.mt3} ${styles.flexNowrap} ${styles.overflowXScroll}`}>
                                {images && images.length > 0 ? (
                                    <Fragment>
                                        <label htmlFor={'portfolio'}>
                                            <div className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray16} ${styles.mr3}`}>
                                                <p className={`${styles.font40} ${styles.white}`}>+</p>
                                            </div>
                                        </label>
                                        <DragSortableList className={`${styles.overflowXScroll}`} items={dragableImages} moveTransitionDuration={0.3} type={'horizontal'} onSort={this.props.onSort} />
                                        {/* {images.map((image, index) => (
                                            <img key={index} src={image.image} alt={`portfolio-${index+1}`} className={`${styles.containerAdminPortfolioInner} ${styles.mr3} ${styles.cursorPointer}`} onClick={() => this.props.removeImage(index)}/>
                                        ))} */}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <label htmlFor={'portfolio'}>
                                            <div className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray16} ${styles.mr3}`}>
                                                <p className={`${styles.font40} ${styles.white}`}>+</p>
                                            </div>
                                        </label>
                                        {opacityList.map((opacity, index) => (
                                            <div key={index} className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray16} ${styles.mr3}`} style={{opacity: opacity}}>
                                            </div>
                                        ))}
                                    </Fragment>
                                )}
                            </div>
                            <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Profile Picture")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${profileImage ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please upload a profile picture.")}</p>
                            <div className={`${styles.mt3}`}>
                                <label htmlFor={'profile'}>
                                    {profileImage ? (
                                        <ProfileDivLg image={profileImage.image ? profileImage.image : profileImage} />
                                    ) : (
                                        <div className={`${styles.containerStudioProfile} ${styles.bgGray16} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                            <p className={`${styles.font40} ${styles.white}`}>+</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                            <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Name")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${nickname ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please enter your (studio) name.")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"nickname"} value={nickname} maxLength={30} onChange={this.props.handleInputChange} />
                            </div>
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Main Photography Location")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${mainLocation ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please type in your main photography (business) location.")}</p>
                            <div className={`${styles.containerStudioInput} ${styles.textInput6} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.p0} ${styles.justifyContentBetween}`} style={{position: 'relative'}} onClick={this.props.handleCityList}>
                                <input className={`${styles.mainLocationInput}`} readOnly={true} type={"text"} name={"mainLocation"} value={mainLocation} />
                                <MdArrowDropdown fontSize="13px" color="#000000" />
                                {showCityList && (
                                    <div style={{position: 'absolute', top: 38, maxHeight: 150}} className={`${styles.bgWhite} ${styles.widthFull} ${styles.py2} ${styles.overflowYScroll}`}>
                                        {CITY_LIST.map(city => (
                                            <p key={city.value} className={`${styles.font1113} ${styles.cursorPointer} ${styles.py2}`} onClick={() => this.props.selectCity(city.label)}>
                                                {city.label}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Career (Optional)")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${career ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please type in your career information.")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"career"} value={career} onChange={this.props.handleInputChange} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font911}`}>{this.context.t("ex) your work experiences, exhibitions, awards, etc")}</p>
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Equipment (Optional)")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${equipment ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please type in your equipment.")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"equipment"} value={equipment} onChange={this.props.handleInputChange} maxLength={30} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font911}`}>{this.context.t("ex) Sony A7 II, Canon EOS 5 D Mark IV, EF 50mm F12 USM")}</p>
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Description")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${description ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please briefly introduce yourself.")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <textarea placeholder={this.context.t("Introduce yourself to potential PRIZM clients here.")} className={`${styles.textArea2} ${styles.mt3} ${styles.py3} ${styles.px2}`} value={description} name={"description"} onChange={this.props.handleInputChange} />
                            </div>
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Select Photography Spots")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${locations && locations.length > 0 ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>
                                {this.context.t("Detailed location where you would like to meet tourists")}<br/>
                                {this.context.t("Search on the map to add your first photography spot")}
                            </p>
                            <div className={`${styles.mobileOnly} ${styles.mt3}`}>
                                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={this.props.openLocationModal}>
                                    <p className={`${styles.font32} ${styles.white}`}>{`+`}</p>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.white}`}>{this.context.t("Add a new location")}</p>
                                    <p className={`${styles.font32} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                                </div>
                            </div>
                            <div className={`${styles.mobileNone} ${styles.mt3}`}>
                                <div className={`${styles.width90} ${styles.containerGooglemap} ${styles.row} ${styles.mx0}`}>
                                    <div className={`${styles.containerGooglemapSearch}`}>
                                        <div className={`${styles.px2} ${styles.bgGray5c} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} style={{height: 70}}>
                                            <div className={`${styles.col12} ${styles.px0}`}>
                                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.white} ${styles.mb1}`}>{this.context.t("Search location")}</p>
                                                <PlacesWithStandaloneSearchBox searchLocation={this.props.searchLocation} />
                                            </div>
                                        </div>
                                        {searchedLocations.length > 0 ? (
                                        <div className={`${styles.bgWhite} ${styles.widthFull} ${styles.containerSearchedLocationPc}`}>
                                            {searchedLocations.map((location, index) => {
                                                const find = locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
                                                return(
                                                    <div key={index} className={`${index === searchedLocations.length - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} onClick={() => this.props.selectLocation(location)}>
                                                        <div className={`${styles.col10} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                            <div className={`${styles.col1} ${styles.px0}`}>
                                                                <p className={`${styles.fontBold} ${styles.font12} ${find ? styles.pink : null}`}>{index + 1}</p>
                                                            </div>
                                                            <div className={`${styles.col11} ${styles.px0}`}>
                                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.ml2} ${find ? styles.pink : null}`}>{location.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.col2} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                                            <div className={`${styles.circle24} ${find ? styles.bgPink : styles.bgGray5c} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                                                {find ? (
                                                                    <MdClose fontSize="15px" color="#ffffff" />
                                                                ) : (
                                                                    <MdAdd fontSize="15px" color="#ffffff" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        null
                                    )}
                                    </div>
                                    <div className={`${styles.containerGooglemapMap}`}>
                                        <Map
                                        isMarkerShown={locationSearched}
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div className={`${styles.widthFull} ${styles.heightFullPercent}`} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        searchedLocations={searchedLocations}
                                        locations={locations}
                                        lng={locationSearched ? 126.9748523 : 126.9748523}
                                        lat={locationSearched ? 37.5796212 : 37.5796212}
                                        selectedLocation={selectedLocation}
                                        selectLocation={this.props.selectLocation}
                                        />
                                    </div>
                                </div>
                            </div>
                            {locations && locations.length > 0 && (
                                <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                                    {locations.map((location, index) => (
                                        <div key={index} className={`${styles.col12} ${styles.colMd4} ${styles.px0}`}>
                                            <div className={`${styles.col12} ${styles.colMd10} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2} ${styles.bgPink} ${styles.px2} ${styles.py2} ${styles.containerLocationBox}`}>
                                                <div className={`${styles.col10} ${styles.px0}`}>
                                                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.white}`}>{this.context.t(`Location ${index + 1}`)}</p>
                                                    <p className={`${styles.fontBold} ${styles.font1113} ${styles.white} ${styles.mt1}`}>{location.name}</p>
                                                </div>
                                                <div className={`${styles.cursorPointer} ${styles.col2} ${styles.px0} ${styles.textRight}`} onClick={() => this.props.removeLocation(location)}>
                                                    <MdClose fontSize={'24px'} color={'#ffffff'}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Service and Pricing")}</p>
                                <MdCheckmark fontSize="20px" color="#3cd59e" className={`${options && options.length > 0 ? null : styles.hidden}`} />
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Click the button below to create a new service & pricing option.")}</p>
                            <div className={`${styles.mobileOnly} ${styles.mt3}`}>
                                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={this.props.openOptionModal}>
                                    <p className={`${styles.font3240} ${styles.white}`}>{`+`}</p>
                                    <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Create a new option")}</p>
                                    <p className={`${styles.font3240} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                                </div>
                            </div>
                            <div className={`${styles.mobileNone} ${styles.mt3}`}>
                                {showOptionPlus && (
                                    <Fragment>
                                        <p className={`${styles.mt3} ${styles.fontBold} ${styles.font1113}`}>{this.context.t(`Option ${options.length + 1}`)}</p>
                                        <div className={`${styles.borderGray97} ${styles.mt2} ${styles.px2} ${styles.py3} ${styles.containerStudioInput}`}>
                                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Title")}</p>
                                            </div>
                                            <div className={`${styles.containerStudioInput}`}>
                                                <input className={`${styles.textInput6}`} type={"text"} name={"optionTitle"} value={optionTitle} onChange={this.props.handleInputChange} placeholder={this.context.t("ex) Romantic Wedding, Couple in Seoul")} />
                                            </div>
                                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Photography Type")}</p>
                                            </div>
                                            <div className={`${styles.containerStudioInput}`}>
                                                <input className={`${styles.textInput6}`} type={"text"} name={"optionType"} value={optionType} onChange={this.props.handleInputChange} placeholder={this.context.t("ex) Wedding, Couple, Single, Group")} />
                                            </div>
                                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Description")}</p>
                                            </div>
                                            <div className={`${styles.containerStudioInput}`}>
                                                <input className={`${styles.textInput6}`} type={"text"} name={"optionDescription"} value={optionDescription} onChange={this.props.handleInputChange} placeholder={this.context.t("ex) Please describe this service option here.")} />
                                            </div>
                                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                                <div className={`${styles.col3} ${styles.px0}`}>
                                                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Person(s)")}</p>
                                                    <div className={`${styles.containerStudioInput}`}>
                                                        <input className={`${styles.textInput6}`} type={"text"} name={"optionPerson"} value={optionPerson} onChange={this.props.handleInputChange} maxLength={2} />
                                                    </div>
                                                </div>
                                                <div className={`${styles.col3} ${styles.px0}`}>
                                                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Hour(s)")}</p>
                                                    <div className={`${styles.containerStudioInput}`}>
                                                        <input className={`${styles.textInput6}`} type={"text"} name={"optionHour"} value={optionHour} onChange={this.props.handleInputChange} maxLength={2} />
                                                    </div>
                                                </div>
                                                <div className={`${styles.col3} ${styles.px0}`}>
                                                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Price (USD, $)")}</p>
                                                    <div className={`${styles.containerStudioInput}`}>
                                                        <input className={`${styles.textInput6}`} type={"text"} name={"optionPrice"} value={optionPrice} onChange={this.props.handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt45} ${styles.mtMd3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.completeAddOption}>
                                                    <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Save")}</p>
                                                </div>
                                                {showOptionPlus && (
                                                    <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.closeOptionPlus}>
                                                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Cancel")}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                                {!showOptionPlus && (
                                    <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={this.props.openOptionPlus}>
                                        <p className={`${styles.font3240} ${styles.white}`}>{`+`}</p>
                                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Create a new option")}</p>
                                        <p className={`${styles.font3240} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                                    </div>
                                )}
                            </div>
                            {options && options.length > 0 && (
                                <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                                    {options.map((option, index) => (
                                        <div key={index} className={`${styles.containerStudioInput}`}>
                                            <div className={`${styles.px3} ${styles.py3} ${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2}`} style={{opacity: 0.8}}>
                                                <div>
                                                    <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t(`${option.title}`)}</p>
                                                    <p className={`${styles.fontBold} ${styles.font1214} ${styles.white} ${styles.mt1}`}>{this.context.t(`${option.photograpy_type} / ${numberWithCommas(option.person)} person(s) ${numberWithCommas(option.hour)} hour(s) $${numberWithCommas(option.price)}`)}</p>
                                                </div>
                                                <div className={`${styles.cursorPointer}`} onClick={() => this.props.removeOption(option)}>
                                                    <MdClose fontSize={'24px'} color={'#ffffff'}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Your PRIZM Studio URL")}</p>
                            </div>
                            <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>
                                {this.context.t("Please type in a desired URL for your PRIZM studio. ")}
                                <span className={`${studioIdError ? styles.alert : null}`}>
                                    {this.context.t("(only english)")}
                                </span>
                            </p>
                            <div className={`${styles.containerStudioInput}`}>
                                <InputMask mask={'prizm.cloud/********************'} 
                                formatChars={{
                                    '*': '[ㄱ-힣A-Za-z0-9!@#$()-_+=.,]'
                                }}
                                maskChar={''} alwaysShowMask={true} value={studioId} onChange={this.props.handleStudioIdChange}>
                                    {(inputProps) => <input {...inputProps} type={"text"} name={"studioId"} className={`${styles.textInput6}`} />}
                                </InputMask>
                            </div>
                            <div className={`${styles.mobileOnly} ${styles.mt45}`}>
                                <p className={`${styles.fontBold} ${styles.font1214}`}>
                                    {this.context.t("Make sure to double check that all the information is correct. Click on the smartphone icon at the top right corner to view your PRIZM Studio.")}
                                </p>
                            </div>
                            <div className={`${styles.mobileNone} ${styles.mt5}`}>
                                <p className={`${styles.fontBold} ${styles.font1214}`}>
                                    {this.context.t("Make sure to double check that all the information is correct.")}<br/>
                                    {this.context.t("Click on the smartphone icon at the top right corner to view your PRIZM Studio.")}
                                </p>
                            </div>
                            <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt45} ${styles.mtMd5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.confirm}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Create Studio Complete")}</p>
                            </div>
                            <input id={`portfolio`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} onChange={this.props.submit} multiple={true} />
                            <input id={`profile`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} onChange={this.props.submitProfile} />
                        </div>
                        <div className={`${styles.containerAdminStudio} ${styles.mobileNone} ${styles.bgGrayF8} ${styles.minHeightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                            <div className={`${styles.containerMobileCard} ${styles.bgWhite} ${styles.my3} ${styles.overflowYScroll}`} style={{position: 'relative'}}>
                                <div className={`${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2, position: 'relative'}}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} />
                                        </div>
                                        <div className={`${styles.col10} ${styles.px0}`}>
                                            <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font16} ${styles.cursorPointer}`}>{this.context.t("PRIZM")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                                        <p className={`${styles.textCenter} ${styles.font10}`}>{this.context.t("a whole new photography experience")}</p>
                                    </div>
                                </div>
                                <div className={`${styles.containerMobileCard2} ${styles.bgWhite} ${styles.overflowYScroll}`} style={{position: 'relative'}}>
                                <PortfolioSlider portfolio={displayImages} nickname={nickname} lg={false} />
                                <div className={`${styles.px3}`}>
                                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        {profileImage ? (
                                            <ProfileDivLg image={profileImage.image ? profileImage.image : profileImage} />
                                        ) : (
                                            <EmptyProfileDivLg />
                                        )}
                                        <div className={`${styles.ml3}`}>
                                            <p className={`${styles.fontBold} ${styles.font14}`}>{nickname}</p>
                                            <p className={`${styles.font12} ${styles.mt1}`}>{mainLocation}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Career")}</p>
                                        <p className={`${styles.font10}`}>{career}</p>
                                    </div>
                                    {equipment ? (
                                    <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Equipment")}</p>
                                        <p className={`${styles.font10}`}>{equipment}</p>
                                    </div>
                                    ) : (
                                        null
                                    )}
                                    <div className={`${styles.mt3}`}>
                                        <p className={`${styles.font11}`} style={{lineHeight: 1.45}}>
                                                {description}
                                        </p>
                                    </div>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.my3}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Review")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <p className={`${styles.fontBold} ${styles.font11} ${styles.mr1}`}>{4}</p>
                                            <Rating 
                                            initialRating={4} 
                                            emptySymbol={<MdStar fontSize={"15px"} color={"#f4f4f4"} />}
                                            fullSymbol={<MdStar fontSize={"15px"} color={"#fffb64"} />}
                                            fractions={2}
                                            readonly
                                            />
                                            <p className={`${styles.font9} ${styles.ml1}`}>({30})</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                                <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={show1 ? customerSelectedLocation.id ? this.props.close1 : null : this.props.open1}>
                                        <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("1. Select Location")}<span className={`${styles.pink}`}>{`  (${locations ? locations.length : '0'})`}</span></p>
                                        <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show1 ? styles.rotate : null}`} />
                                    </div>
                                    <Collapse isOpened={show1} theme={{collapse: styles.collapse}}>
                                        {locations && locations.length > 0 ? (
                                            <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                                {locations.map((location, index) => (
                                                    <LocationComp key={index} location={location} selectedLocation={customerSelectedLocation} index={index} total={locations.length} blankLocation={this.props.blankCustomerLocation} selectLocation={this.props.selectCustomerLocation} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{this.context.t("There is no available location.")}</p>
                                        )}
                                        {customerSelectedLocation.lat ? (
                                            <div className={`${styles.mt3}`}>
                                                <Map2
                                                isMarkerShown={true}
                                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div style={{height: 170}} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                                lng={customerSelectedLocation.lng}
                                                lat={customerSelectedLocation.lat}
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
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={customerSelectedOption.id ? show3 ?  this.props.close3 : this.props.open3 : null}>
                                        <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("3. Service&Pricing")}</p>
                                        <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show3 ? styles.rotate : null}`}/>
                                    </div>
                                    <Collapse isOpened={show3} theme={{collapse: styles.collapse}}>
                                    <div className={`${styles.my3}`}>
                                        {options && options.length > 0 ? (
                                            options.map((option, index) => (
                                                <div key={index} className={`${styles.py4} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.index === options.length - 1 ? null : styles.mb2} ${styles.cursorPointer} ${customerSelectedOption.id === option.id ? styles.borderPink : styles.borderGrayD9} ${customerSelectedOption.id === option.id ? styles.bgPink : styles.bgWhite}`} onClick={customerSelectedOption.id === option.id ? this.props.blankOption : () => this.props.selectOption(option)}>
                                                    <div>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`${option.title} (${option.person > 1 ? `${option.person} people` : `${option.person} person`}, ${option.hour > 1 ? `${option.hour} hrs` : `${option.hour} hr`})`}</p>
                                                        <p className={`${styles.font10} ${styles.mt2} ${customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{option.description}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`${styles.font14} ${customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`$${numberWithCommas(option.price)}`}</p>
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
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn}`} style={{height: 48}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Submit the request")}</p>
                                    </div>
                                    </Collapse>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.mobileOnly}`}>
                    {!showMobile ? (
                        <div className={`${styles.safearea} ${styles.minHeightFull}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <div className={`${styles.col1} ${styles.px0} ${styles.pl1}`}>
                                    <img src={require('../../assets/images/icon_left.png')} className={`${step === 1 ? styles.hidden : null}`} style={{width: 21*0.6, height: 33*0.6, marginTop:1}} onClick={this._previousSlide} />
                                </div>
                                <div className={`${styles.col10} ${styles.px1}`}>
                                <Progress 
                                percent={(step/4)*100} 
                                status="normal"
                                theme={
                                    {
                                        normal: {
                                        symbol: 'null',
                                        trailColor: 'rgb(243,243,243)',
                                        color: 'rgb(112,112,112)'
                                    }
                                    }
                                }
                                symbolClassName={styles.none}
                                />
                                </div>
                                <div className={`${styles.col1} ${styles.px0} ${styles.pr1}`}>
                                    <img src={require('../../assets/images/icon_left.png')} className={`${styles.hidden}`} style={{width: 21*0.6, height: 33*0.6, marginTop:1}} />
                                </div>
                            </div>
                            <p className={`${styles.textCenter} ${styles.font12} ${styles.description}`}>
                                {this.context.t("A preview of the studio is available through the icon of the upper right.")}
                            </p>
                            <Slider ref={c => (this.slider = c)} 
                            {...sliderSettings}
                            initialSlide={step-1}
                            >
                                <div className={`${styles.py3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Profile Picture")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${profileImage ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please upload a profile picture.")}</p>
                                    <div className={`${styles.mt3}`}>
                                        <label htmlFor={'profile'}>
                                            {profileImage ? (
                                                <ProfileDivLg image={profileImage.image ? profileImage.image : profileImage} />
                                            ) : (
                                                <div className={`${styles.containerStudioProfile} ${styles.bgGray16} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                                    <p className={`${styles.font40} ${styles.white}`}>+</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Name")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${nickname ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please enter your (studio) name.")}</p>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <input className={`${styles.textInput6}`} type={"text"} name={"nickname"} value={nickname} maxLength={30} onChange={this.props.handleInputChange} />
                                    </div>
                                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Your Portfolio")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${images && images.length > 0 ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please upload sample images to be shown at the top of your PRIZM studio.")}<br/>{this.context.t("If you want to remove an uploaded image, double click the image.")}</p>
                                    <div className={`${styles.containerAdminPortfolio} ${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.mt3} ${styles.flexNowrap} ${styles.overflowXScroll}`}>
                                        {images && images.length > 0 ? (
                                            <Fragment>
                                                <label htmlFor={'portfolio'}>
                                                    <div className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray16} ${styles.mr3}`}>
                                                        <p className={`${styles.font40} ${styles.white}`}>+</p>
                                                    </div>
                                                </label>
                                                <DragSortableList className={`${styles.overflowXScroll}`} items={dragableImages} moveTransitionDuration={0.3} type={'horizontal'} onSort={this.props.onSort} />
                                                {/* {images.map((image, index) => (
                                                    <img key={index} src={image.image} alt={`portfolio-${index+1}`} className={`${styles.containerAdminPortfolioInner} ${styles.mr3} ${styles.cursorPointer}`} onClick={() => this.props.removeImage(index)}/>
                                                ))} */}
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <label htmlFor={'portfolio'}>
                                                    <div className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray16} ${styles.mr3}`}>
                                                        <p className={`${styles.font40} ${styles.white}`}>+</p>
                                                    </div>
                                                </label>
                                                {opacityList.map((opacity, index) => (
                                                    <div key={index} className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray16} ${styles.mr3}`} style={{opacity: opacity}}>
                                                    </div>
                                                ))}
                                            </Fragment>
                                        )}
                                    </div>
                                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Main Photography Location")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${mainLocation ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please type in your main photography (business) location.")}</p>
                                    <div className={`${styles.containerStudioInput} ${styles.textInput6} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.p0} ${styles.justifyContentBetween}`} style={{position: 'relative'}} onClick={this.props.handleCityList}>
                                        <input className={`${styles.mainLocationInput}`} readOnly={true} type={"text"} name={"mainLocation"} value={mainLocation} />
                                        <MdArrowDropdown fontSize="13px" color="#000000" />
                                        {showCityList && (
                                            <div style={{position: 'absolute', top: 38, maxHeight: 150}} className={`${styles.bgWhite} ${styles.widthFull} ${styles.py2} ${styles.overflowYScroll}`}>
                                                {CITY_LIST.map(city => (
                                                    <p key={city.value} className={`${styles.font1113} ${styles.cursorPointer} ${styles.py2}`} onClick={() => this.props.selectCity(city.label)}>
                                                        {city.label}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                    </div>
                                </div>
                                <div className={`${styles.py3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Career (Optional)")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${career ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please type in your career information.")}</p>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <input className={`${styles.textInput6}`} type={"text"} name={"career"} value={career} onChange={this.props.handleInputChange} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font911}`}>{this.context.t("ex) your work experiences, exhibitions, awards, etc")}</p>
                                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Equipment (Optional)")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${equipment ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please type in your equipment.")}</p>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <input className={`${styles.textInput6}`} type={"text"} name={"equipment"} value={equipment} onChange={this.props.handleInputChange} maxLength={30} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font911}`}>{this.context.t("ex) Sony A7 II, Canon EOS 5 D Mark IV, EF 50mm F12 USM")}</p>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                    </div>
                                </div>
                                <div className={`${styles.py3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Description")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${description ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Please briefly introduce yourself.")}</p>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <textarea placeholder={this.context.t("Introduce yourself to potential PRIZM clients here.")} className={`${styles.textArea4} ${styles.mt3} ${styles.py3} ${styles.px2}`} value={description} name={"description"} onChange={this.props.handleInputChange} />
                                    </div>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                    </div>
                                </div>
                                <div className={`${styles.py3}`}>
                                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Select Photography Spots")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${locations && locations.length > 0 ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>
                                        {this.context.t("Detailed location where you would like to meet tourists")}<br/>
                                        {this.context.t("Search on the map to add your first photography spot")}
                                    </p>
                                    <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={this.props.openLocationModal}>
                                        <p className={`${styles.font3240} ${styles.white}`}>{`+`}</p>
                                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Add a new location")}</p>
                                        <p className={`${styles.font3240} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                                    </div>
                                    {locations && locations.length > 0 && (
                                        <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                                            {locations.map((location, index) => (
                                                <div key={index} className={`${styles.col12} ${styles.colMd4} ${styles.px0}`}>
                                                    <div className={`${styles.col12} ${styles.colMd10} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2} ${styles.bgPink} ${styles.px2} ${styles.py2} ${styles.containerLocationBox}`}>
                                                        <div className={`${styles.col10} ${styles.px0}`}>
                                                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.white}`}>{this.context.t(`Location ${index + 1}`)}</p>
                                                            <p className={`${styles.fontBold} ${styles.font1113} ${styles.white} ${styles.mt1}`}>{location.name}</p>
                                                        </div>
                                                        <div className={`${styles.cursorPointer} ${styles.col2} ${styles.px0} ${styles.textRight}`} onClick={() => this.props.removeLocation(location)}>
                                                            <MdClose fontSize={'24px'} color={'#ffffff'}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Service and Pricing")}</p>
                                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${options && options.length > 0 ? null : styles.hidden}`} />
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{this.context.t("Click the button below to create a new service & pricing option.")}</p>
                                    <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={this.props.openOptionModal}>
                                        <p className={`${styles.font3240} ${styles.white}`}>{`+`}</p>
                                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Create a new option")}</p>
                                        <p className={`${styles.font3240} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                                    </div>
                                    {options && options.length > 0 && (
                                        <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                                            {options.map((option, index) => (
                                                <div key={index} className={`${styles.containerStudioInput}`}>
                                                    <div className={`${styles.px3} ${styles.py3} ${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2}`} style={{opacity: 0.8}}>
                                                        <div>
                                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t(`${option.title}`)}</p>
                                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.white} ${styles.mt1}`}>{this.context.t(`${option.photograpy_type} / ${numberWithCommas(option.person)} person(s) ${numberWithCommas(option.hour)} hour(s) $${numberWithCommas(option.price)}`)}</p>
                                                        </div>
                                                        <div className={`${styles.cursorPointer}`} onClick={() => this.props.removeOption(option)}>
                                                            <MdClose fontSize={'24px'} color={'#ffffff'}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{this.context.t("Your PRIZM Studio URL")}</p>
                                    </div>
                                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>
                                        {this.context.t("Please type in a desired URL for your PRIZM studio. ")}
                                        <span className={`${studioIdError ? styles.alert : null}`}>
                                            {this.context.t("(only english)")}
                                        </span>
                                    </p>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <InputMask mask={'prizm.cloud/********************'} 
                                        formatChars={{
                                            '*': '[ㄱ-힣A-Za-z0-9!@#$()-_+=.,]'
                                        }}
                                        maskChar={''} alwaysShowMask={true} value={studioId} onChange={this.props.handleStudioIdChange}>
                                            {(inputProps) => <input {...inputProps} type={"text"} name={"studioId"} className={`${styles.textInput6}`} />}
                                        </InputMask>
                                    </div>
                                    <div className={`${styles.mobileOnly} ${styles.mt45}`}>
                                        <p className={`${styles.fontBold} ${styles.font1214}`}>
                                            {this.context.t("Make sure to double check that all the information is correct. Click on the smartphone icon at the top right corner to view your PRIZM Studio.")}
                                        </p>
                                    </div>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.confirm}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Create Studio Complete")}</p>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    ) : (
                        <div className={`${styles.mobileOnly} ${styles.widthFull} ${styles.minHeightFull}`} style={{display: 'block'}}>
                            <div className={`${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2, position: 'fixed', top: 0, left: 0, right: 0}}>
                                <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                    <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} />
                                    </div>
                                    <div className={`${styles.col10} ${styles.px0}`}>
                                        <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font16} ${styles.cursorPointer}`}>{this.context.t("PRIZM")}</p>
                                    </div>
                                    <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                        <MdClose onClick={this.props.closeMobile} fontSize="20px" color="#000000" />
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                                    <p className={`${styles.textCenter} ${styles.font10}`}>{this.context.t("a whole new photography experience")}</p>
                                </div>
                            </div>
                            <div style={{marginTop: 72}}>
                                <PortfolioSlider portfolio={displayImages} nickname={nickname} lg={false} />
                            </div>
                            <div className={`${styles.px3}`}>
                                <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                    {profileImage ? (
                                        <ProfileDivLg image={profileImage.image ? profileImage.image : profileImage} />
                                    ) : (
                                        <EmptyProfileDivLg />
                                    )}
                                    <div className={`${styles.ml3}`}>
                                        <p className={`${styles.fontBold} ${styles.font14}`}>{nickname}</p>
                                        <p className={`${styles.font12} ${styles.mt1}`}>{mainLocation}</p>
                                    </div>
                                </div>
                                <div className={`${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                    <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Career")}</p>
                                    <p className={`${styles.font10}`}>{career}</p>
                                </div>
                                {equipment ? (
                                    <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Equipment")}</p>
                                        <p className={`${styles.font10}`}>{equipment}</p>
                                    </div>
                                ) : (
                                    null
                                )}
                                <div className={`${styles.mt3}`}>
                                    <p className={`${styles.font11}`} style={{lineHeight: 1.45}}>
                                            {description}
                                    </p>
                                </div>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.my3}`}>
                                    <p className={`${styles.fontBold} ${styles.font12}`}>{this.context.t("Review")}</p>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font11} ${styles.mr1}`}>{4}</p>
                                        <Rating 
                                        initialRating={4} 
                                        emptySymbol={<MdStar fontSize={"15px"} color={"#f4f4f4"} />}
                                        fullSymbol={<MdStar fontSize={"15px"} color={"#fffb64"} />}
                                        fractions={2}
                                        readonly
                                        />
                                        <p className={`${styles.font9} ${styles.ml1}`}>({30})</p>
                                        <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                            <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={show1 ? customerSelectedLocation.id ? this.props.close1 : null : this.props.open1}>
                                    <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("1. Select Location")}<span className={`${styles.pink}`}>{`  (${locations.length})`}</span></p>
                                    <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show1 ? styles.rotate : null}`} />
                                </div>
                                <Collapse isOpened={show1} theme={{collapse: styles.collapse}}>
                                    {locations && locations.length > 0 ? (
                                        <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                            {locations.map((location, index) => (
                                                <LocationComp key={index} location={location} selectedLocation={customerSelectedLocation} index={index} total={locations.length} blankLocation={this.props.blankCustomerLocation} selectLocation={this.props.selectCustomerLocation} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{this.context.t("There is no available location.")}</p>
                                    )}
                                    {customerSelectedLocation.lat ? (
                                        <div className={`${styles.mt3}`}>
                                            <Map2
                                            isMarkerShown={true}
                                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{height: 170}} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            lng={customerSelectedLocation.lng}
                                            lat={customerSelectedLocation.lat}
                                            />
                                        </div>
                                    ) : null}
                                </Collapse>
                            </div>
                            <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                            <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={(dateConfirm) ? show2 ? this.props.close2 : this.props.open2 : null}>
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
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={customerSelectedOption.id ? show3 ?  this.props.close3 : this.props.open3 : null}>
                                    <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("3. Service&Pricing")}</p>
                                    <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${show3 ? styles.rotate : null}`}/>
                                </div>
                                <Collapse isOpened={show3} theme={{collapse: styles.collapse}}>
                                <div className={`${styles.my3}`}>
                                    {options && options.length > 0 ? (
                                        options.map((option, index) => (
                                            <div key={index} className={`${styles.py4} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.index === options.length - 1 ? null : styles.mb2} ${styles.cursorPointer} ${customerSelectedOption.id === option.id ? styles.borderPink : styles.borderGrayD9} ${customerSelectedOption.id === option.id ? styles.bgPink : styles.bgWhite}`} onClick={customerSelectedOption.id === option.id ? this.props.blankOption : () => this.props.selectOption(option)}>
                                                <div>
                                                    <p className={`${styles.fontBold} ${styles.font14} ${customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`${option.title} (${option.person > 1 ? `${option.person} people` : `${option.person} person`}, ${option.hour > 1 ? `${option.hour} hrs` : `${option.hour} hr`})`}</p>
                                                    <p className={`${styles.font10} ${styles.mt2} ${customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{option.description}</p>
                                                </div>
                                                <div>
                                                    <p className={`${styles.font14} ${customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`$${numberWithCommas(option.price)}`}</p>
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
                                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn}`} style={{height: 48}}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Submit the request")}</p>
                                </div>
                                </Collapse>
                            </div>
                        </div>
                    )}
                </div>
                {isSubmitting && (
                    <MyLoader />
                )}
                <Modal
                isOpen={showLocationModal}
                onRequestClose={this.props.closeLocationModal}
                style={customStyles}
                >
                    <div className={`${styles.widthFull} ${styles.heightFull} ${styles.bgWhite}`} style={{zIndex: 10}}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.px3} ${styles.py4} ${styles.bgWhite}`}>
                            <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                                <img src={require('../../assets/images/icon_left.png')} alt={this.context.t("go back")} className={`${styles.iconArrowRightLg} ${styles.cursorPointer}`} onClick={this.props.closeLocationModal} />
                            </div>
                            <div className={`${styles.col8} ${styles.coLSm10} ${styles.px0}`}>
                                <p className={`${styles.fontBold} ${styles.font16} ${styles.textCenter}`}>{this.context.t("Search Location")}</p>
                            </div>
                            <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0} ${styles.cursorPointer}`} onClick={this.props.completeLocationSearch}>
                                <p className={`${styles.fontBold} ${styles.font13} ${styles.textRight}`}>{this.context.t("Completed")}</p>
                            </div>
                        </div>
                        {locations && locations.length > 0 && (
                            <div className={`${styles.mt2} ${styles.row} ${styles.mx0}`}>
                                {locations.map((location, index) => (
                                    <div key={index} className={`${styles.col6} ${styles.colMd4}`}>
                                        <div className={`${styles.col12} ${styles.colMd10} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2} ${styles.bgPink} ${styles.px2} ${styles.py2} ${styles.containerLocationBox}`}>
                                            <div className={`${styles.col10} ${styles.px0}`}>
                                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.white}`}>{this.context.t(`Location ${index + 1}`)}</p>
                                                <p className={`${styles.fontBold} ${styles.font1113} ${styles.white} ${styles.mt1}`}>{location.name}</p>
                                            </div>
                                            <div className={`${styles.cursorPointer} ${styles.col2} ${styles.px0} ${styles.textRight}`} onClick={() => this.props.removeLocation(location)}>
                                                <MdClose fontSize={'24px'} color={'#ffffff'}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={`${styles.px3} ${styles.py2} ${styles.bgGray5c}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                <PlacesWithStandaloneSearchBox searchLocation={this.props.searchLocation} />
                            </div>
                        </div>
                        <Map
                        isMarkerShown={locationSearched}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div className={`${styles.widthFull} ${styles.heightFullPercent}`} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        searchedLocations={searchedLocations}
                        locations={locations}
                        lng={locationSearched ? 126.9748523 : 126.9748523}
                        lat={locationSearched ? 37.5796212 : 37.5796212}
                        selectedLocation={selectedLocation}
                        selectLocation={this.props.selectLocation}
                        />
                        {searchedLocations.length > 0 ? (
                            <div className={`${styles.widthFull}`} style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
                                {((searchedLocations.length > 0) && (locations.length === 0)) && (
                                    <div className={`${styles.row} ${styles.mx0} ${styles.justifyContentEnd} ${styles.pxBubble}`} style={{position: 'absolute', right: 0, top: -20}}>
                                        <div className={`${styles.px3} ${styles.py2}`} style={{backgroundColor: '#969696', borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomLeftRadius: 5}}>
                                            <p className={`${styles.font10} ${styles.white}`}>
                                                {this.context.t("You can add a location by pressing the button.")}
                                            </p>
                                        </div>
                                        <div className={`${styles.col12} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.justifyContentEnd}`}>
                                            <div className={`${styles.bubbleBottom}`} />
                                        </div>
                                    </div>
                                )}
                                <div className={`${styles.bgWhite} ${styles.widthFull} ${styles.overflowYScroll}`} style={{maxHeight: 171}}>
                                    {searchedLocations.map((location, index) => {
                                        const find = locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
                                        return(
                                            <div key={index} className={`${index === searchedLocations.length - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} onClick={() => this.props.selectLocation(location)}>
                                                <div className={`${styles.col10} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.col1} ${styles.px0}`}>
                                                        <p className={`${styles.fontBold} ${styles.font12} ${find ? styles.pink : null}`}>{index + 1}</p>
                                                    </div>
                                                    <div className={`${styles.col11} ${styles.px0}`}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.ml2} ${find ? styles.pink : null}`}>{location.name}</p>
                                                    </div>
                                                </div>
                                                <div className={`${styles.col2} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                                    <div className={`${styles.circle24} ${find ? styles.bgPink : styles.bgGray5c} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                                        {find ? (
                                                            <MdClose fontSize="15px" color="#ffffff" />
                                                        ) : (
                                                            <MdAdd fontSize="15px" color="#ffffff" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                        <Rodal 
                        width={230}
                        height={46}
                        visible={showLocationAdded}
                        showCloseButton={false}
                        customStyles={{
                            backgroundColor: '#d66c8b',
                            padding: 0
                        }}
                        >
                            <p className={`${styles.font12} ${styles.textCenter} ${styles.white} ${styles.py3}`}>
                                {this.context.t("Locaion Added")}
                            </p>
                        </Rodal>
                    </div>
                </Modal>
                <Modal
                isOpen={showOptionModal}
                onRequestClose={this.props.closeOptionModal}
                style={customStyles}
                >
                    <div className={`${styles.widthFull} ${styles.heightFull} ${styles.bgWhite}`} style={{zIndex: 10}}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.px3} ${styles.py4} ${styles.bgWhite}`}>
                            <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                                <img src={require('../../assets/images/icon_left.png')} alt={this.context.t("go back")} className={`${styles.iconArrowRightLg} ${styles.cursorPointer}`} onClick={this.props.closeOptionModal} />
                            </div>
                            <div className={`${styles.col8} ${styles.coLSm10} ${styles.px0}`}>
                                <p className={`${styles.fontBold} ${styles.font16} ${styles.textCenter}`}>{this.context.t("Create a new option")}</p>
                            </div>
                            <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                            
                            </div>
                        </div>
                        <div className={`${styles.px3}`}>
                            <p className={`${styles.mt3} ${styles.fontBold} ${styles.font20}`}>{this.context.t(`Option ${options ? options.length + 1 : '0'}`)}</p>
                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Title")}</p>
                            </div>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"optionTitle"} value={optionTitle} onChange={this.props.handleInputChange} placeholder={this.context.t("ex) Romantic Wedding, Couple in Seoul")} />
                            </div>
                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Photography Type")}</p>
                            </div>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"optionType"} value={optionType} onChange={this.props.handleInputChange} placeholder={this.context.t("ex) Wedding, Couple, Single, Group")} />
                            </div>
                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Option Description")}</p>
                            </div>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"optionDescription"} value={optionDescription} onChange={this.props.handleInputChange} placeholder={this.context.t("ex) Please describe this service option here.")} />
                            </div>
                            <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <div className={`${styles.col4} ${styles.px0} ${styles.row} ${styles.mx0}`}>
                                    <div className={`${styles.col11} ${styles.px0}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Person(s)")}</p>
                                        <div className={`${styles.containerStudioInput}`}>
                                            <input className={`${styles.textInput6}`} type={"text"} name={"optionPerson"} value={optionPerson} onChange={this.props.handleInputChange} maxLength={2} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.col4} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.justifyContentCenter}`}>
                                    <div className={`${styles.col11} ${styles.px0}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Hour(s)")}</p>
                                        <div className={`${styles.containerStudioInput}`}>
                                            <input className={`${styles.textInput6}`} type={"text"} name={"optionHour"} value={optionHour} onChange={this.props.handleInputChange} maxLength={2} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.col4} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.justifyContentEnd}`}>
                                    <div className={`${styles.col11} ${styles.px0}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{this.context.t("Price (USD, $)")}</p>
                                        <div className={`${styles.containerStudioInput}`}>
                                            <input className={`${styles.textInput6}`} type={"text"} name={"optionPrice"} value={optionPrice} onChange={this.props.handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.containerStudioInput} ${styles.bgGray16} ${styles.mt45} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.completeAddOption}>
                                <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{this.context.t("Save")}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
                <RModal
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
                                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this.props.changeDateStep(2)}>
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
                                            <Picker
                                            optionGroups={optionGroups}
                                            valueGroups={valueGroups}
                                            onChange={this.props.handleChangeTimes} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.confirmDate}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Done")}</p>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </RModal>
                <RModal
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
                            <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.confirmDate}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Done")}</p>
                            </div>
                        </Fragment>
                    </div>
                </RModal>
            </div>
        )
    }
}

export default AdminSignUp;

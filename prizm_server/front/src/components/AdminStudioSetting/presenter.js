import React, { Fragment } from 'react';
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

import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { Collapse } from 'react-collapse';
import LocationComp from '../LocationComp';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import Calendar from 'react-calendar';
import RModal from 'react-responsive-modal';

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

const AdminSignUp = (props, context) => (
    <div className={`${styles.containerAdmin} ${props.showMobile ? null : styles.pxAdmin2}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.widthFull}`}>
            {!props.showMobile ? (
                <div className={`${styles.safearea} ${styles.containerAdminStudioSide} ${styles.heightFull} ${styles.overflowYScroll}`}>
                    <p className={`${styles.mtStudio} ${styles.fontBold} ${styles.font2024}`}>{context.t("My Studio Setup")}</p>
                    <p className={`${styles.mt1} ${styles.mtMd2} ${styles.font1416}`}>{context.t("Please fill out information below to create your first ")}<span className={`${styles.fontBold}`}>{'PRIZM'}</span>{context.t(" Studio")}</p>
                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Your Portfolio")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.images && props.images.length > 0 ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("화면 상단에 게시될 대표적인 사진들을 첨부해주세요.")}</p>
                    <div className={`${styles.containerAdminPortfolio} ${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.mt3} ${styles.flexNowrap} ${styles.overflowXScroll}`}>
                        {props.images && props.images.length > 0 ? (
                            <Fragment>
                                <label htmlFor={'portfolio'}>
                                    <div className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray33} ${styles.mr3}`}>
                                        <p className={`${styles.font40} ${styles.white}`}>+</p>
                                    </div>
                                </label>
                                {props.images.map((image, index) => (
                                    <img key={index} src={image.image} alt={`portfolio-${index+1}`} className={`${styles.containerAdminPortfolioInner} ${styles.mr3} ${styles.cursorPointer}`} onClick={() => props.removeImage(index)}/>
                                ))}
                            </Fragment>
                        ) : (
                            <Fragment>
                                <label htmlFor={'portfolio'}>
                                    <div className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray33} ${styles.mr3}`}>
                                        <p className={`${styles.font40} ${styles.white}`}>+</p>
                                    </div>
                                </label>
                                {props.opacityList.map((opacity, index) => (
                                    <div key={index} className={`${styles.containerAdminPortfolioInner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgGray33} ${styles.mr3}`} style={{opacity: opacity}}>
                                    </div>
                                ))}
                            </Fragment>
                        )}
                    </div>
                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Profile Picture")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.profileImage.image ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("프로필 사진으로 사용할 이미지 1장을 첨부해주세요.")}</p>
                    <div className={`${styles.mt3}`}>
                        <label htmlFor={'profile'}>
                            {props.profileImage.image ? (
                                <ProfileDivLg image={props.profileImage.image} />
                            ) : (
                                <div className={`${styles.containerStudioProfile} ${styles.bgGray33} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    <p className={`${styles.font40} ${styles.white}`}>+</p>
                                </div>
                            )}
                        </label>
                    </div>
                    <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Name")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.nickname ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("작가소개 화면에 표기될 이름을 입력해주세요.")}</p>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"nickname"} value={props.nickname} onChange={props.handleInputChange} />
                    </div>
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Location")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.mainLocation ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("현재 어느지역에서 사진활동을 하고 있는지 기재해주세요.")}</p>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"mainLocation"} value={props.mainLocation} onChange={props.handleInputChange} />
                    </div>
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Education")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.education ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("최종 학력을 기재해주세요.")}</p>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"education"} value={props.education} onChange={props.handleInputChange} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font911}`}>{context.t("ex) Hannam High School, College of Havana, Nakseong University")}</p>
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Career")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.career ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("대표적인 커리어를 입력해주세요.")}</p>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"career"} value={props.career} onChange={props.handleInputChange} />
                    </div>
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Portfolio")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.portfolio ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("포트폴리오 사이트가 있다면 입력해주세요.")}</p>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"portfolio"} value={props.portfolio} onChange={props.handleInputChange} />
                    </div>
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Description")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.description ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("자신을 표현해주세요.")}</p>
                    <div className={`${styles.containerStudioInput}`}>
                        <textarea className={`${styles.textArea2} ${styles.mt3} ${styles.py3} ${styles.px2}`} value={props.description} name={"description"} onChange={props.handleInputChange} />
                    </div>
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Select Location")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.locations && props.locations.length > 0 ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>
                        {context.t("Detailed location where you would like to meet tourists")}<br/>
                        {context.t("Search on the map to add your first location")}
                    </p>
                    <div className={`${styles.mobileOnly} ${styles.mt3}`}>
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={props.openLocationModal}>
                            <p className={`${styles.font32} ${styles.white}`}>{`+`}</p>
                            <p className={`${styles.fontBold} ${styles.font12} ${styles.white}`}>{context.t("Add to location")}</p>
                            <p className={`${styles.font32} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                        </div>
                    </div>
                    <div className={`${styles.mobileNone} ${styles.mt3}`}>
                        <div className={`${styles.width90} ${styles.containerGooglemap} ${styles.row} ${styles.mx0}`}>
                            <div className={`${styles.containerGooglemapSearch}`}>
                                <div className={`${styles.px2} ${styles.bgGray5c} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} style={{height: 70}}>
                                    <div className={`${styles.col12} ${styles.px0}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.white} ${styles.mb1}`}>{context.t("Search location")}</p>
                                        <PlacesWithStandaloneSearchBox searchLocation={props.searchLocation} />
                                    </div>
                                </div>
                                {props.searchedLocations.length > 0 ? (
                                <div className={`${styles.bgWhite} ${styles.widthFull} ${styles.containerSearchedLocationPc}`}>
                                    {props.searchedLocations.map((location, index) => {
                                        const find = props.locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
                                        return(
                                            <div key={index} className={`${index === props.searchedLocations.length - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} onClick={() => props.selectLocation(location)}>
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
                                isMarkerShown={props.locationSearched}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div className={`${styles.widthFull} ${styles.heightFullPercent}`} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                searchedLocations={props.searchedLocations}
                                locations={props.locations}
                                lng={props.locationSearched ? 126.9748523 : 126.9748523}
                                lat={props.locationSearched ? 37.5796212 : 37.5796212}
                                selectedLocation={props.selectedLocation}
                                selectLocation={props.selectLocation}
                                />
                            </div>
                        </div>
                    </div>
                    {props.locations && props.locations.length > 0 && (
                        <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                            {props.locations.map((location, index) => (
                                <div key={index} className={`${styles.col12} ${styles.colMd4} ${styles.px0}`}>
                                    <div className={`${styles.col12} ${styles.colMd10} ${styles.px0} ${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2} ${styles.bgPink} ${styles.px2} ${styles.py2} ${styles.containerLocationBox}`}>
                                        <div>
                                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.white}`}>{context.t(`Location ${index + 1}`)}</p>
                                            <p className={`${styles.fontBold} ${styles.font1113} ${styles.white} ${styles.mt1}`}>{location.name}</p>
                                        </div>
                                        <div className={`${styles.cursorPointer}`} onClick={() => props.removeLocation(location)}>
                                            <MdClose fontSize={'24px'} color={'#ffffff'}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={`${styles.mt45} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr2}`}>{context.t("Service and Pricing")}</p>
                        <MdCheckmark fontSize="20px" color="#3cd59e" className={`${props.options && props.options.length > 0 ? null : styles.hidden}`} />
                    </div>
                    <p className={`${styles.mt1} ${styles.font1012}`} style={{lineHeight: 1.9}}>{context.t("작가 페이지에 등록하고자 하는 사진 서비스에 대한 정보 입력")}</p>
                    <div className={`${styles.mobileOnly} ${styles.mt3}`}>
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={props.openOptionModal}>
                            <p className={`${styles.font3240} ${styles.white}`}>{`+`}</p>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{context.t("Add to option")}</p>
                            <p className={`${styles.font3240} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                        </div>
                    </div>
                    <div className={`${styles.mobileNone} ${styles.mt3}`}>
                        {props.showOptionPlus && (
                            <Fragment>
                                <p className={`${styles.mt3} ${styles.fontBold} ${styles.font1113}`}>{context.t(`Option ${props.options.length + 1}`)}</p>
                                <div className={`${styles.borderGray97} ${styles.mt2} ${styles.px2} ${styles.py3} ${styles.containerStudioInput}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Title")}</p>
                                    </div>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <input className={`${styles.textInput6}`} type={"text"} name={"optionTitle"} value={props.optionTitle} onChange={props.handleInputChange} placeholder={context.t("ex) National Geographic Photographer, ABC Photographer")} />
                                    </div>
                                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Photography Type")}</p>
                                    </div>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <input className={`${styles.textInput6}`} type={"text"} name={"optionType"} value={props.optionType} onChange={props.handleInputChange} placeholder={context.t("ex) Wedding, Couple, Single, Group")} />
                                    </div>
                                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Description")}</p>
                                    </div>
                                    <div className={`${styles.containerStudioInput}`}>
                                        <input className={`${styles.textInput6}`} type={"text"} name={"optionDescription"} value={props.optionDescription} onChange={props.handleInputChange} placeholder={context.t("ex) BlahBlahBlah")} />
                                    </div>
                                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <div className={`${styles.col3} ${styles.px0}`}>
                                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Person(s)")}</p>
                                            <div className={`${styles.containerStudioInput}`}>
                                                <input className={`${styles.textInput6}`} type={"text"} name={"optionPerson"} value={props.optionPerson} onChange={props.handleInputChange} maxLength={2} />
                                            </div>
                                        </div>
                                        <div className={`${styles.col3} ${styles.px0}`}>
                                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Hour(s)")}</p>
                                            <div className={`${styles.containerStudioInput}`}>
                                                <input className={`${styles.textInput6}`} type={"text"} name={"optionHour"} value={props.optionHour} onChange={props.handleInputChange} maxLength={2} />
                                            </div>
                                        </div>
                                        <div className={`${styles.col3} ${styles.px0}`}>
                                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Price")}</p>
                                            <div className={`${styles.containerStudioInput}`}>
                                                <input className={`${styles.textInput6}`} type={"text"} name={"optionPrice"} value={props.optionPrice} onChange={props.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className={`${styles.containerStudioInput} ${styles.bgGray33} ${styles.mt45} ${styles.mtMd3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.completeAddOption}>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{context.t("Save")}</p>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        <div className={`${styles.containerStudioInput} ${styles.bgGray33} ${styles.mt3} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn}`} style={{height: 48}} onClick={props.showOptionPlus ? props.closeOptionPlus : props.openOptionPlus}>
                            <p className={`${styles.font3240} ${styles.white}`}>{`+`}</p>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{context.t("Add to option")}</p>
                            <p className={`${styles.font3240} ${styles.white} ${styles.hidden}`}>{`+`}</p>
                        </div>
                    </div>
                    {props.options && props.options.length > 0 && (
                        <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                            {props.options.map((option, index) => (
                                <div key={index} className={`${styles.containerStudioInput}`}>
                                    <div className={`${styles.px3} ${styles.py3} ${styles.borderGray97} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb2} ${styles.bgWhite}`}>
                                        <div>
                                            <p className={`${styles.fontBold} ${styles.font1214}`}>{context.t(`${option.title}`)}</p>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.mt1}`}>{context.t(`${option.photograpy_type} / ${numberWithCommas(option.person)} person(s) ${numberWithCommas(option.hour)} hour(s) $${numberWithCommas(option.price)}`)}</p>
                                        </div>
                                        <div className={`${styles.cursorPointer}`} onClick={() => props.removeOption(option)}>
                                            <MdClose fontSize={'24px'} color={'#d66c8b'}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <input id={`portfolio`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} onChange={props.submit} />
                    <input id={`profile`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} onChange={props.submitProfile} />
                </div>
            ) : (
                <div className={`${styles.mobileOnly} ${styles.widthFull} ${styles.minHeightFull}`} style={{display: 'block'}}>
                    <div className={`${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2, position: 'fixed', top: 0, left: 0, right: 0}}>
                        <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <img src={require('../../assets/images/icon_menu.png')} alt={context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} />
                            </div>
                            <div className={`${styles.col10} ${styles.px0}`}>
                                <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font16} ${styles.cursorPointer}`}>{context.t("PRIZM")}</p>
                            </div>
                            <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                <MdClose onClick={props.closeMobile} fontSize="20px" color="#000000" />
                            </div>
                        </div>
                        <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                            <p className={`${styles.textCenter} ${styles.font10}`}>{context.t("a whole new photography experience")}</p>
                        </div>
                    </div>
                    <div style={{marginTop: 72}}>
                        <PortfolioSlider portfolio={props.images} nickname={props.nickname} lg={false} />
                    </div>
                    <div className={`${styles.px3}`}>
                        <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            {props.profileImage.image ? (
                                <ProfileDivLg image={props.profileImage.image} />
                            ) : (
                                <EmptyProfileDivLg />
                            )}
                            <div className={`${styles.ml3}`}>
                                <p className={`${styles.fontBold} ${styles.font14}`}>{props.nickname}</p>
                                <p className={`${styles.font12} ${styles.mt1}`}>{props.mainLocation}</p>
                            </div>
                        </div>
                        <div className={`${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Education")}</p>
                            <p className={`${styles.font10}`}>{props.education}</p>
                        </div>
                        <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Career")}</p>
                            <p className={`${styles.font10}`}>{props.career}</p>
                        </div>
                        {props.portfolio ? (
                            <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Portfolio")}</p>
                                <a href={props.portfolio} target={'_blank'} className={`${styles.font10} ${styles.black}`} style={{textDecoration: 'none'}}>{props.portfolio}</a>
                            </div>
                        ) : (
                            null
                        )}
                        <div className={`${styles.mt3}`}>
                            <p className={`${styles.font11}`} style={{lineHeight: 1.45}}>
                                <Truncate lines={props.isTruncated ? 4 : null} ellipsis={<span>...</span>}>
                                    {props.description}
                                </Truncate>
                            </p>
                            <p className={`${styles.fontBold} ${styles.font13} ${styles.green} ${styles.mt2} ${styles.cursorPointer}`} onClick={props.isTruncated ? props.undoTruncate : props.doTruncate}>{props.isTruncated ? context.t("More ...") : context.t("Abbr")}</p>
                        </div>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.my3}`}>
                            <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Review")}</p>
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
                                <img src={require('../../assets/images/icon_arrow_right.png')} alt={context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={props.show1 ? props.customerSelectedLocation.id ? props.close1 : null : props.open1}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("1. Select Location")}<span className={`${styles.pink}`}>{`  (${props.locations.length})`}</span></p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show1 ? styles.rotate : null}`} />
                        </div>
                        <Collapse isOpened={props.show1} theme={{collapse: styles.collapse}}>
                            {props.locations && props.locations.length > 0 ? (
                                <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                    {props.locations.map((location, index) => (
                                        <LocationComp key={index} location={location} selectedLocation={props.customerSelectedLocation} index={index} total={props.locations.length} blankLocation={props.blankCustomerLocation} selectLocation={props.selectCustomerLocation} />
                                    ))}
                                </div>
                            ) : (
                                <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{context.t("선택가능한 지역이 없습니다.")}</p>
                            )}
                            {props.customerSelectedLocation.lat ? (
                                <div className={`${styles.mt3}`}>
                                    <Map2
                                    isMarkerShown={true}
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{height: 170}} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    lng={props.customerSelectedLocation.lng}
                                    lat={props.customerSelectedLocation.lat}
                                    />
                                </div>
                            ) : null}
                        </Collapse>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={(props.dateConfirm ) ? props.show2 ? props.close2 : props.open2 : null}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("2. Date&Time")}</p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show2 ? styles.rotate : null}`}/>
                        </div>
                        <Collapse isOpened={props.show2} theme={{collapse: styles.collapse}}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={props.dateOption === 1 ? props.blankDateOption : () => props.handleChangeDateOption(1)}>
                            <div className={`${styles.checkBox} ${props.dateOption !== 1 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                {props.dateOption === 1 && (
                                    <img src={require('../../assets/images/icon_check.png')} alt={context.t("I have a specific date in mind")} className={`${styles.iconCheck}`} />
                                )}
                            </div>
                            <div className={`${styles.checkBoxText}`}>
                                <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{context.t("I have a specific date in mind")}</p>
                            </div>
                        </div>
                        {props.dateConfirm && (props.dateOption === 1) && (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => props.openCalendar1(1)}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedDate.getFullYear()}/${String(props.selectedDate.getMonth() + 1).length === 2 ? (props.selectedDate.getMonth() + 1) : '0'.concat(String(props.selectedDate.getMonth() + 1))}/${props.selectedDate.getDate()}`}</p>
                                </div>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => props.openCalendar1()}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedHour}:${props.selectedMin}`}</p>
                                </div>
                            </div>
                        )}
                        <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={props.dateOption === 2 ? props.blankDateOption : () => props.handleChangeDateOption(2)}>
                            <div className={`${styles.checkBox} ${props.dateOption !== 2 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                {props.dateOption === 2 && (
                                    <img src={require('../../assets/images/icon_check.png')} alt={context.t("I don’t have a specific date in mind yes, but my availability in Newyork City is as follows :")} className={`${styles.iconCheck}`} />
                                )}
                            </div>
                            <div className={`${styles.checkBoxText}`}>
                                <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{context.t("I don’t have a specific date in mind yes, but my availability in Newyork City is as follows :")}</p>
                            </div>
                        </div>
                        {props.dateConfirm && (props.dateOption === 2) && (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={props.openCalendar2}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedStartDate.getFullYear()}/${String(props.selectedStartDate.getMonth() + 1).length === 2 ? (props.selectedStartDate.getMonth() + 1) : '0'.concat(String(props.selectedStartDate.getMonth() + 1))}/${props.selectedStartDate.getDate()}`}</p>
                                </div>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={props.openCalendar2}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedEndDate.getFullYear()}/${String(props.selectedEndDate.getMonth() + 1).length === 2 ? (props.selectedEndDate.getMonth() + 1) : '0'.concat(String(props.selectedEndDate.getMonth() + 1))}/${props.selectedEndDate.getDate()}`}</p>
                                </div>
                            </div>
                        )}
                        </Collapse>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={props.customerSelectedOption.id ? props.show3 ?  props.close3 : props.open3 : null}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("3. Service&Pricing")}</p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show3 ? styles.rotate : null}`}/>
                        </div>
                        <Collapse isOpened={props.show3} theme={{collapse: styles.collapse}}>
                        <div className={`${styles.my3}`}>
                            {props.options && props.options.length > 0 ? (
                                props.options.map((option, index) => (
                                    <div key={index} className={`${styles.py4} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.index === props.options.length - 1 ? null : styles.mb2} ${styles.cursorPointer} ${props.customerSelectedOption.id === option.id ? styles.borderPink : styles.borderGrayD9} ${props.customerSelectedOption.id === option.id ? styles.bgPink : styles.bgWhite}`} onClick={props.customerSelectedOption.id === option.id ? props.blankOption : () => props.selectOption(option)}>
                                        <div>
                                            <p className={`${styles.fontBold} ${styles.font14} ${props.customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`${option.title} (${option.person > 1 ? `${option.person} people` : `${option.person} person`}, ${option.hour > 1 ? `${option.hour} hrs` : `${option.hour} hr`})`}</p>
                                            <p className={`${styles.font10} ${styles.mt2} ${props.customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{option.description}</p>
                                        </div>
                                        <div>
                                            <p className={`${styles.font14} ${props.customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`$${numberWithCommas(option.price)}`}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{context.t("선택가능한 옵션이 없습니다.")}</p>
                            )}
                        </div>
                        </Collapse>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("4. Comments")}</p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show4 ? styles.rotate : null}`} />
                        </div>
                        <Collapse isOpened={props.show4} theme={{collapse: styles.collapse}}>
                        <textarea className={`${styles.textArea} ${styles.mt3} ${styles.py3} ${styles.px2}`} placeholder={context.t("comment")} value={props.comment} name={"comment"} onChange={props.handleInputChange} />
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Submit the request")}</p>
                        </div>
                        </Collapse>
                    </div>
                    <div className={`${styles.py3} ${styles.px3} ${styles.bgGrayE7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`}>
                        <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("Find other photogrpahes in New York")}</p>
                        <img src={require('../../assets/images/icon_arrow_right.png')} alt={context.t("Find More")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                    </div>
                </div>
            )}
            <div className={`${styles.containerAdminStudio} ${styles.mobileNone} ${styles.bgGrayF8} ${styles.minHeightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                <div className={`${styles.containerMobileCard} ${styles.bgWhite} ${styles.my3} ${styles.overflowYScroll}`} style={{position: 'relative'}}>
                    <div className={`${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2, position: 'relative'}}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <img src={require('../../assets/images/icon_menu.png')} alt={context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} />
                            </div>
                            <div className={`${styles.col10} ${styles.px0}`}>
                                <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font16} ${styles.cursorPointer}`}>{context.t("PRIZM")}</p>
                            </div>
                        </div>
                        <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                            <p className={`${styles.textCenter} ${styles.font10}`}>{context.t("a whole new photography experience")}</p>
                        </div>
                    </div>
                    <div className={`${styles.containerMobileCard2} ${styles.bgWhite} ${styles.overflowYScroll}`} style={{position: 'relative'}}>
                    <PortfolioSlider portfolio={props.images} nickname={props.nickname} lg={false} />
                    <div className={`${styles.px3}`}>
                        <div className={`${styles.mt4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            {props.profileImage.image ? (
                                <ProfileDivLg image={props.profileImage.image} />
                            ) : (
                                <EmptyProfileDivLg />
                            )}
                            <div className={`${styles.ml3}`}>
                                <p className={`${styles.fontBold} ${styles.font14}`}>{props.nickname}</p>
                                <p className={`${styles.font12} ${styles.mt1}`}>{props.mainLocation}</p>
                            </div>
                        </div>
                        <div className={`${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Education")}</p>
                            <p className={`${styles.font10}`}>{props.education}</p>
                        </div>
                        <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Career")}</p>
                            <p className={`${styles.font10}`}>{props.career}</p>
                        </div>
                        {props.portfolio ? (
                            <div className={`${styles.mt1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Portfolio")}</p>
                                <a href={props.portfolio} target={'_blank'} className={`${styles.font10} ${styles.black}`} style={{textDecoration: 'none'}}>{props.portfolio}</a>
                            </div>
                        ) : (
                            null
                        )}
                        <div className={`${styles.mt3}`}>
                            <p className={`${styles.font11}`} style={{lineHeight: 1.45}}>
                                <Truncate lines={props.isTruncated ? 4 : null} ellipsis={<span>...</span>}>
                                    {props.description}
                                </Truncate>
                            </p>
                            <p className={`${styles.fontBold} ${styles.font13} ${styles.green} ${styles.mt2} ${styles.cursorPointer}`} onClick={props.isTruncated ? props.undoTruncate : props.doTruncate}>{props.isTruncated ? context.t("More ...") : context.t("Abbr")}</p>
                        </div>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.my3}`}>
                            <p className={`${styles.fontBold} ${styles.font12}`}>{context.t("Review")}</p>
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
                                <img src={require('../../assets/images/icon_arrow_right.png')} alt={context.t("Go Review")} className={`${styles.ml2} ${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={props.show1 ? props.customerSelectedLocation.id ? props.close1 : null : props.open1}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("1. Select Location")}<span className={`${styles.pink}`}>{`  (${props.locations.length})`}</span></p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show1 ? styles.rotate : null}`} />
                        </div>
                        <Collapse isOpened={props.show1} theme={{collapse: styles.collapse}}>
                            {props.locations && props.locations.length > 0 ? (
                                <div className={`${styles.containerLocationOutside} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.flexNowrap}`}>
                                    {props.locations.map((location, index) => (
                                        <LocationComp key={index} location={location} selectedLocation={props.customerSelectedLocation} index={index} total={props.locations.length} blankLocation={props.blankCustomerLocation} selectLocation={props.selectCustomerLocation} />
                                    ))}
                                </div>
                            ) : (
                                <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{context.t("선택가능한 지역이 없습니다.")}</p>
                            )}
                            {props.customerSelectedLocation.lat ? (
                                <div className={`${styles.mt3}`}>
                                    <Map2
                                    isMarkerShown={true}
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{height: 170}} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    lng={props.customerSelectedLocation.lng}
                                    lat={props.customerSelectedLocation.lat}
                                    />
                                </div>
                            ) : null}
                        </Collapse>
                    </div>

                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={(props.dateConfirm ) ? props.show2 ? props.close2 : props.open2 : null}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("2. Date&Time")}</p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show2 ? styles.rotate : null}`}/>
                        </div>
                        <Collapse isOpened={props.show2} theme={{collapse: styles.collapse}}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={props.dateOption === 1 ? props.blankDateOption : () => props.handleChangeDateOption(1)}>
                            <div className={`${styles.checkBox} ${props.dateOption !== 1 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                {props.dateOption === 1 && (
                                    <img src={require('../../assets/images/icon_check.png')} alt={context.t("I have a specific date in mind")} className={`${styles.iconCheck}`} />
                                )}
                            </div>
                            <div className={`${styles.checkBoxText}`}>
                                <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{context.t("I have a specific date in mind")}</p>
                            </div>
                        </div>
                        {props.dateConfirm && (props.dateOption === 1) && (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => props.openCalendar1(1)}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedDate.getFullYear()}/${String(props.selectedDate.getMonth() + 1).length === 2 ? (props.selectedDate.getMonth() + 1) : '0'.concat(String(props.selectedDate.getMonth() + 1))}/${props.selectedDate.getDate()}`}</p>
                                </div>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => props.openCalendar1()}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedHour}:${props.selectedMin}`}</p>
                                </div>
                            </div>
                        )}
                        <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.cursorPointer}`} onClick={props.dateOption === 2 ? props.blankDateOption : () => props.handleChangeDateOption(2)}>
                            <div className={`${styles.checkBox} ${props.dateOption !== 2 && styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                {props.dateOption === 2 && (
                                    <img src={require('../../assets/images/icon_check.png')} alt={context.t("I don’t have a specific date in mind yes, but my availability in Newyork City is as follows :")} className={`${styles.iconCheck}`} />
                                )}
                            </div>
                            <div className={`${styles.checkBoxText}`}>
                                <p className={`${styles.fontBold} ${styles.font13} ${styles.ml1}`} style={{marginTop: 3}}>{context.t("I don’t have a specific date in mind yes, but my availability in Newyork City is as follows :")}</p>
                            </div>
                        </div>
                        {props.dateConfirm && (props.dateOption === 2) && (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={props.openCalendar2}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedStartDate.getFullYear()}/${String(props.selectedStartDate.getMonth() + 1).length === 2 ? (props.selectedStartDate.getMonth() + 1) : '0'.concat(String(props.selectedStartDate.getMonth() + 1))}/${props.selectedStartDate.getDate()}`}</p>
                                </div>
                                <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={props.openCalendar2}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${props.selectedEndDate.getFullYear()}/${String(props.selectedEndDate.getMonth() + 1).length === 2 ? (props.selectedEndDate.getMonth() + 1) : '0'.concat(String(props.selectedEndDate.getMonth() + 1))}/${props.selectedEndDate.getDate()}`}</p>
                                </div>
                            </div>
                        )}
                        </Collapse>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={props.customerSelectedOption.id ? props.show3 ?  props.close3 : props.open3 : null}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("3. Service&Pricing")}</p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show3 ? styles.rotate : null}`}/>
                        </div>
                        <Collapse isOpened={props.show3} theme={{collapse: styles.collapse}}>
                        <div className={`${styles.my3}`}>
                            {props.options && props.options.length > 0 ? (
                                props.options.map((option, index) => (
                                    <div key={index} className={`${styles.py4} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.index === props.options.length - 1 ? null : styles.mb2} ${styles.cursorPointer} ${props.customerSelectedOption.id === option.id ? styles.borderPink : styles.borderGrayD9} ${props.customerSelectedOption.id === option.id ? styles.bgPink : styles.bgWhite}`} onClick={props.customerSelectedOption.id === option.id ? props.blankOption : () => props.selectOption(option)}>
                                        <div>
                                            <p className={`${styles.fontBold} ${styles.font14} ${props.customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`${option.title} (${option.person > 1 ? `${option.person} people` : `${option.person} person`}, ${option.hour > 1 ? `${option.hour} hrs` : `${option.hour} hr`})`}</p>
                                            <p className={`${styles.font10} ${styles.mt2} ${props.customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{option.description}</p>
                                        </div>
                                        <div>
                                            <p className={`${styles.font14} ${props.customerSelectedOption.id === option.id ? styles.white : styles.black}`}>{`$${numberWithCommas(option.price)}`}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={`${styles.font13} ${styles.textCenter} ${styles.mt3}`}>{context.t("선택가능한 옵션이 없습니다.")}</p>
                            )}
                        </div>
                        </Collapse>
                    </div>
                    <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                    <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("4. Comments")}</p>
                            <img src={require('../../assets/images/icon_arrow_down.png')} alt={context.t("More")} className={`${styles.iconArrowDown} ${styles.arrowAnimated} ${props.show4 ? styles.rotate : null}`} />
                        </div>
                        <Collapse isOpened={props.show4} theme={{collapse: styles.collapse}}>
                        <textarea className={`${styles.textArea} ${styles.mt3} ${styles.py3} ${styles.px2}`} placeholder={context.t("comment")} value={props.comment} name={"comment"} onChange={props.handleInputChange} />
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Submit the request")}</p>
                        </div>
                        </Collapse>
                    </div>
                    <div className={`${styles.py3} ${styles.px3} ${styles.bgGrayE7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`}>
                        <p className={`${styles.fontBold} ${styles.font13}`}>{context.t("Find other photogrpahes in New York")}</p>
                        <img src={require('../../assets/images/icon_arrow_right.png')} alt={context.t("Find More")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
        isOpen={props.showLocationModal}
        onRequestClose={props.closeLocationModal}
        style={customStyles}
        >
            <div className={`${styles.widthFull} ${styles.heightFull} ${styles.bgWhite}`} style={{zIndex: 10}}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.px3} ${styles.py4} ${styles.bgWhite}`}>
                    <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                        <img src={require('../../assets/images/icon_left.png')} alt={context.t("go back")} className={`${styles.iconArrowRightLg} ${styles.cursorPointer}`} onClick={props.closeLocationModal} />
                    </div>
                    <div className={`${styles.col8} ${styles.coLSm10} ${styles.px0}`}>
                        <p className={`${styles.fontBold} ${styles.font16} ${styles.textCenter}`}>{context.t("Search Location")}</p>
                    </div>
                    <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`} onClick={props.completeLocationSearch}>
                        <p className={`${styles.fontBold} ${styles.font13} ${styles.textRight}`}>{context.t("완료")}</p>
                    </div>
                </div>
                <div className={`${styles.px3} ${styles.py2} ${styles.bgGray5c}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <PlacesWithStandaloneSearchBox searchLocation={props.searchLocation} />
                    </div>
                </div>
                <Map
                isMarkerShown={props.locationSearched}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div className={`${styles.widthFull} ${styles.heightFullPercent}`} />}
                mapElement={<div style={{ height: `100%` }} />}
                searchedLocations={props.searchedLocations}
                locations={props.locations}
                lng={props.locationSearched ? 126.9748523 : 126.9748523}
                lat={props.locationSearched ? 37.5796212 : 37.5796212}
                selectedLocation={props.selectedLocation}
                selectLocation={props.selectLocation}
                />
                {props.searchedLocations.length > 0 ? (
                    <div className={`${styles.bgWhite} ${styles.widthFull} ${styles.overflowYScroll}`} style={{position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: 150}}>
                        {props.searchedLocations.map((location, index) => {
                            const find = props.locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
                            return(
                                <div key={index} className={`${index === props.searchedLocations.length - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} onClick={() => props.selectLocation(location)}>
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
        </Modal>
        <Modal
        isOpen={props.showOptionModal}
        onRequestClose={props.closeOptionModal}
        style={customStyles}
        >
            <div className={`${styles.widthFull} ${styles.heightFull} ${styles.bgWhite}`} style={{zIndex: 10}}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.px3} ${styles.py4} ${styles.bgWhite}`}>
                    <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                        <img src={require('../../assets/images/icon_left.png')} alt={context.t("go back")} className={`${styles.iconArrowRightLg} ${styles.cursorPointer}`} onClick={props.closeOptionModal} />
                    </div>
                    <div className={`${styles.col8} ${styles.coLSm10} ${styles.px0}`}>
                        <p className={`${styles.fontBold} ${styles.font16} ${styles.textCenter}`}>{context.t("Add to option")}</p>
                    </div>
                    <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                       
                    </div>
                </div>
                <div className={`${styles.px3}`}>
                    <p className={`${styles.mt3} ${styles.fontBold} ${styles.font20}`}>{context.t(`Option ${props.options.length + 1}`)}</p>
                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Title")}</p>
                    </div>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"optionTitle"} value={props.optionTitle} onChange={props.handleInputChange} placeholder={context.t("ex) National Geographic Photographer, ABC Photographer")} />
                    </div>
                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Photography Type")}</p>
                    </div>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"optionType"} value={props.optionType} onChange={props.handleInputChange} placeholder={context.t("ex) Wedding, Couple, Single, Group")} />
                    </div>
                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Description")}</p>
                    </div>
                    <div className={`${styles.containerStudioInput}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"optionDescription"} value={props.optionDescription} onChange={props.handleInputChange} placeholder={context.t("ex) BlahBlahBlah")} />
                    </div>
                    <div className={`${styles.mt4} ${styles.mtMd3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                        <div className={`${styles.col3} ${styles.px0}`}>
                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Person(s)")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"optionPerson"} value={props.optionPerson} onChange={props.handleInputChange} maxLength={2} />
                            </div>
                        </div>
                        <div className={`${styles.col3} ${styles.px0}`}>
                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Hour(s)")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"optionHour"} value={props.optionHour} onChange={props.handleInputChange} maxLength={2} />
                            </div>
                        </div>
                        <div className={`${styles.col3} ${styles.px0}`}>
                            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mr2}`}>{context.t("Price")}</p>
                            <div className={`${styles.containerStudioInput}`}>
                                <input className={`${styles.textInput6}`} type={"text"} name={"optionPrice"} value={props.optionPrice} onChange={props.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.containerStudioInput} ${styles.bgGray33} ${styles.mt45} ${styles.px3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.completeAddOption}>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{context.t("Save")}</p>
                    </div>
                </div>
            </div>
        </Modal>
        <RModal
        open={props.showCalendar1} 
        onClose={props.closeCalendar1} 
        center
        styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
        >
            <div className={`${styles.containerModal}`}>
                {props.selectDateStep === 1 && (
                    <Fragment>
                        <Calendar
                        locale={'en'}
                        calendarType={'US'}
                        className={`${styles.p3} ${styles.containerModal}`}
                        nextLabel={<span><img src={require('../../assets/images/icon_right.png')} alt={context.t("Next Month")} className={`${styles.iconArrowRight}`} /></span>}
                        next2Label={<span><img src={require('../../assets/images/icon_right.png')} alt={context.t("Next Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_right.png')} alt={context.t("Next Year")} className={`${styles.iconArrowRight}`} /></span>}
                        prevLabel={<span><img src={require('../../assets/images/icon_left.png')} alt={context.t("Prev Month")} className={`${styles.iconArrowRight}`} /></span>}
                        prev2Label={<span><img src={require('../../assets/images/icon_left.png')} alt={context.t("Prev Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_left.png')} alt={context.t("Prev Year")} className={`${styles.iconArrowRight}`} /></span>}
                        navigationLabel={({ date, view, label }) => <p className={`${styles.fontBold} ${styles.font14}`}>{label}</p>}
                        tileClassName={`${styles.font12}`}
                        value={props.selectedDate}
                        onChange={props.selectDate}
                        />
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={() => props.changeDateStep(2)}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Next")}</p>
                        </div>
                    </Fragment>
                )}
                {props.selectDateStep === 2 && (
                    <Fragment>
                        <div className={`${styles.p3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                <div className={`${styles.col1} ${styles.px0}`}>
                                    <img src={require('../../assets/images/icon_arrow_left.png')} alt={context.t("Before")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} onClick={() => props.changeDateStep(1)} />
                                </div>
                                <div className={`${styles.col10} ${styles.px0}`}>
                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.textCenter}`}>{`${props.selectedDate.getFullYear()}.${props.selectedDate.getMonth() + 1}.${props.selectedDate.getDay()}`}</p>
                                </div>
                            </div>
                            <div className={`${styles.py5}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    <div className={`${styles.textInput5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer}`} type={"text"} name={"time"} onClick={props.handleShowHourList} style={{position: 'relative'}}>
                                        <p className={`${styles.font13} ${styles.mx2} ${styles.textCenter}`}>{props.selectedHour}</p>
                                        {props.showHourList && (
                                            <div style={{position: 'absolute', top: 25, width: 50, maxHeight: 150}} className={`${styles.bgWhite} ${styles.borderDropdown} ${styles.overflowYScroll}`}>
                                                {hourList.map((hour,index) => (
                                                    <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer} ${styles.textCenter}`} onClick={() => props.selectHour(hour)}>{hour}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <p className={`${styles.font13} ${styles.mx2}`}>:</p>
                                    <div className={`${styles.textInput5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer}`} type={"text"} name={"time"} onClick={props.handleShowMinList} style={{position: 'relative'}}>
                                        <p className={`${styles.font13} ${styles.mx2} ${styles.textCenter}`}>{props.selectedMin}</p>
                                        {props.showMinList && (
                                            <div style={{position: 'absolute', top: 25, width: 50, maxHeight: 150}} className={`${styles.bgWhite} ${styles.borderDropdown} ${styles.overflowYScroll}`}>
                                                {minList.map((min,index) => (
                                                    <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer} ${styles.textCenter}`} onClick={() => props.selectMin(min)}>{min}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.confirmDate}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Done")}</p>
                        </div>
                    </Fragment>
                )}
            </div>
        </RModal>
        <RModal
        open={props.showCalendar2} 
        onClose={props.closeCalendar2} 
        center
        styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
        >
            <div className={`${styles.containerModal}`}>
                <Fragment>
                    <Calendar
                    locale={'en'}
                    calendarType={'US'}
                    selectRange={true}
                    value={props.dateRange.length > 0 ? props.dateRange : null}
                    className={`${styles.p3} ${styles.containerModal}`}
                    nextLabel={<span><img src={require('../../assets/images/icon_right.png')} alt={context.t("Next Month")} className={`${styles.iconArrowRight}`} /></span>}
                    next2Label={<span><img src={require('../../assets/images/icon_right.png')} alt={context.t("Next Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_right.png')} alt={context.t("Next Year")} className={`${styles.iconArrowRight}`} /></span>}
                    prevLabel={<span><img src={require('../../assets/images/icon_left.png')} alt={context.t("Prev Month")} className={`${styles.iconArrowRight}`} /></span>}
                    prev2Label={<span><img src={require('../../assets/images/icon_left.png')} alt={context.t("Prev Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_left.png')} alt={context.t("Prev Year")} className={`${styles.iconArrowRight}`} /></span>}
                    navigationLabel={({ date, view, label }) => <p className={`${styles.fontBold} ${styles.font14}`}>{label}</p>}
                    tileClassName={`${styles.font12}`}
                    onChange={props.selectDateRange}
                    />
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.confirmDate}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Done")}</p>
                    </div>
                </Fragment>
            </div>
        </RModal>
    </div>
)

AdminSignUp.propTypes = {
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
    profileImage: PropTypes.object,
    handleInputChange: PropTypes.func.isRequired,
    education: PropTypes.string.isRequired,
    career: PropTypes.string.isRequired,
    portfolio: PropTypes.string.isRequired,
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
    showHourList: PropTypes.bool.isRequired,
    showMinList: PropTypes.bool.isRequired,
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
    selectHour: PropTypes.func.isRequired,
    selectMin: PropTypes.func.isRequired,
    handleShowHourList: PropTypes.func.isRequired,
    handleShowMinList: PropTypes.func.isRequired,
    goConfirm: PropTypes.func.isRequired,
    dateRange: PropTypes.array.isRequired,
    customerSelectedOption: PropTypes.object.isRequired,
    selectOption: PropTypes.func.isRequired,
    blankOption: PropTypes.func.isRequired,
    comment: PropTypes.string.isRequired
}

AdminSignUp.contextTypes = {
    t: PropTypes.func
}

export default AdminSignUp;

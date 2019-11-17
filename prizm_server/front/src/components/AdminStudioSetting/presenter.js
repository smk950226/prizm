import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import styled from 'styled-components';
import PortfolioSlider from '../PortfolioSlider';
import MdClose from 'react-ionicons/lib/MdClose';
import MdCheckmark from 'react-ionicons/lib/MdCheckmark';
import Truncate from 'react-truncate';
import Modal from 'react-modal';
import IosArrowRoundForward from 'react-ionicons/lib/IosArrowRoundForward';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

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
    center={props.selectedLocation.geometry ? { lat: props.selectedLocation.geometry.location.lat, lng: props.selectedLocation.geometry.location.lng } : props.locations.length > 0 ? { lat: props.locations[0].geometry.location.lat, lng: props.locations[0].geometry.location.lng} : { lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && props.locations.length > 0 && (
        props.locations.map((location, index) => (
            <MarkerWithLabel 
            key={index}
            icon={props.selectedLocation.geometry ? ((location.geometry.location.lat === props.selectedLocation.geometry.location.lat) && (location.geometry.location.lng === props.selectedLocation.geometry.location.lng)) ? require('../../assets/images/icon_marker_selected.png') : require('../../assets/images/icon_marker_not.png') : require('../../assets/images/icon_marker_not.png')} 
            position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }} 
            onClick={() => props.selectLocation(location)}
            labelAnchor={{x: 3.5, y: 20}}
            >
                <p className={`${styles.fontBold} ${styles.font11} ${styles.white}`}>{index + 1}</p>
            </MarkerWithLabel>
        ))
        
    )}
  </GoogleMap>
)))

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
                    <input id={`portfolio`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} onChange={props.submit} />
                    <input id={`profile`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} onChange={props.submitProfile} />
                </div>
            ) : (
                <div className={`${styles.mobileOnly} ${styles.widthFull} ${styles.minHeightFull}`} style={{display: 'block'}}>
                    <div className={`${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2, position: 'relative'}}>
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
                    </div>
                </div>
            )}
            <div className={`${styles.containerAdminStudio} ${styles.mobileNone} ${styles.bgGrayF8} ${styles.minHeightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                <div className={`${styles.containerMobileCard} ${styles.bgWhite} ${styles.my3} ${styles.overflowYScroll}`}>
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
                    <div className={`${styles.col2} ${styles.coLSm1} ${styles.px0}`}>
                        <p className={`${styles.fontBold} ${styles.font13} ${styles.textRight}`}>{context.t("완료")}</p>
                    </div>
                </div>
                <div className={`${styles.px3} ${styles.py2} ${styles.bgGray5c}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <input className={`${styles.textInput9}`} type={"text"} name={"locationSearch"} value={props.locationSearch} onChange={props.handleInputChange} placeholder={context.t("Search location")} />
                        <div className={`${styles.bgWhite} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{width: 40, height: 40}}>
                            <div className={`${styles.bgWhite} ${styles.circleGray5c20} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={props.searchLocation}>
                                <IosArrowRoundForward fontSize="20px" color={'#ffffff'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Map
                isMarkerShown={props.locationSearched}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div className={`${styles.widthFull} ${styles.heightFullPercent}`} />}
                mapElement={<div style={{ height: `100%` }} />}
                locations={props.searchedLocations}
                lng={props.locationSearched ? 126.9748523 : 126.9748523}
                lat={props.locationSearched ? 37.5796212 : 37.5796212}
                selectedLocation={props.selectedLocation}
                selectLocation={props.selectLocation}
                />
                {props.searchedLocations.length > 0 ? (
                    <div className={`${styles.bgWhite} ${styles.widthFull} ${styles.overflowYScroll}`} style={{position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: 250}}>
                        {props.searchedLocations.map((location, index) => (
                            <div key={index} className={`${index === props.searchedLocations.length - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} onClick={() => props.selectLocation(location)}>
                                <p className={`${styles.fontBold} ${styles.font12} ${props.selectedLocation.geometry && ((props.selectedLocation.geometry.location.lat === location.geometry.location.lat) && (props.selectedLocation.geometry.location.lng === location.geometry.location.lng)) ? styles.pink : null}`}>{index + 1}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    null
                )}
            </div>
        </Modal>
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
    selectedLocation: PropTypes.object

}

AdminSignUp.contextTypes = {
    t: PropTypes.func
}

export default AdminSignUp;

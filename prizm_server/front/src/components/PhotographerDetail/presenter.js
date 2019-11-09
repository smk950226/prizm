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
        isSubmitting: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isOpen: false,
        photoIndex: 0
    }

    render(){
        const { photographer, loading, isTruncated, selectedLocation, dateOption, selectedOption, comment, isSubmitting } = this.props;
        return(
            <div className={`${styles.safeareaTop}`}>
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
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown}`} />
                            </div>
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
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("2. Date&Time")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown}`} />
                            </div>
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
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("3. Service&Pricing")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown}`} />
                            </div>
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
                        </div>
                        <div className={`${styles.bgGrayF4}`} style={{height: 10}} />
                        <div className={`${styles.pt4} ${styles.px3} ${styles.mb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("4. Comments")}</p>
                                <img src={require('../../assets/images/icon_arrow_down.png')} alt={this.context.t("More")} className={`${styles.iconArrowDown}`} />
                            </div>
                            <textarea className={`${styles.textArea} ${styles.mt3} ${styles.py3} ${styles.px2}`} placeholder={this.context.t("comment")} value={comment} name={"comment"} onChange={this.props.handleInputChange} />
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("submit the request")}</p>
                            </div>
                        </div>
                        <div className={`${styles.py3} ${styles.px3} ${styles.bgGrayE7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <p className={`${styles.fontBold} ${styles.font13}`}>{this.context.t("Find other photogrpahes in New York")}</p>
                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Find More")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} />
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

export default PhotographerDetail;
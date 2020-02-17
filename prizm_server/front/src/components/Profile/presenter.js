import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import { COUNTRY_NUMBER } from '../../utils/country';
import MyLoader from '../Loader';
import ReactCountryFlag from "react-country-flag";
import Modal from 'react-responsive-modal';

const Profile = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{context.t("Profile")}</p>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("First name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"firstName"} value={props.firstName} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Last name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"lastName"} value={props.lastName} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} contentEditable={false} readOnly={true} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Mobile")}</p>
        <div className={`${styles.positionRelative}`}>
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.handleShowCountryNumber}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 17}}>
                        <p className={`${styles.font13}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                        <MdArrowDropup fontSize="16px" color="#000000" />
                    </div>
                </div>
                <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                    <div className={`${styles.col10} ${styles.px0}`}>
                        <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Edit profile")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goPasswordChange}>{context.t("Do you want to change your password?")}</p>
        {props.isSubmitting && (
            <MyLoader />
        )}
        <Modal
        open={props.showCountryNumber} 
        onClose={props.closeShowCountryNumber} 
        center
        styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
        >
            <div className={`${styles.containerModal}`}>
                <p className={`${styles.textCenter} ${styles.my3} ${styles.fontBold} ${styles.font1214}`}>{context.t("Nationality")}</p>
                <div className={`${styles.px5}`}>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput2}`} type={"text"} name={"q"} placeholder={context.t("Type your country")} value={props.q} onChange={props.handleInputChange} />
                    </div>
                </div>
                <div className={`${styles.overflowYScroll} ${styles.px3} ${styles.pt2}`} style={{maxHeight: 300}}>
                    {props.q !== "" && props.countryList.map((country, index) => (
                        <div key={index} className={`${styles.row} ${styles.mx0} ${styles.mb2}`} onClick={() => props.handleCountryNumberChange(country.number, country.value)}>
                            <ReactCountryFlag 
                                styleProps={{
                                    width: '15px',
                                    height: '15px'
                                }}
                                code={country.value}
                                svg
                            />
                            <p className={`${styles.font1214} ${styles.ml2}`}>{country.label}</p>
                            <p className={`${styles.font1214} ${styles.ml2}`}>{`+${country.number}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    </div>
)

Profile.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    emailForm: PropTypes.bool.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goPasswordChange: PropTypes.func.isRequired,
    openShowCountryNumber: PropTypes.func.isRequired,
    closeShowCountryNumber: PropTypes.func.isRequired,
    countryList: PropTypes.array,
    q: PropTypes.string.isRequired
}

Profile.contextTypes = {
    t: PropTypes.func
}

export default Profile;

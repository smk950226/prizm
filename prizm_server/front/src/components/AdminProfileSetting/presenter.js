import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import { COUNTRY_NUMBER } from '../../utils/country';

const Profile = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.justifyContentBetween}`}>
            <p className={`${styles.mt45} ${styles.fontBold} ${styles.font2024}`}>{context.t("Profile")}</p>
            <p className={`${styles.fontBold} ${styles.font13} ${styles.pink} ${styles.cursorPointer} ${props.editable ? styles.hidden : null}`} onClick={props.enableEdit}>{context.t("Edit")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("Full name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"name"} value={props.name} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Mobile")}</p>
        <div className={`${styles.positionRelative}`}>
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.editable ? props.handleShowCountryNumber : null}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                        <p className={`${styles.font13}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                        {props.showCountryNumber ? (
                            <MdArrowDropup fontSize="16px" color="#000000" />
                        ) : (
                            <MdArrowDropdown fontSize="16px" color="#000000" />
                        )}
                    </div>
                </div>
                <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                    <div className={`${styles.col10} ${styles.px0}`}>
                        <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
                    </div>
                    <p className={`${styles.font11} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Verify")}</p>
                </div>
            </div>
            <div className={`${props.showCountryNumber ? null : styles.none} ${styles.positionDropdown} ${styles.overflowYScroll} ${styles.bgWhite}`} style={{maxHeight: 200, width: 65}}>
                {COUNTRY_NUMBER.map((country, index) => (
                    <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer}`} onClick={() => props.handleCountryNumberChange(country.value)}>{`+${country.value}`}</p>
                ))}
            </div>
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Instagram")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"instagram"} value={props.instagram} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} contentEditable={false} readOnly={true} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Date of Birth(YY/MM/DD)")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"birth"} value={props.birth} onChange={props.handleInputChange} maxLength={6} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
        </div>
        {props.editable && (
            <Fragment>
                <div className={`${styles.mobileOnly}`}>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Save")}</p>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goPasswordChange}>{context.t("Change Password?")}</p>
                </div>
                <div className={`${styles.mobileNone}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <div className={`${styles.bgGray33} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, width: 140}} onClick={props.submit}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Save change")}</p>
                        </div>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goPasswordChange}>{context.t("Change Password?")}</p>
                </div>
            </Fragment>
        )}
    </div>
)

Profile.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    emailForm: PropTypes.bool.isRequired,
    birthForm: PropTypes.bool.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goPasswordChange: PropTypes.func.isRequired,
    enableEdit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired
}

Profile.contextTypes = {
    t: PropTypes.func
}

export default Profile;

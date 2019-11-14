import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import { COUNTRY_NUMBER } from '../../utils/country';

const AdminSignUp = (props, context) => (
    <div className={`${styles.safeareaAdminMobile} ${styles.containerAdmin} ${styles.pxAdmin}`}>
        <div className={`${styles.mobileOnly}`}>
            <p className={`${styles.fontBold} ${styles.font2024} ${styles.mt3}`}>{context.t("Welcome to PRIZM")}</p>
            <p className={`${styles.font1416} ${styles.mt1} ${styles.mtXl2}`}>{context.t("Please fill out information beslow to continue")}</p>
            <p className={`${styles.fontBold} ${styles.font1012}`} style={{marginTop: 50}}>{context.t("Name")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"text"} name={"name"} value={props.name} onChange={props.handleInputChange} />
            </div>
            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Mobile Number")}</p>
            <div className={`${styles.positionRelative}`}>
                <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                    <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.handleShowCountryNumber}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                            <p className={`${styles.font1113}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                            {props.showCountryNumber ? (
                                <MdArrowDropup fontSize="13px" color="#000000" />
                            ) : (
                                <MdArrowDropdown fontSize="13px" color="#000000" />
                            )}
                        </div>
                    </div>
                    <div className={`${styles.textInput7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                        <div className={`${styles.col10} ${styles.px0}`}>
                            <input className={`${styles.textInput8}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
                        </div>
                        <p className={`${styles.font1113} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Verify")}</p>
                    </div>
                </div>
                <div className={`${props.showCountryNumber ? null : styles.none} ${styles.positionDropdown} ${styles.overflowYScroll} ${styles.bgWhite}`} style={{maxHeight: 200, width: 65}}>
                    {COUNTRY_NUMBER.map((country, index) => (
                        <p key={index} className={`${styles.font1113} ${styles.py2} ${styles.cursorPointer}`} onClick={() => props.handleCountryNumberChange(country.value)}>{`+${country.value}`}</p>
                    ))}
                </div>
            </div>
            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Instagram")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"text"} name={"instagram"} value={props.instagram} onChange={props.handleInputChange} />
            </div>
            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Email")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} />
            </div>
            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Password")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
            </div>
            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Date of Birth(YY/MM/DD)")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"text"} name={"birth"} value={props.birth} onChange={props.handleInputChange} maxLength={6} />
            </div>
            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, marginTop: 65}} onClick={props.submit}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("sign up")}</p>
            </div>
        </div>
        <div className={`${styles.mobileNone}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.minHeightFull} ${styles.widthFull}`}>
                <div className={`${styles.colMd6} ${styles.colXl7} ${styles.px0}`}>
                    <p className={`${styles.fontBold} ${styles.font2024} ${styles.mt3}`}>{context.t("Welcome to PRIZM")}</p>
                    <p className={`${styles.font1416} ${styles.mt1} ${styles.mtXl2}`}>{context.t("Please fill out information beslow to continue")}</p>
                </div>
                <div className={`${styles.colMd6} ${styles.colXl5} ${styles.px0}`} style={{maxWidth: 420}}>
                    <p className={`${styles.fontBold} ${styles.font1012}`}>{context.t("Name")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"name"} value={props.name} onChange={props.handleInputChange} />
                    </div>
                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Mobile Number")}</p>
                    <div className={`${styles.positionRelative}`}>
                        <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.handleShowCountryNumber}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                                    <p className={`${styles.font1113}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                                    {props.showCountryNumber ? (
                                        <MdArrowDropup fontSize="13px" color="#000000" />
                                    ) : (
                                        <MdArrowDropdown fontSize="13px" color="#000000" />
                                    )}
                                </div>
                            </div>
                            <div className={`${styles.textInput7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <div className={`${styles.col10} ${styles.px0}`}>
                                    <input className={`${styles.textInput8}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
                                </div>
                                <p className={`${styles.font1113} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Verify")}</p>
                            </div>
                        </div>
                        <div className={`${props.showCountryNumber ? null : styles.none} ${styles.positionDropdown} ${styles.overflowYScroll} ${styles.bgWhite}`} style={{maxHeight: 200, width: 65}}>
                            {COUNTRY_NUMBER.map((country, index) => (
                                <p key={index} className={`${styles.font1113} ${styles.py2} ${styles.cursorPointer}`} onClick={() => props.handleCountryNumberChange(country.value)}>{`+${country.value}`}</p>
                            ))}
                        </div>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Instagram")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"instagram"} value={props.instagram} onChange={props.handleInputChange} />
                    </div>
                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Email")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} />
                    </div>
                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Password")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
                    </div>
                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Date of Birth(YY/MM/DD)")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"birth"} value={props.birth} onChange={props.handleInputChange} maxLength={6} />
                    </div>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`}>
                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, marginTop: 65, maxWidth: 140}} onClick={props.submit}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("sign up")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

AdminSignUp.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goSignIn: PropTypes.func.isRequired,
    instagram: PropTypes.string.isRequired
}

AdminSignUp.contextTypes = {
    t: PropTypes.func
}

export default AdminSignUp;

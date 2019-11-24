import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import ReactCountryFlag from "react-country-flag";
import Modal from 'react-responsive-modal';

const AdminSignUp = (props, context) => (
    <div className={`${styles.safeareaAdminMobile} ${styles.containerAdmin} ${styles.pxAdmin}`}>
        <div className={`${styles.mobileOnly}`}>
            <p className={`${styles.fontBold} ${styles.font2024} ${styles.mt3}`}>{context.t("Welcome to PRIZM")}</p>
            <p className={`${styles.font1416} ${styles.mt1} ${styles.mtXl2}`}>{context.t("Please fill out information below to continue")}</p>
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
                            <MdArrowDropdown fontSize="13px" color="#000000" />
                        </div>
                    </div>
                    <div className={`${styles.textInput7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                        <div className={`${styles.col10} ${styles.px0}`}>
                            <input className={`${styles.textInput8}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
                        </div>
                        <p className={`${styles.font1113} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Verify")}</p>
                    </div>
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
                                    <MdArrowDropdown fontSize="13px" color="#000000" />
                                </div>
                            </div>
                            <div className={`${styles.textInput7} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                <div className={`${styles.col10} ${styles.px0}`}>
                                    <input className={`${styles.textInput8}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
                                </div>
                                <p className={`${styles.font1113} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Verify")}</p>
                            </div>
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
                        <input className={`${styles.textInput2}`} type={"text"} name={"q"} value={props.q} onChange={props.handleInputChange} />
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
    instagram: PropTypes.string.isRequired,
    openShowCountryNumber: PropTypes.func.isRequired,
    closeShowCountryNumber: PropTypes.func.isRequired,
    q: PropTypes.string.isRequired,
    countryList: PropTypes.array
}

AdminSignUp.contextTypes = {
    t: PropTypes.func
}

export default AdminSignUp;

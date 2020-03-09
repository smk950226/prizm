import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import ReactCountryFlag from "react-country-flag";
import Modal from 'react-responsive-modal';

const SignUp = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer}`}>{context.t("Sign Up")}</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.mx2}`}>|</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer} ${styles.opacity4}`} onClick={() => props.goSignIn(props.goRequest, props.photographerId)}>{context.t("Sign In")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{context.t("First name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"firstName"} value={props.firstName} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Last name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"lastName"} value={props.lastName} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Mobile")}</p>
        <div className={`${styles.positionRelative}`}>
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.handleShowCountryNumber}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                        <p className={`${styles.font13}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                        <MdArrowDropdown fontSize="16px" color="#000000" />
                    </div>
                </div>
                <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                    <div className={`${styles.col10} ${styles.px0}`}>
                        <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
                    </div>
                </div>
            </div>
        </div>
        <p className={`${styles.my3} ${styles.font10}`}>
            {context.t("We will make notiifications on your reservation via email and SMS.")}
        </p>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Confirm your password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password2"} value={props.password2} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{props.goRequest ? context.t("Sign Up & Submit the request") : context.t("Sign Up")}</p>
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

SignUp.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goSignIn: PropTypes.func.isRequired,
    goRequest: PropTypes.bool.isRequired,
    openShowCountryNumber: PropTypes.func.isRequired,
    closeShowCountryNumber: PropTypes.func.isRequired,
    q: PropTypes.string.isRequired,
    countryList: PropTypes.array,
    handleKeyPress: PropTypes.func.isRequired
}

SignUp.contextTypes = {
    t: PropTypes.func
}

export default SignUp;

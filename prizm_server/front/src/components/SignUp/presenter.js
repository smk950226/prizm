import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import { COUNTRY_NUMBER } from '../../utils/country';

const SignUp = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer}`}>{context.t("Sign Up")}</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.mx2}`}>|</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer} ${styles.opacity4}`} onClick={() => props.goSignIn(props.goRequest, props.photographerId)}>{context.t("Sign In")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{context.t("Full name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"name"} value={props.name} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Mobile")}</p>
        <div className={`${styles.positionRelative}`}>
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.handleShowCountryNumber}>
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
                        <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} />
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
        <p className={`${styles.my3} ${styles.font10}`}>
            {context.t("Your reservation details and confirmation message from photographers will be sent to your email and mobile number.")}
        </p>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Date of Birth(YY/MM/DD)")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"birth"} value={props.birth} onChange={props.handleInputChange} maxLength={6} />
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{props.goRequest ? context.t("sign up & submit the request") : context.t("sign up")}</p>
        </div>
    </div>
)

SignUp.propTypes = {
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
    goRequest: PropTypes.bool.isRequired
}

SignUp.contextTypes = {
    t: PropTypes.func
}

export default SignUp;

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdCheckmark from 'react-ionicons/lib/MdCheckmark';

const SignIn = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer}`}>{context.t("Sign In")}</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.mx2}`}>|</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer} ${styles.opacity4}`} onClick={props.goSignUp}>{context.t("Sign Up")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
        </div>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2} ${styles.mb4}`}>
            <div className={`${styles.checkBox} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={props.handleSavePasswordChange}>
                {props.savePassword ? (
                    <MdCheckmark fontSize="12px" color="#000000" />
                ) : (
                    null
                )}
            </div>
            <p className={`${styles.font11} ${styles.ml1} ${styles.cursorPointer}`} onClick={props.handleSavePasswordChange}>{context.t("Save Password")}</p>
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("submit the request")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter}`}>{context.t("Forgot Password?")}</p>
    </div>
)

SignIn.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goSignUp: PropTypes.func.isRequired,
    savePassword: PropTypes.bool.isRequired,
    handleSavePasswordChange :PropTypes.func.isRequired
}

SignIn.contextTypes = {
    t: PropTypes.func
}

export default SignIn;

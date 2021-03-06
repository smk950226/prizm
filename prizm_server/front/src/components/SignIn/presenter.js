import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MyLoader from '../Loader';

const SignIn = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer} ${styles.opacity4}`} onClick={() => props.goSignUp(props.goRequest, props.photographerId)}>{context.t("Sign Up")}</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.mx2}`}>|</p>
            <p className={`${styles.fontBold} ${styles.font17} ${styles.cursorPointer}`}>{context.t("Sign In")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{context.t("Password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{props.goRequest ? context.t("Sign In & Submit the request") : context.t("Sign In")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goFindPassword}>{context.t("Forgot Password?")}</p>
        {props.isSubmitting && (
            <MyLoader />
        )}
    </div>
)

SignIn.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goSignUp: PropTypes.func.isRequired,
    goRequest: PropTypes.bool.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    goFindPassword: PropTypes.func.isRequired
}

SignIn.contextTypes = {
    t: PropTypes.func
}

export default SignIn;

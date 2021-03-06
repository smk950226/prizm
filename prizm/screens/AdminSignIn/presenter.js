import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const AdminSignUp = (props, context) => (
    <div className={`${styles.safeareaAdminMobile} ${styles.minHeightFull} ${styles.containerAdmin} ${styles.pxAdmin}`}>
        <div className={`${styles.mobileOnly}`}>
            <p className={`${styles.fontBold} ${styles.font2024} ${styles.mt3}`}>{context.t("Welcome to PRIZM")}</p>
            <p className={`${styles.font1416} ${styles.mt1} ${styles.mtXl2}`}>{context.t("Please fill in the information below to continue")}</p>
            <p className={`${styles.fontBold} ${styles.font1012}`} style={{marginTop: 50}}>{context.t("Email")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
            </div>
            <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Password")}</p>
            <div className={`${styles.widthFull}`}>
                <input className={`${styles.textInput6}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
            </div>
            <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, marginTop: 65}} onClick={props.submit}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Sign In")}</p>
            </div>
            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer} ${styles.mb3}`} onClick={props.goFindPassword}>{context.t("Forgot Password?")}</p>
        </div>
        <div className={`${styles.mobileNone}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.minHeightFull} ${styles.widthFull}`}>
                <div className={`${styles.colMd6} ${styles.colXl7} ${styles.px0}`}>
                    <p className={`${styles.fontBold} ${styles.font2024} ${styles.mt3}`}>{context.t("Welcome to PRIZM")}</p>
                    <p className={`${styles.font1416} ${styles.mt1} ${styles.mtXl2}`}>{context.t("Please fill in the information below to continue")}</p>
                </div>
                <div className={`${styles.colMd6} ${styles.colXl5} ${styles.px0}`} style={{maxWidth: 420}}>
                    <p className={`${styles.fontBold} ${styles.font1012}`}>{context.t("Email")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"text"} name={"email"} value={props.email} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
                    </div>
                    <p className={`${styles.fontBold} ${styles.font1012} ${styles.mt4}`}>{context.t("Password")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput6}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress} />
                    </div>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`}>
                        <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, marginTop: 65, maxWidth: 140}} onClick={props.submit}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Sign In")}</p>
                        </div>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer} ${styles.mb3}`} onClick={props.goFindPassword}>{context.t("Forgot Password?")}</p>
                </div>
            </div>
        </div>
    </div>
)

AdminSignUp.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    goFindPassword: PropTypes.func.isRequired
}

AdminSignUp.contextTypes = {
    t: PropTypes.func
}

export default AdminSignUp;

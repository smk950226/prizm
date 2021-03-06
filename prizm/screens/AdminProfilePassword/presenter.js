import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const AdminProfilePassword = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFull} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font2024}`}>{context.t("Profile")}</p>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("Current password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"currentPassword"} value={props.currentPassword} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("New password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Confirm your new password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password2"} value={props.password2} onChange={props.handleInputChange} />
        </div>
        <div className={`${styles.mobileOnly}`}>
            <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Edit")}</p>
            </div>
            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goProfile}>{context.t("Do you want to change your profile?")}</p>
        </div>
        <div className={`${styles.mobileNone}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                <div className={`${styles.bgGray16} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, width: 140}} onClick={props.submit}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Change Password")}</p>
                </div>
            </div>
            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goProfile}>{context.t("Do you want to change your profile?")}</p>
        </div>
    </div>
)

AdminProfilePassword.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    currentPassword: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    passwordForm: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goProfile: PropTypes.func.isRequired
}

AdminProfilePassword.contextTypes = {
    t: PropTypes.func
}

export default AdminProfilePassword;

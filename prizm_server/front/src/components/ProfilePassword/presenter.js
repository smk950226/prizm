import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MyLoader from '../Loader';

const ProfilePassword = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{context.t("Profile")}</p>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("Current password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"currentPassword"} value={props.currentPassword} onChange={props.handleInputChange} />
        </div>
        <div className={`${styles.row} ${styles.mx0} ${styles.mt4} ${styles.flexNowrap}`}>
            <p className={`${styles.fontBold} ${styles.font10}`} style={{wordBreak: 'keep-all', minWidth: 75}}>
                {context.t("New password")}
            </p>
            <p className={`${styles.fontNormal} ${styles.font8} ${styles.pink} ${styles.ml2}`}>
                {context.t("At least 8 characters long and should include a mix of alphabets and numbers.")}
            </p>
        </div>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={props.password} onChange={props.handleInputChange} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Confirm your new password")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"password"} name={"password2"} value={props.password2} onChange={props.handleInputChange} />
        </div>
        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Change Password")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goProfile}>{context.t("Do you want to change your profile?")}</p>
        {props.isSubmitting && (
            <MyLoader />
        )}
    </div>
)

ProfilePassword.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    currentPassword: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    passwordForm: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goProfile: PropTypes.func.isRequired
}

ProfilePassword.contextTypes = {
    t: PropTypes.func
}

export default ProfilePassword;

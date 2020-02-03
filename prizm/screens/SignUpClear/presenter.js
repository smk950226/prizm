import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const SignUpClear = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.mt3} ${styles.mtMd5}`}>
            <p className={`${styles.fontExtraBold} ${styles.font1416} ${styles.textCenter}`}>{context.t("Thanks for signing up!")}</p>
            <div className={`${styles.mt2} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                <img src={require('../../assets/images/email_verifing.png')} width={'60%'} className={`${styles.imgVerifing}`} />
            </div>
            <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`} style={{lineHeight: 1.5}}>
                {context.t("We sent a ")}
                <span className={`${styles.pink}`}>{context.t("verification email ")}</span>
                {context.t("to the following address :")}
            </p>
            <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`} style={{lineHeight: 1.5}}>
                {props.profile.email}
            </p>
            <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`} style={{lineHeight: 1.5}}>
                <span className={`${styles.pink}`}>{context.t("Please verify yourself by clicking the link attached in the email. ")}</span>
                {context.t("When you complete the email verification, you will be able to freely make reservations.")}
            </p>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.justifyContentMdCenter} ${styles.mt5}`}>
                <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mxMd3} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity07 : null}`} style={{height: 48}} onClick={props.send}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Resend")}</p>
                </div>
                <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mxMd3} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Main")}</p>
                </div>
            </div>
        </div>
    </div>
)

SignUpClear.propTypes = {
    goHome: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
}

SignUpClear.contextTypes = {
    t: PropTypes.func
}

export default SignUpClear;

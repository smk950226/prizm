import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const ProfileMenu = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer}`}>
        <p className={`${styles.fontBold} ${styles.font20} ${styles.px3}`} style={{marginTop: 80}}>{props.isLoggedIn ? props.profile ? props.profile.name : context.t("Sign In to view your profile") : context.t("Sign In to view your profile")}</p>
        {props.isLoggedIn ? (
            <Fragment>
                <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt5} ${styles.cursorPointer}`}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{context.t("Profile")}</p>
                </div>
                <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={props.goMySchedule}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{context.t("My Schedule")}</p>
                </div>
                <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{context.t("My Photos")}</p>
                </div>
                <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{context.t("Terms of Use")}</p>
                </div>
                <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{context.t("Privacy Policy")}</p>
                </div>
                <div className={`${styles.py3} ${styles.cursorPointer}`} onClick={props.logout}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{context.t("Log Out")}</p>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt5} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} onClick={props.goSignUp}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.pl3} ${styles.mr2}`}>{context.t("Sign Up")}</p>
                    <img src={require('../../assets/images/icon_arrow_right.png')} alt={context.t("Sign Up")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={props.goSignUp} />
                </div>
                <div className={`${styles.py3} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} onClick={props.goMySchedule} onClick={props.goSignIn}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.pl3} ${styles.mr2}`}>{context.t("Sign In")}</p>
                    <img src={require('../../assets/images/icon_arrow_right.png')} alt={context.t("Sign In")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={props.goSignIn} />
                </div>
            </Fragment>
        )}
    </div>
)

ProfileMenu.propTypes = {
    profile: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    goMySchedule: PropTypes.func.isRequired,
    goSignIn: PropTypes.func.isRequired,
    goSignUp: PropTypes.func.isRequired,
}

ProfileMenu.contextTypes = {
    t: PropTypes.func
}

export default ProfileMenu
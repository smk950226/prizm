import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

class ProfileMenu extends Component{
    static propTypes = {
        profile: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        goMySchedule: PropTypes.func.isRequired,
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        goMyPhotos:  PropTypes.func.isRequired,
        goTerms: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { notification, isLoggedIn, profile } = this.props;
        let totalNotification = 0
        let showNotification = {}
        if(notification && notification.length > 0){
            notification.map(noti => {
                if(!noti.is_checked){
                    totalNotification += 1
                    return null
                }
                else{
                    return null
                }
            })
            showNotification = notification.find(noti => noti.is_checked === false)
        }
        return(
            <div className={`${styles.safearea} ${styles.containerCustomer}`}>
                <p className={`${styles.fontBold} ${styles.font20} ${styles.px3} ${styles.mt45}`}>{isLoggedIn ? profile ? profile.name : this.context.t("Sign In to view your profile") : this.context.t("Sign In to view your profile")}</p>
                {isLoggedIn ? (
                    <Fragment>
                        <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt45} ${styles.cursorPointer}`} onClick={this.props.goProfile}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{this.context.t("Profile")}</p>
                        </div>
                        <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{this.context.t("My Schedule")}</p>
                        </div>
                        {(isLoggedIn && (notification) && (showNotification.id > 0)) && (
                            <div className={`${styles.py3} ${styles.px3} ${styles.bgPink} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>
                                {showNotification.notification_type === 'request_confirm' && (
                                    <Fragment>
                                        <p className={`${styles.font12} ${styles.white}`}>{`You have ${totalNotification} confirmed ${totalNotification > 1 ? `reservations!` : `reservation!`}`}</p>
                                        <p className={`${styles.fontBold} ${styles.font11} ${styles.white} ${styles.mt2} ${styles.cursorPointer}`}>{this.context.t("Add Payment Details")}</p>
                                    </Fragment>
                                )}
                            </div>
                        )}
                        <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={this.props.goMyPhotos}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{this.context.t("My Photos")}</p>
                        </div>
                        <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Terms of Use")}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{this.context.t("Terms of Use")}</p>
                        </div>
                        <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Privacy Policy")}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{this.context.t("Privacy Policy")}</p>
                        </div>
                        <div className={`${styles.py3} ${styles.cursorPointer}`} onClick={this.props.logout}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.px3}`}>{this.context.t("Log Out")}</p>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt5} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} onClick={this.props.goSignUp}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.pl3} ${styles.mr2}`}>{this.context.t("Sign Up")}</p>
                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Sign Up")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goSignUp} />
                        </div>
                        <div className={`${styles.py3} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} onClick={this.props.goSignIn}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.pl3} ${styles.mr2}`}>{this.context.t("Sign In")}</p>
                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Sign In")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goSignIn} />
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

export default ProfileMenu
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { slide as Slide } from 'react-burger-menu';

class Navigation extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        pageType: PropTypes.string.isRequired,
        showMenu: PropTypes.bool.isRequired,
        openMenu: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        handleShowMenu: PropTypes.func.isRequired,
        notification: PropTypes.array,
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goMySchedule: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        showNav: PropTypes.bool.isRequired,
        goTerms: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { showMenu, openMenu, handleShowMenu, profile, isLoggedIn, notification, showNav } = this.props;
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
        if(showNav){
            return(
                <Fragment>
                <div className={`${styles.positionNav} ${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2}}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={openMenu} />
                        </div>
                        <div className={`${styles.col10} ${styles.px0}`}>
                            <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font16} ${styles.cursorPointer}`} onClick={this.props.goHome}>{this.context.t("PRIZM")}</p>
                        </div>
                    </div>
                    <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                        <p className={`${styles.textCenter} ${styles.font10}`}>{this.context.t("a whole new photography experience")}</p>
                    </div>
                </div>
                <Slide 
                isOpen={showMenu} 
                customBurgerIcon={false} 
                customCrossIcon={false} 
                width={258}
                onStateChange={handleShowMenu}
                disableAutoFocus={true}
                className={`${styles.bgWhite}`}
                >
                    <div>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignContentBetween} ${styles.bgWhite} ${styles.minHeightFull} ${styles.px3} ${styles.outlineNone} ${styles.py5}`} style={{zIndex: 3, position: 'relative'}}>
                            <div className={`${styles.col12} ${styles.px0}`}>
                                <p className={`${styles.font17} ${styles.mb1}`} style={{lineHeight: 1.35}}>
                                    {this.context.t("Welcome Back,")}<br/>
                                    {isLoggedIn ? profile? profile.name : 'Anonymous' : 'Anonymous'}
                                </p>
                                {isLoggedIn ? (
                                    <Fragment>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt5}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goProfile}>{this.context.t("Profile")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Profile")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goProfile} />
                                        </div>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>{this.context.t("My schedule")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("My schedule")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goMySchedule} />
                                        </div>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`}>{this.context.t("My Photos")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("My Photos")} className={`${styles.iconArrow} ${styles.cursorPointer}`} />
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt5}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goSignUp}>{this.context.t("Sign Up")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Sign Up")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goSignUp} />
                                        </div>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goSignIn}>{this.context.t("Sign In")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Sign In")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goSignIn} />
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                            <div className={`${styles.col12} ${styles.px0}`}>
                                <p className={`${styles.fontBold} ${styles.font12} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Terms of Use")}>{this.context.t("Terms of Use")}</p>
                                <p className={`${styles.fontBold} ${styles.font12} ${styles.cursorPointer} ${styles.mt2}`} onClick={() => this.props.goTerms("Privacy Policy")}>{this.context.t("Privacy Policy")}</p>
                                {isLoggedIn && (
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.cursorPointer} ${styles.mt2}`} onClick={this.props.logout}>{this.context.t("Log Out")}</p>
                                )}
                            </div>
                            {(isLoggedIn && (notification) && (showNotification.id > 0)) && (
                                <div className={`${styles.absoluteVerticalCenter} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>
                                    {showNotification.notification_type === 'request_confirm' && (
                                        <Fragment>
                                            <p className={`${styles.font12}`}>{`You have ${totalNotification} confirmed ${totalNotification > 1 ? `reservations!` : `reservation!`}`}</p>
                                            <p className={`${styles.fontBold} ${styles.font11} ${styles.pink} ${styles.mt2} ${styles.cursorPointer}`}>{this.context.t("Add Payment Details")}</p>
                                        </Fragment>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Slide>
                </Fragment>
            )
        }
        else{
            return null
        }
    }
}

export default Navigation;

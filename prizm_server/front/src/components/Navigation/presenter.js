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
        goTerms: PropTypes.func.isRequired,
        goMyPhotos: PropTypes.func.isRequired,
        goDescription: PropTypes.func.isRequired,
        now: PropTypes.number.isRequired,
        changeLang: PropTypes.func.isRequired,
        lang: PropTypes.string.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { showMenu, openMenu, handleShowMenu, profile, isLoggedIn, notification, showNav, now, lang } = this.props;
        let confirmNotification = 0
        let cancelNotification = 0
        let showNotification = {}
        if(notification && notification.length > 0){
            notification.map(noti => {
                if(!noti.is_checked){
                    if(noti.notification_type === 'request_confirm'){
                        confirmNotification += 1
                        return null
                    }
                    if(noti.notification_type === 'request_cancel'){
                        cancelNotification += 1
                        return null
                    }
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
                <div className={`${styles.positionNav} ${styles.widthFull} ${styles.py3} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2}}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <div className={`${styles.col4} ${styles.colSm2} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={openMenu} />
                        </div>
                        <div className={`${styles.col4} ${styles.colSm8} ${styles.px0}`}>
                            {!(this.props.pathname === '/artist/') && (
                                <p className={`${styles.textCenter} ${styles.fontExtraBold} ${styles.font1720} ${styles.cursorPointer}`} onClick={this.props.goHome}>{this.context.t("PRIZM")}</p>
                            )}
                        </div>
                        <div className={`${styles.col4} ${styles.colSm2} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                            {lang === 'en' ? (
                                <p className={`${styles.font1214} ${styles.gray8e} ${styles.cursorPointer}`} onClick={() => this.props.changeLang('kr')}>한국어</p>
                            ) : (
                                <p className={`${styles.font1214} ${styles.gray8e} ${styles.cursorPointer}`} onClick={() => this.props.changeLang('en')}>English</p>
                            )}
                        </div>
                    </div>
                    {/* <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                        <p className={`${styles.textCenter} ${styles.font10}`}>
                            {this.context.t("Meet the best photographers in Seoul")}<br/>
                            {this.context.t("Enrich your trip with photography")}
                        </p>
                    </div> */}
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
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignContentBetween} ${styles.bgWhite} ${styles.outlineNone}`} style={{zIndex: 3, position: 'relative', minHeight: 568, maxHeight: 640}}>
                                <div className={`${styles.col12} ${styles.px3} ${styles.mt45} ${styles.pyMd5}`}>
                                    {isLoggedIn ? profile? (
                                        <p className={`${styles.font16} ${styles.fontBold}`} style={{lineHeight: 1.35}}>
                                            {((now>=6) && (now<12)) && (
                                                this.context.t("Good morning,")
                                            )}
                                            {((now>=12) && (now<18)) && (
                                                this.context.t("Good afternoon,")
                                            )}
                                            {((now>=18) && (now<22)) && (
                                                this.context.t("Good evening,")
                                            )}
                                            {((now>=22) || (now<6)) && (
                                                this.context.t("Good night,")
                                            )}
                                            {` ${profile.first_name} ${profile.last_name}`}
                                        </p>
                                    ) : (
                                        <Fragment>
                                        <p className={`${styles.font16} ${styles.fontBold}`} style={{lineHeight: 1.35}}>
                                            {this.context.t("Welcome to ")}<span className={`${styles.fontBold}`}>{this.context.t("PRIZM!")}</span>
                                        </p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${styles.bgPink}`} style={{height: 32, width: 180}}>
                                            <p className={`${styles.font14} ${styles.mr2} ${styles.cursorPointer} ${styles.white}`} onClick={this.props.goSignIn}>{this.context.t("Sign Up / Sign In")}</p>
                                        </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                        <p className={`${styles.font16} ${styles.fontBold}`} style={{lineHeight: 1.35}}>
                                            {this.context.t("Welcome to ")}<span className={`${styles.fontBold}`}>{this.context.t("PRIZM!")}</span>
                                        </p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3} ${styles.btn} ${styles.bgPink}`} style={{height: 32, width: 180}}>
                                            <p className={`${styles.font14} ${styles.mr2} ${styles.cursorPointer} ${styles.white}`} onClick={this.props.goSignIn}>{this.context.t("Sign Up / Sign In")}</p>
                                        </div>
                                        </Fragment>
                                )}
                            </div>
                            {isLoggedIn ? (
                                <div className={`${styles.col12} ${styles.px3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <p className={`${styles.fontExtraBold} ${styles.font17} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goProfile}>{this.context.t("Profile")}</p>
                                    </div>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} style={{marginTop: 20}}>
                                        <p className={`${styles.fontExtraBold} ${styles.font17} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>{this.context.t("My schedule")}</p>
                                    </div>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`} style={{marginTop: 20}}>
                                        <p className={`${styles.fontExtraBold} ${styles.font17} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goMyPhotos}>{this.context.t("My Photos")}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={`${styles.col12} ${styles.px3}`}>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold}`} onClick={() => this.props.goDescription('about')}>{this.context.t("About PRIZM")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('why')}>{this.context.t("Why PRIZM")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('how')}>{this.context.t("How it works")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('support')}>{this.context.t("Support")}</p>
                                    
                                </div>
                            )}
                            {isLoggedIn ? (
                                <div className={`${styles.col12} ${styles.px3}`}>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold}`} onClick={() => this.props.goDescription('about')}>{this.context.t("About PRIZM")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('why')}>{this.context.t("Why PRIZM")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('how')}>{this.context.t("How it works")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.fontBold} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('support')}>{this.context.t("Support")}</p>
                                </div>
                            ) : (
                                null
                            )}
                            {isLoggedIn ? (
                                <div className={`${styles.px3} ${styles.mb45}`}>
                                     <p className={`${styles.pink} ${styles.font16} ${styles.fontBold} ${styles.cursorPointer}`} onClick={this.props.logout}>{this.context.t("Sign Out")}</p>
                                </div>
                            ) : (
                                <div className={`${styles.px3} ${styles.mb45}`}>
                                     <a href={'https://admin.prizm.cloud'} className={`${styles.textDecorationNone}`}>
                                        <p className={`${styles.pink} ${styles.font16} ${styles.fontBold} ${styles.cursorPointer} ${styles.mt4}`}>{this.context.t("Are you a photographer?")}</p>
                                    </a>
                                    <img src={require('../../assets/images/main.png')} alt={this.context.t("PRIZM")} className={`${styles.mbMd5}`} style={{width: 150, height: 107}} />
                                </div>
                            )}
                            
                            {/* <img src={require('../../assets/images/main.png')} alt={this.context.t("PRIZM")} className={`${styles.mb3} ${styles.mbMd5}`} style={{width: 150, height: 107}} /> */}
                            {/* {(isLoggedIn && (notification) && (showNotification) && (showNotification.id > 0)) && (
                                <div className={`${styles.absoluteVerticalCenter} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>
                                    {confirmNotification > 0 && (
                                        <Fragment>
                                            <p className={`${styles.font12}`}>{`You have ${confirmNotification} confirmed ${confirmNotification > 1 ? `reservations!` : `reservation!`}`}</p>
                                            <p className={`${styles.fontBold} ${styles.font11} ${styles.pink} ${styles.mt2} ${styles.cursorPointer}`}>{this.context.t("Add Payment Details")}</p>
                                        </Fragment>
                                    )}
                                    {cancelNotification > 0 && (
                                        <div className={`${confirmNotification > 0 ? styles.mt2 : null}`}>
                                            <p className={`${styles.font12}`}>{`You have ${cancelNotification} declined ${cancelNotification > 1 ? `reservations!` : `reservation!`}`}</p>
                                            <p className={`${styles.fontBold} ${styles.font11} ${styles.pink} ${styles.mt2} ${styles.cursorPointer}`}>{this.context.t("Please make another reservation.")}</p>
                                        </div>
                                    )}
                                </div>
                            )} */}
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

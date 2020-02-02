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
        goProfileMenu: PropTypes.func.isRequired,
        showNav: PropTypes.bool.isRequired,
        goTerms: PropTypes.func.isRequired,
        goMyPhotos: PropTypes.func.isRequired,
        goDescription: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { showMenu, openMenu, handleShowMenu, profile, isLoggedIn, notification, showNav } = this.props;
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
                <div className={`${styles.positionNav} ${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2}}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                            <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={openMenu} />
                        </div>
                        <div className={`${styles.col10} ${styles.px0}`}>
                            <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font20} ${styles.cursorPointer}`} onClick={this.props.goHome}>{this.context.t("PRIZM")}</p>
                        </div>
                    </div>
                    {/* <div className={`${styles.widthFull} ${styles.positionNavDescription}`}>
                        <p className={`${styles.textCenter} ${styles.font10}`}>
                            {this.context.t("Meet the best photographers in New York")}<br/>
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
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignContentBetween} ${styles.bgWhite} ${styles.minHeightFull} ${styles.outlineNone}`} style={{zIndex: 3, position: 'relative'}}>
                            <div className={`${styles.col12} ${styles.px0}`}>
                                <div className={`${styles.px3} ${styles.py3} ${styles.pyMd5} ${styles.bgNavBlue}`}>
                                    <p className={`${styles.font20} ${styles.mb1}`} style={{lineHeight: 1.35}}>
                                        {this.context.t("Welcome to ")}<span className={`${styles.fontBold}`}>{this.context.t("PRIZM!")}</span><br/>
                                        {isLoggedIn ? profile? (
                                            null
                                        ) : (
                                            <p className={`${styles.font14} ${styles.mt3}`}>
                                                {this.context.t("Sign in to find the coolest photographers in ")}<span className={`${styles.fontBold}`}>{this.context.t("Seoul.")}</span><br/><br/>
                                                {this.context.t("Book your photographer without hassle.")}
                                            </p>
                                        ) : (
                                            <p className={`${styles.font14} ${styles.mt3}`}>
                                                {this.context.t("Sign in to find the coolest photographers in ")}<span className={`${styles.fontBold}`}>{this.context.t("Seoul.")}</span><br/><br/>
                                                {this.context.t("Book your photographer without hassle.")}
                                            </p>
                                        )}
                                    </p>
                                </div>
                                {isLoggedIn ? (
                                    <div className={`${styles.px3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goProfileMenu}>{this.context.t("Profile")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Profile")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goProfileMenu} />
                                        </div>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>{this.context.t("My schedule")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("My schedule")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goMySchedule} />
                                        </div>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goMyPhotos}>{this.context.t("My Photos")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("My Photos")} className={`${styles.iconArrow} ${styles.cursorPointer}`} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`${styles.px3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goSignUp}>{this.context.t("Sign Up")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Sign Up")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goSignUp} />
                                        </div>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                                            <p className={`${styles.fontBold} ${styles.font16} ${styles.mr2} ${styles.cursorPointer}`} onClick={this.props.goSignIn}>{this.context.t("Sign In")}</p>
                                            <img src={require('../../assets/images/icon_arrow_right.png')} alt={this.context.t("Sign In")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={this.props.goSignIn} />
                                        </div>
                                    </div>
                                )}
                                <div className={`${styles.mt3} ${styles.mtMd5} ${styles.px3}`}>
                                    <p className={`${styles.font1416} ${styles.cursorPointer}`} onClick={() => this.props.goDescription('about')}>{this.context.t("About PRIZM")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('why')}>{this.context.t("Why PRIZM")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('how')}>{this.context.t("How it works")}</p>
                                    <p className={`${styles.font1416} ${styles.cursorPointer} ${styles.mt3} ${styles.mtMd4}`} onClick={() => this.props.goDescription('support')}>{this.context.t("Support")}</p>
                                    <a href={'https://admin.prizm.cloud'} className={`${styles.textDecorationNone}`}>
                                        <p className={`${styles.navBrown} ${styles.font16} ${styles.cursorPointer} ${styles.mt4}`}>{this.context.t("Are you a photographer?")}</p>
                                    </a>
                                </div>
                            </div>
                            <img src={require('../../assets/images/main.png')} alt={this.context.t("PRIZM")} className={`${styles.mb3} ${styles.mbMd5}`} style={{width: 150, height: 107}} />
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

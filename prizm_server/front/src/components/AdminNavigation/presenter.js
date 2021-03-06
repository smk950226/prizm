import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { slide as Slide } from 'react-burger-menu';
import styled from 'styled-components';

const ProfileDiv = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;

    @media (min-width: 1440px){
        width: 64px;
        height: 64px;
        border-radius: 32px;
    }
    
`

class AdminNavigation extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        goMenu: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
        openMobile: PropTypes.func.isRequired,
        showMobile: PropTypes.bool.isRequired,
        showLocationModal: PropTypes.bool.isRequired,
        showOptionModal: PropTypes.bool.isRequired,
        openMenu: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        showMenu: PropTypes.bool.isRequired,
        handleShowMenu: PropTypes.func.isRequired,
        photographer: PropTypes.object,
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        goTouristPhoto: PropTypes.func.isRequired,
        goStudioSetting: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        goAccount: PropTypes.func.isRequired,
        showNav: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        goMessage: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { showNav, isLoggedIn, pathname, openMobile, showMobile, showLocationModal, showOptionModal, showMenu, handleShowMenu, photographer } = this.props;
        return(
            <Fragment>
            {!showMobile && !showLocationModal && !showOptionModal && showNav && (
                <div className={`${styles.positionNav} ${styles.containerAdmin} ${styles.pxAdmin2} ${styles.bgWhite}`} style={{zIndex: 2}}>
                    <div className={`${styles.mobileOnly}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py3} ${styles.bgWhite}`}>
                            <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                {isLoggedIn && (
                                    <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={showMenu ? this.props.closeMenu : this.props.openMenu} />
                                )}
                            </div>
                            <div className={`${styles.col10} ${styles.px0}`}>
                                <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font171315} ${styles.cursorPointer}`} onClick={this.props.goHome}>{this.context.t("PRIZM")}</p>
                            </div>
                            <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                {pathname === '/studio/edit/' && (
                                    <img src={require('../../assets/images/icon_mobile.png')} alt={this.context.t("Mobile")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={openMobile} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.mobileNone}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.bgWhite}`}>
                            <div className={`${styles.py3}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.widthFull}`}>
                                    <p className={`${styles.fontBold} ${styles.font171315} ${styles.cursorPointer} ${styles.mr3} ${styles.mrLg5}`} onClick={this.props.goHome}>{this.context.t("PRIZM")}</p>
                                    {isLoggedIn && (
                                        <Fragment>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.cursorPointer} ${styles.ml4} ${styles.mlLg5} ${pathname === '/studio/edit/' ? styles.pink : null}`} onClick={this.props.goStudioSetting}>{this.context.t("Edit Studio")}</p>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.cursorPointer} ${styles.ml4} ${pathname === '/reservation/' ? styles.pink : null}`} onClick={this.props.goReservation}>{this.context.t("Manage Reservations")}</p>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.cursorPointer} ${styles.ml4} ${pathname.indexOf('/message/') > -1 ? styles.pink : null}`} onClick={this.props.goMessage}>{this.context.t("Messages")}</p>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.cursorPointer} ${styles.ml4} ${pathname === '/profile/' ? styles.pink : null}`} onClick={this.props.goProfile}>{this.context.t("Profile")}</p>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.cursorPointer} ${styles.ml4} ${pathname === '/profile/account/' ? styles.pink : null}`} onClick={this.props.goAccount}>{this.context.t("Payout")}</p>
                                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.cursorPointer} ${styles.ml4}`} onClick={this.props.logout}>{this.context.t("Logout")}</p>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${styles.mobileOnly}`}>
                {isLoggedIn && (
                    <Slide 
                    isOpen={showMenu} 
                    customBurgerIcon={false} 
                    customCrossIcon={false} 
                    width={'100%'}
                    onStateChange={handleShowMenu}
                    disableAutoFocus={true}
                    className={`${styles.bgWhite}`}
                    >
                        <Fragment>
                        <div className={`${styles.containerAdmin} ${styles.pxAdmin2}`} style={{zIndex: 2}}>
                            <div className={`${styles.mobileOnly}`}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py4} ${styles.bgWhite}`}>
                                    <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        {isLoggedIn && (
                                            <img src={require('../../assets/images/icon_arrow_left.png')} alt={this.context.t("MENU")} className={`${styles.iconArrow} ${styles.cursorPointer}`} onClick={showMenu ? this.props.closeMenu : this.props.openMenu} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.containerAdmin} ${styles.minHeightFull} ${styles.pxAdmin}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt4} ${photographer ? photographer.id ? null : styles.hidden : styles.hidden}`}>
                                <ProfileDiv image={photographer ? photographer.profile_image : null} />
                                <div className={`${styles.ml3}`}>
                                    <p className={`${styles.fontBold} ${styles.font2024}`}>{photographer ? photographer.nickname : ""}</p>
                                    {photographer ? (
                                        <a href={`https://prizm.cloud/${photographer.studio_id}`} target={'_blank'} className={`${styles.textDecorationNone} ${styles.urlBlue} ${styles.fontBold} ${styles.font1416} ${styles.mt2}`}>{`prizm.cloud/${photographer.studio_id}`}</a>
                                    ) : (
                                        <a href={`https://prizm.cloud/`} target={'_blank'} className={`${styles.textDecorationNone} ${styles.urlBlue} ${styles.fontBold} ${styles.font1416} ${styles.mt2}`}>{`prizm.cloud/<Your studio URL>`}</a>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className={`${styles.fontBold} ${styles.font1620} ${styles.pink} ${styles.cursorPointer}`} style={{marginTop: 100}} onClick={this.props.goStudioSetting}>{this.context.t("Edit Studio")}</p>
                                <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt45}`} onClick={this.props.goReservation}>{this.context.t("Manage Reservations")}</p>
                                <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt3}`} onClick={this.props.goTouristPhoto}>{this.context.t("Tourist Photos")}</p>
                                <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt5}`} onClick={this.props.goProfile}>{this.context.t("Profile Settings")}</p>
                                <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt3}`} onClick={this.props.goAccount}>{this.context.t("Account Settings")}</p>
                                <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt3}`} onClick={this.props.logout}>{this.context.t("Log out")}</p>
                            </div>
                        </div>
                        </Fragment>
                    </Slide>
                )}
            </div>
            </Fragment>
        )
    }
}

export default AdminNavigation;

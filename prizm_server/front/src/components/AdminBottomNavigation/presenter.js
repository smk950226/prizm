import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

class AdminBottomNavigation extends Component{
    static propTypes = {
        goReservation: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        pageType: PropTypes.string.isRequired,
        showBtmNav: PropTypes.bool.isRequired,
        goStudioSetting: PropTypes.func.isRequired,
        goSettings: PropTypes.func.isRequired,
        goMessage: PropTypes.func.isRequired,
        showNav: PropTypes.bool.isRequired,
        newMessage: PropTypes.bool
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { showNav, showBtmNav, newMessage } = this.props;
        if(showNav){
            return(
                <div className={`${styles.mobileOnly}`}>
                    <div className={`${styles.positionBtmNav} ${styles.widthFull} ${styles.bgWhite} ${showBtmNav ? null : styles.hide} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{zIndex: 2}}>
                        <div className={`${styles.containerCustomer} ${styles.widthFull} ${styles.px4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 48}}>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/icon_grid.png')} alt={this.context.t("STUDIO")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goStudioSetting} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`} onClick={this.props.goStudioSetting}>{this.context.t("Edit Studio")}</p>
                            </div>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/icon_reservation.png')} alt={this.context.t("RESERVATION")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goReservation} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`} onClick={this.props.goReservation}>{this.context.t("Reservations")}</p>
                            </div>
                            <div className={`${styles.textCenter}`} style={{position: 'relative'}}>
                                <img src={require('../../assets/images/icon_message.png')} alt={this.context.t("MESSAGE")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goMessage} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`}>{this.context.t("Messages")}</p>
                                {newMessage && (
                                    <div className={`${styles.circle8} ${styles.bgRed}`} style={{position: 'absolute', top: 2, right: 8}} />
                                )}
                            </div>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/icon_profile.png')} alt={this.context.t("PROFILE")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goSettings} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`} onClick={this.props.goSettings}>{this.context.t("Settings")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return null
        }
    }
}

export default AdminBottomNavigation;

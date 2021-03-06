import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

class Navigation extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        pageType: PropTypes.string.isRequired,
        showBtmNav: PropTypes.bool.isRequired,
        goMySchedule: PropTypes.func.isRequired,
        goCustomRequest: PropTypes.func.isRequired,
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
                <Fragment>
                    <div className={`${styles.positionBtmNav} ${styles.navShadow} ${styles.widthFull} ${styles.bgWhite} ${showBtmNav ? null : styles.hide} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{zIndex: 2}}>
                        <div className={`${styles.containerCustomer} ${styles.widthFull} ${styles.px4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 48}}>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/icon_request.png')} alt={this.context.t("Custom")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goCustomRequest} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer} ${styles.fontBold}`} style={{marginTop: -4}} onClick={this.props.goCustomRequest}>{this.context.t("Custom")}</p>
                            </div>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/icon_artist.png')} alt={this.context.t("Photographers")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goHome} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer} ${styles.fontBold}`} style={{marginTop: -4}} onClick={this.props.goHome}>{this.context.t("Photographers")}</p>
                            </div>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/icon_reservation.png')} alt={this.context.t("RESERVATION")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goMySchedule} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer} ${styles.fontBold}`} style={{marginTop: -4}} onClick={this.props.goMySchedule}>{this.context.t("Reservations")}</p>
                            </div>
                            <div className={`${styles.textCenter}`} style={{position: 'relative'}}>
                                <img src={require('../../assets/images/icon_message.png')} alt={this.context.t("MESSAGE")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goMessage} />
                                <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer} ${styles.fontBold}`} style={{marginTop: -4}}>{this.context.t("Messages")}</p>
                                {newMessage && (
                                    <div className={`${styles.circle8} ${styles.bgRed}`} style={{position: 'absolute', top: 2, right: 8}} />
                                )}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        else{
            return null
        }
    }
}

export default Navigation;

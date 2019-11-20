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
        goProfileMenu: PropTypes.func.isRequired,
        goMessage: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { isLoggedIn,pageType, showBtmNav } = this.props;
        return(
            <Fragment>
                <div className={`${styles.positionBtmNav} ${styles.widthFull} ${styles.bgWhite} ${showBtmNav ? null : styles.hide} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{zIndex: 2}}>
                    <div className={`${styles.containerCustomer} ${styles.widthFull} ${styles.px4} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 48}}>
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/icon_artist.png')} alt={this.context.t("ARTIST")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goHome} />
                            <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`} onClick={this.props.goHome}>{this.context.t("Artist")}</p>
                        </div>
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/icon_reservation.png')} alt={this.context.t("RESERVATION")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goMySchedule} />
                            <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`} onClick={this.props.goMySchedule}>{this.context.t("Reservations")}</p>
                        </div>
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/icon_message.png')} alt={this.context.t("MESSAGE")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goMessage} />
                            <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`}>{this.context.t("Messages")}</p>
                        </div>
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/icon_profile.png')} alt={this.context.t("PROFILE")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={this.props.goProfileMenu} />
                            <p className={`${styles.font9} ${styles.textCenter} ${styles.cursorPointer}`} onClick={this.props.goProfileMenu}>{this.context.t("Profile")}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Navigation;

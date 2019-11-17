import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

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
        showLocationModal: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { goMenu, isLoggedIn, pathname, openMobile, showMobile, showLocationModal } = this.props;
        return(
            <Fragment>
            {!showMobile && !showLocationModal && (
                <div className={`${styles.positionNav} ${styles.containerAdmin} ${styles.pxAdmin2}`} style={{zIndex: 2}}>
                    <div className={`${styles.mobileOnly}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py4} ${styles.bgWhite}`}>
                            <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                {isLoggedIn && (
                                    <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={goMenu} />
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
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.containerAdminStudioSide} ${styles.bgWhite}`}>
                            <div className={`${styles.containerAdminToolboxSide} ${styles.py4}`}>
                                <div className={``}>
                                    <p className={`${styles.fontBold} ${styles.font171315} ${styles.cursorPointer}`} onClick={this.props.goHome}>{this.context.t("PRIZM")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </Fragment>
        )
    }
}

export default AdminNavigation;

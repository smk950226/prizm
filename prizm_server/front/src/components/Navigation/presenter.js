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
        handleShowMenu: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { logout, goHome, isLoggedIn, profile, pageType, showMenu, openMenu, closeMenu, handleShowMenu } = this.props;
        return(
            <Fragment>
            <div className={`${styles.positionNav} ${styles.widthFull} ${styles.py4} ${styles.bgWhite} ${styles.px3}`} style={{zIndex: 2}}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                    <div className={`${styles.col1} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                        <img src={require('../../assets/images/icon_menu.png')} alt={this.context.t("MENU")} className={`${styles.iconMenu} ${styles.cursorPointer}`} onClick={openMenu} />
                    </div>
                    <div className={`${styles.col10} ${styles.px0}`}>
                        <p className={`${styles.textCenter} ${styles.fontBold} ${styles.font16}`}>{this.context.t("PRIZM")}</p>
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
            >
                <div className={`${styles.bgWhite} ${styles.heightFull}`} style={{zIndex: 3}}>
                    hihi
                </div>
            </Slide>
            </Fragment>
        )
    }
}

export default Navigation;

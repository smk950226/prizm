import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styles from '../../style/styles.module.scss';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import Loader from 'react-loader-spinner';
import IosClose from 'react-ionicons/lib/IosClose';

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
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { logout, goHome, isLoggedIn, profile, pageType, showMenu, openMenu, closeMenu } = this.props;
        return(
            <div className={`${styles.widthFull} ${styles.py3} ${styles.bgWhite}`}>
                <p className={`${styles.textCenter} ${styles.fontExtraBold} ${styles.font16}`}>{this.context.t("PRIZM")}</p>
            </div>
        )
    }
}

export default Navigation;

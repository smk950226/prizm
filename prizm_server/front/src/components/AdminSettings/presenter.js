import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import OrderComp from '../OrderComp';
import AdminCustomerImage from '../AdminCustomerImage';
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

const AdminOrderList = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerAdmin} ${styles.pxAdmin2}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItmesCenter} ${styles.justifyContentBetween} ${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={props.goProfile}>
            <p className={`${styles.fontBold} ${styles.font1416}`}>{context.t("Profile Settings")}</p>
            <img src={require('../../assets/images/icon_right.png')} alt={context.t("Profile Settings")} className={`${styles.iconArrowRight}`} />
        </div>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItmesCenter} ${styles.justifyContentBetween} ${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={props.goAccount}>
            <p className={`${styles.fontBold} ${styles.font1416}`}>{context.t("Payout Settings")}</p>
            <img src={require('../../assets/images/icon_right.png')} alt={context.t("Payout Settings")} className={`${styles.iconArrowRight}`} />
        </div>
        {props.isLoggedIn && (
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItmesCenter} ${styles.justifyContentBetween} ${styles.borderBtmGrayDc} ${styles.py3} ${styles.cursorPointer}`} onClick={props.logout}>
                <p className={`${styles.fontBold} ${styles.font1416}`}>{context.t("Log Out")}</p>
                <img src={require('../../assets/images/icon_right.png')} alt={context.t("Log Out")} className={`${styles.iconArrowRight}`} />
            </div>
        )}
    </div>
)

AdminOrderList.propTypes = {
    goProfile: PropTypes.func.isRequired,
    goAccount: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
}

AdminOrderList.contextTypes = {
    t: PropTypes.func
}

export default AdminOrderList;
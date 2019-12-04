import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
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

const AdminMenu = (props, context) => (
    <div className={`${styles.safeareaAdmin} ${styles.containerAdmin} ${styles.minHeightFull} ${styles.pxAdmin}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt4} ${props.photographer.id ? null : styles.hidden}`}>
            <ProfileDiv image={props.photographer.profile_image} />
            <div className={`${styles.ml3}`}>
                <p className={`${styles.fontBold} ${styles.font2024}`}>{props.photographer.nickname}</p>
                <a href={`https://prizm.cloud/${props.photographer.studio_id}`} target={'_blank'} className={`${styles.textDecorationNone} ${styles.urlBlue} ${styles.fontBold} ${styles.font1416} ${styles.mt2}`}>{`prizm.cloud/${props.photographer.studio_id}`}</a>
            </div>
        </div>
        <div>
            <p className={`${styles.fontBold} ${styles.font1620} ${styles.pink} ${styles.cursorPointer}`} style={{marginTop: 100}} onClick={props.goStudioSetting}>{context.t("Edit Studio")}</p>
            <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt45}`} onClick={props.goReservation}>{context.t("Manage Reservations")}</p>
            <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt3}`} onClick={props.goTouristPhoto}>{context.t("Tourist Photos")}</p>
            <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt5}`} onClick={props.goProfile}>{context.t("Profile Settings")}</p>
            <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt3}`} onClick={props.goAccount}>{context.t("Account Settings")}</p>
            <p className={`${styles.fontBold} ${styles.font1620} ${styles.cursorPointer} ${styles.mt3}`} onClick={props.logout}>{context.t("Log out")}</p>
        </div>
    </div>
)

AdminMenu.propTypes = {
    goSignIn: PropTypes.func.isRequired,
    goSignUp: PropTypes.func.isRequired,
    goReservation: PropTypes.func.isRequired,
    goTouristPhoto: PropTypes.func.isRequired,
    photographer: PropTypes.object,
    logout: PropTypes.func.isRequired,
    goStudioSetting: PropTypes.func.isRequired,
    goProfile: PropTypes.func.isRequired,
    goAccount: PropTypes.func.isRequired
}

AdminMenu.contextTypes = {
    t: PropTypes.func
}

export default AdminMenu;
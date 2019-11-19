import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const AdminStudioSettingClear = (props, context) => (
    <div className={`${styles.safeareaAdminMobile} ${styles.containerAdmin} ${styles.minHeightFull}`}>
        <div className={`${styles.mobileOnly}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.pxAdmin} ${styles.heightFullSafearea}`} style={{position: 'relative'}}>
                <div>
                    <p className={`${styles.fontBold} ${styles.font2024}`}>{context.t("Registration Completed !")}</p>
                    <p className={`${styles.font1416} ${styles.mt1} ${styles.mtMd2}`}>{context.t("Check your PRIZM Studio at :")}</p>
                    <a href={`https://prizm.cloud/${props.studioId}/`} target={'_blank'} className={`${styles.textDecorationNone}`}>
                        <p className={`${styles.fontBold} ${styles.font1418} ${styles.mt3} ${styles.urlBlue}`}>{`prizm.cloud/${props.studioId}/`}</p>
                    </a>
                    <div className={`${styles.col12} ${styles.px0} ${styles.textCenter} ${styles.mobileOnly}`}>
                        <img src={require('../../assets/images/dummy.png')} alt={context.t("Complete")} className={`${styles.mt4} ${styles.mb4}`} style={{width: '100%'}} />
                    </div>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, marginTop: 70}} onClick={props.goHome}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Home")}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.mobileNone}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.pxAdmin} ${styles.heightFullSafearea}`} style={{position: 'relative'}}>
                <div className={`${styles.colMd8} ${styles.colLg6} ${styles.px0}`}>
                    <p className={`${styles.fontBold} ${styles.font2024}`}>{context.t("Registration Completed !")}</p>
                    <p className={`${styles.font1416} ${styles.mt1} ${styles.mtMd2}`}>{context.t("Check your PRIZM Studio at :")}</p>
                    <a href={`https://prizm.cloud/${props.studioId}/`} target={'_blank'} className={`${styles.textDecorationNone}`}>
                        <p className={`${styles.fontBold} ${styles.font1418} ${styles.mt3} ${styles.urlBlue}`}>{`prizm.cloud/${props.studioId}/`}</p>
                    </a>
                    <div className={`${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, marginTop: 70, width: 140}} onClick={props.goHome}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Home")}</p>
                    </div>
                </div>
                <div className={`${styles.colMd4} ${styles.colLg6} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd} ${styles.px0} ${styles.textCenter}`}>
                    <img src={require('../../assets/images/dummy.png')} alt={context.t("Complete")} className={`${styles.adminMainImage}`} />
                </div>
            </div>
        </div>
    </div>
)

AdminStudioSettingClear.propTypes = {
    studioId: PropTypes.string.isRequired,
    goHome: PropTypes.func.isRequired
}

AdminStudioSettingClear.contextTypes = {
    t: PropTypes.func
}

export default AdminStudioSettingClear;
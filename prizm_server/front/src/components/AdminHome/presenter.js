import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { FETCH_URL } from '../../config/urls';

const AdminHome = (props, context) => (
    <div className={`${styles.safeareaAdmin} ${styles.containerAdmin} ${styles.minHeightFull}`}>
        <div className={`${styles.mobileOnly}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.justifyContentCenter} ${styles.pxAdmin} ${styles.heightFullSafearea}`} style={{position: 'relative'}}>
                <div>
                    <div className={`${styles.col12} ${styles.px0} ${styles.textCenter} ${styles.mobileOnly}`}>
                        <img src={require('../../assets/images/main.png')} alt={context.t("Submitted")} className={`${styles.mb3}`} style={{width: '80%'}} />
                    </div>
                    <p className={`${styles.font2022} ${styles.fontBold}`} style={{lineHeight: 1.5}}>
                        {context.t(`The easiest way to create your mobile studio`)}
                    </p>
                    <p className={`${styles.font131416} ${styles.mtR45}`} style={{lineHeight: 1.3}}>
                        {context.t("Meet tourists from all over the world")}<br/>
                        {context.t("Receive payment worldwide")}<br/>
                        {context.t("Manage your reservations conveniently")}<br/>
                        {context.t("Connect with your instagram")}
                    </p>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.containerHalfBtn}`}>
                        <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goSignUp}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Get started")}</p>
                        </div>
                        <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goSignIn}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Login")}</p>
                        </div>
                    </div>
                    <a href={`${FETCH_URL}/api/common/proposal/?name=NewYork`} target={'_blank'} className={`${styles.textDecorationNone} ${styles.white}`}>
                        <div className={`${styles.widthFull} ${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Download Partnership Proposal")}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div className={`${styles.mobileNone}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.pxAdmin} ${styles.heightFullSafearea}`} style={{position: 'relative'}}>
                <div className={`${styles.colMd7} ${styles.colLg6} ${styles.px0}`}>
                    <p className={`${styles.font2022} ${styles.fontBold}`} style={{lineHeight: 1.5}}>
                        {context.t(`The easiest way to create your mobile studio`)}
                    </p>
                    <p className={`${styles.font131416} ${styles.mtR45}`} style={{lineHeight: 1.3}}>
                        {context.t("Meet tourists from all over the world")}<br/>
                        {context.t("Receive payment worldwide")}<br/>
                        {context.t("Manage your reservations conveniently")}<br/>
                        {context.t("Connect with your instagram")}
                    </p>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.containerHalfBtn}`}>
                        <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goSignUp}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Get started")}</p>
                        </div>
                        <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goSignIn}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Login")}</p>
                        </div>
                    </div>
                    <a href={`${FETCH_URL}/api/common/proposal/?name=NewYork`} target={'_blank'} className={`${styles.textDecorationNone} ${styles.white}`}>
                        <div className={`${styles.containerHalfBtn} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.bgPink} ${styles.btn} ${styles.mt3}`} style={{height: 48}}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Download Partnership Proposal")}</p>
                        </div>
                    </a>
                </div>
                <div className={`${styles.colMd5} ${styles.colLg6} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd} ${styles.px0} ${styles.textCenter}`}>
                    <img src={require('../../assets/images/main.png')} alt={context.t("Submitted")} className={`${styles.adminMainImage}`} />
                </div>
            </div>
        </div>
    </div>
)

AdminHome.propTypes = {
    goSignIn: PropTypes.func.isRequired,
    goSignUp: PropTypes.func.isRequired
}

AdminHome.contextTypes = {
    t: PropTypes.func
}

export default AdminHome;
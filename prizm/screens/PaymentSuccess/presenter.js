import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loader from 'react-loader-spinner';

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

const PaymentSuccess = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.minHeightFull}`}>
        {props.loading ? (
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            <div className={`${styles.row} ${styles.mx0} ${props.isDeposit ? null : styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.heightFullPercent} ${styles.px3}`} style={{position: 'relative'}}>
                <div className={`${props.isDeposit ? null : styles.textCenter}`}>
                    {props.isDeposit ? (
                        <Fragment>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("Your reservation has been successfully submitted!")}</p>
                            <p className={`${styles.font1214} ${styles.mt3}`}>
                                {context.t("Please use the following bank account to send ")}
                                {numberWithCommas(props.price)}
                                {context.t("KRW")}
                            </p>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`} style={{lineHeight: 1.5}}>
                                <p className={`${styles.font1214} ${styles.mr2}`}>{context.t('Account Number : IBK (Industrial Bank of Korea) 054-146700-04-018')}</p>
                                <CopyToClipboard text={'054-146700-04-018'}>
                                <div className={`${styles.borderRadiusRound} ${styles.bgCompleted} ${styles.px2} ${styles.py1} ${styles.textCenter} ${styles.cursorPointer}`}>
                                    <p className={`${styles.font10} ${styles.white}`}>{context.t("Copy")}</p>
                                </div>
                                </CopyToClipboard>
                            </div>
                            <p className={`${styles.font1214}`} style={{lineHeight: 1.5}}>{context.t('Account holder : EXPLABS')}</p>
                            <p className={`${styles.font1214} ${styles.completed}`} style={{lineHeight: 1.5}}>
                            {context.t("Payment Due : ")}
                            {context.t(`${props.deadline.getFullYear()}/${props.deadline.getMonth() + 1}/${props.deadline.getDate()} ${props.deadline.getHours()}:${props.deadline.getMinutes()}`)}
                            </p>
                            <p className={`${styles.font1012} ${styles.completed}`} style={{lineHeight: 1.5}}>{context.t("(Your reservation will be cancelled if you do not make payment by the payment due.)")}</p>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/signup_complete.png')} alt={context.t("Paid")} className={`${styles.mt3}`} style={{width: '80%', maxWidth: 400}} />
                            </div>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("Your payment will be transferred to the photographer only after you have completed the photo session. PRIZM will safely hold your payment until then.")}</p>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("Please refer to the Terms of Use for cancellation and refund polices.")}</p>
                            
                            <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Go back to the main page")}</p>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className={`${styles.font1214}`}>{context.t("Your payment has been successfully submitted!")}</p>
                            <img src={require('../../assets/images/signup_complete.png')} alt={context.t("Paid")} className={`${styles.mt3}`} style={{width: '80%', maxWidth: 400}} />
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("Payment will be transferred to your photographer only after you have completed the photo session and received photographs. Until then, your payment will be safely kept as a deposit.")}</p>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("For information regarding cancellation and refund policies, please refer to our Terms of Service.")}</p>
                            <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                                <p className={`${styles.font14} ${styles.white}`}>{context.t("Go back to the main page")}</p>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        )}
    </div>
)

PaymentSuccess.propTypes = {
    isDeposit: PropTypes.bool.isRequired,
    goHome: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    now: PropTypes.number,
    loading: PropTypes.bool.isRequired
}

PaymentSuccess.contextTypes = {
    t: PropTypes.func
}

export default PaymentSuccess;
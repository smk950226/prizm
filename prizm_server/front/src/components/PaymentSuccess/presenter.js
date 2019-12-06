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
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.minHeightFull}`}>
        {props.loading ? (
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            <div className={`${styles.row} ${styles.mx0} ${props.isDeposit ? null : styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.heightFullPercent} ${styles.px3}`} style={{position: 'relative'}}>
                <div className={`${props.isDeposit ? null : styles.textCenter}`}>
                    {props.isDeposit ? (
                        <Fragment>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("예약 신청이 완료되었습니다!")}</p>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t(`다음의 계좌번호로 ${numberWithCommas(props.price)}원을 송금해주세요.`)}</p>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                                <p className={`${styles.font1214} ${styles.mr2}`}>{context.t('계좌번호 : IBK기업은행 054-146700-04-018')}</p>
                                <CopyToClipboard text={'054-146700-04-018'}>
                                <div className={`${styles.borderRadiusRound} ${styles.bgCompleted} ${styles.px2} ${styles.py1} ${styles.textCenter} ${styles.cursorPointer}`}>
                                    <p className={`${styles.font10} ${styles.white}`}>{context.t("복사")}</p>
                                </div>
                                </CopyToClipboard>
                            </div>
                            <p className={`${styles.font1214}`}>{context.t('예금주명 : 이엑스피랩스')}</p>
                            <p className={`${styles.font1214} ${styles.completed}`}>{context.t(`입금기한 : ${props.deadline.getFullYear()}년 ${props.deadline.getMonth() + 1}월 ${props.deadline.getDate()}일 ${props.deadline.getHours()}:${props.deadline.getMinutes()} 까지`)}</p>
                            <p className={`${styles.font1012} ${styles.completed}`}>{context.t(`(입금기한 내 금액이 입금되지 않으면 예약이 자동으로 취소됩니다.)`)}</p>
                            <div className={`${styles.textCenter}`}>
                                <img src={require('../../assets/images/signup_complete.png')} alt={context.t("Paid")} className={`${styles.mt3}`} style={{width: '80%', maxWidth: 400}} />
                            </div>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("결제 금액은 사진촬영이 완료되고 사진을 수령하신 이후에만 사진작가에게 전달되며, 그 전까지는 PRIZM 팀이 안전하게 보관합니다.")}</p>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("취소 및 환불정책은 이용약관을 참고해주세요.")}</p>
                            
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Go back to the main page")}</p>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className={`${styles.font1214}`}>{context.t("Your payment has been successfully submitted!")}</p>
                            <img src={require('../../assets/images/signup_complete.png')} alt={context.t("Paid")} className={`${styles.mt3}`} style={{width: '80%', maxWidth: 400}} />
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("Payment will be transferred to your photographer only after you have completed the photo session and received photographs. Until then, your payment will be safely kept as a deposit.")}</p>
                            <p className={`${styles.font1214} ${styles.mt3}`}>{context.t("For information regarding cancellation and refund policies, please refer to our Terms of Service.")}</p>
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
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
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const PaymentSuccess = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.minHeightFull}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.heightFullPercent} ${styles.px3}`} style={{position: 'relative'}}>
            <div className={`${styles.textCenter}`}>
                <img src={require('../../assets/images/prizm_admin_main.png')} alt={context.t("Paid")} className={`${styles.mb4}`} style={{width: 200, heihgt: 160}} />
                <p className={`${styles.fontBold} ${styles.font14} ${styles.mt5}`}>{context.t("Your payment is succeed")}</p>
                {props.isDeposit && (
                    <p className={`${styles.font12} ${styles.mt5} ${styles.textCenter}`} style={{lineHeight: 1.25}}>
                        {context.t(`계좌번호`)}<br/>
                    </p>
                )}
                
                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Go to the main page")}</p>
                </div>
            </div>
        </div>
    </div>
)

PaymentSuccess.propTypes = {
    isDeposit: PropTypes.bool.isRequired,
    goHome: PropTypes.func.isRequired
}

PaymentSuccess.contextTypes = {
    t: PropTypes.func
}

export default PaymentSuccess;
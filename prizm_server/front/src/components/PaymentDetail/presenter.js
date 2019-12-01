import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const PaymentDetail = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
            <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{props.order.photographer.nickname}</p>
        </div>
        <p className={`${styles.font11} ${styles.mt2}`}>{props.order.photographer.main_location}</p>
        <p className={`${styles.fontBold} ${styles.font13} ${styles.mt4}`}>{context.t("Service&Pricing")}</p>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
            <div className={`${styles.col10} ${styles.colSm11} ${styles.px0}`}>
                <p className={`${styles.font14}`}>{`${props.order.option.title} (${props.order.option.person > 1 ? `${props.order.option.person} people` : `${props.order.option.person} person`}, ${props.order.option.hour > 1 ? `${props.order.option.hour} hrs` : `${props.order.option.hour} hr`})`}</p> 
            </div>
            <div className={`${styles.col2} ${styles.colSm1} ${styles.px0} ${styles.textRight}`}>
                <p className={`${styles.font14} ${styles.fontBold}`}>{`$${props.order.option.price}`}</p>
            </div>
        </div>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3} ${styles.borderBtmGrayDc} ${styles.pb3}`}>
            <div className={`${styles.col10} ${styles.colSm11} ${styles.px0}`}>
                <p className={`${styles.font14}`}>{`Service Fees (10%)`}</p> 
            </div>
            <div className={`${styles.col2} ${styles.colSm1} ${styles.px0} ${styles.textRight}`}>
                <p className={`${styles.font14} ${styles.fontBold}`}>{`$${Math.ceil(props.order.option.price*0.1)}`}</p>
            </div>
        </div>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
            <div className={`${styles.col10} ${styles.colSm11} ${styles.px0}`}>
                <p className={`${styles.font14}`}>{`Total`}</p> 
            </div>
            <div className={`${styles.col2} ${styles.colSm1} ${styles.px0} ${styles.textRight}`}>
                <p className={`${styles.font14} ${styles.fontBold}`}>{`$${props.order.option.price +  Math.ceil(props.order.option.price*0.1)}`}</p>
            </div>
        </div>
        {(props.order.user.country_number === '82') || (props.order.user.country_code === 'KR') && (
            <Fragment>
                <p className={`${styles.fontBold} ${styles.font10} ${styles.mt45}`}>{context.t("입금자명")}</p>
                <div className={`${styles.widthFull}`}>
                    <input className={`${styles.textInput2}`} type={"text"} name={"name"} value={props.name} onChange={props.handleInputChange} />
                </div>
            </Fragment>
        )}
        {props.order.status === 'confirmed' && (
            <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={props.isDeposit ? () => props.payDeposit(props.order.option.price +  Math.ceil(props.order.option.price*0.1)) : null} style={{height: 48}}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Process Payment")}</p>
            </div>
        )}
    </div>
)

PaymentDetail.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    payDeposit: PropTypes.func.isRequired,
    isDeposit: PropTypes.func.isRequired
}

PaymentDetail.contextTypes = {
    t: PropTypes.func
}

export default PaymentDetail
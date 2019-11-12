import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const MySchedule = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{context.t("My Schedule")}</p>
        {props.orderList && props.orderList.length > 0 && (
            <div className={`${styles.mt45}`}>
                {props.orderList.map((order, index) => (
                    <div key={order.id} className={`${styles.py3} ${(index === props.orderList.length - 1) ? null : styles.borderBtmGrayDc}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={() => props.goMyScheduleDetail(order.id, order)}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                {order.status === 'pending' && (
                                    <p className={`${styles.fontBold} ${styles.font13}`} style={{width: 65}}>{context.t("Pending")}</p>
                                )}
                                {order.status === 'confirmed' && (
                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.confirmed}`} style={{width: 65}}>{context.t("Confirmed")}</p>
                                )}
                                {order.status === 'cancelled' && (
                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.pink}`} style={{width: 65}}>{context.t("Cancelled")}</p>
                                )}
                                {order.status === 'done' && (
                                    <p className={`${styles.fontBold} ${styles.font13}`} style={{width: 65}}>{context.t("Done")}</p>
                                )}
                                <div className={`${styles.ml3}`}>
                                    {order.date_option === 'Specific' && (
                                        <p className={`${styles.fontBold} ${styles.font11}`}>{order.specific_date.slice(2,4).concat('/',order.specific_date.slice(5,7),'/',order.specific_date.slice(8,10))}</p>
                                    )}
                                    {order.date_option === 'Range' && (
                                        <p className={`${styles.fontBold} ${styles.font11}`}>{order.start_date.slice(2,4).concat('/',order.start_date.slice(5,7),'/',order.start_date.slice(8,10))}</p>
                                    )}
                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.mt3}`}>{`${order.photographer.nickname} / ${order.location.name}`}</p>
                                </div>
                            </div>
                            <img src={require('../../assets/images/icon_right.png')} alt={context.t("Detail")} className={`${styles.iconArrowRight}`} />
                        </div>
                        {order.status === 'confirmed' && (
                            <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} style={{height: 48}}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Add Payment Details")}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
)

MySchedule.propTypes = {
    orderList: PropTypes.array,
    goMyScheduleDetail: PropTypes.func.isRequired
}

MySchedule.contextTypes = {
    t: PropTypes.func
}

export default MySchedule
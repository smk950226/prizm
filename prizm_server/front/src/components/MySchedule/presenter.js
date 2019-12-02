import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';

const MySchedule = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{context.t("My Schedule")}</p>
        {props.loading ? (
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            props.orderList && props.orderList.length > 0 && (
                <div className={`${styles.mt45}`}>
                    {props.orderList.map((order, index) => (
                        <div key={order.id} className={`${styles.py3} ${(index === props.orderList.length - 1) ? null : styles.borderBtmGrayDc}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={() => props.goMyScheduleDetail(order.id, order)}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.col11} ${styles.px0}`}>
                                    {order.status === 'pending' && (
                                        <p className={`${styles.fontBold} ${styles.font13} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{context.t("Pending")}</p>
                                    )}
                                    {order.status === 'confirmed' && (
                                        <p className={`${styles.fontBold} ${styles.font13} ${styles.confirmed} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{context.t("Confirmed")}</p>
                                    )}
                                    {order.status === 'cancelled' && (
                                        <p className={`${styles.fontBold} ${styles.font13} ${styles.pink} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{context.t("Cancelled")}</p>
                                    )}
                                    {order.status === 'completed' && (
                                        <p className={`${styles.fontBold} ${styles.font13} ${styles.completed} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{context.t("Completed")}</p>
                                    )}
                                    <div className={`${styles.col9} ${styles.colSm10} ${styles.colMd11} ${styles.px0}`}>
                                        {order.date_option === 'Specific' && (
                                            <p className={`${styles.ml3} ${styles.fontBold} ${styles.font11}`}>{order.specific_date.slice(2,4).concat('/',order.specific_date.slice(5,7),'/',order.specific_date.slice(8,10))}</p>
                                        )}
                                        {order.date_option === 'Range' && (
                                            <p className={`${styles.ml3} ${styles.fontBold} ${styles.font11}`}>{order.start_date.slice(2,4).concat('/',order.start_date.slice(5,7),'/',order.start_date.slice(8,10))}</p>
                                        )}
                                        <p className={`${styles.ml3} ${styles.fontBold} ${styles.font13} ${styles.mt3}`}>{`${order.photographer.nickname} / ${order.location.name}`}</p>
                                    </div>
                                </div>
                                <div className={`${styles.col1} ${styles.px0} ${styles.textRight}`}>
                                    <img src={require('../../assets/images/icon_right.png')} alt={context.t("Detail")} className={`${styles.iconArrowRight}`} />
                                </div>
                            </div>
                            {order.status === 'confirmed' && (
                                <Fragment>
                                <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => props.goPayment(order)} style={{height: 48}}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Add Payment Details")}</p>
                                </div>
                                <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>{context.t(`Please add payment details by : ${new Date(new Date(order.confirmed_at).getTime() + 1000*60*60*24*3)}`)}</p>
                                </Fragment>
                            )}
                            {order.status === 'completed' && !order.is_reviewed && (
                                <div className={`${styles.widthFull} ${styles.bgCompleted} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => props.goReveiwCreate(order)} style={{height: 48}}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Leave a Review")}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )
        )}
    </div>
)

MySchedule.propTypes = {
    orderList: PropTypes.array,
    goMyScheduleDetail: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    goPayment: PropTypes.func.isRequired,
    goReveiwCreate: PropTypes.func.isRequired
}

MySchedule.contextTypes = {
    t: PropTypes.func
}

export default MySchedule
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';

const MyPhotos = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{context.t("My Photos")}</p>
        {props.loading ? (
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            props.orderList && props.orderList.length > 0 && (
                <div className={`${styles.mt45}`}>
                    {props.orderList.map((order, index) => {
                        if((order.status === 'confirmed') || (order.status === 'waiting_payment') || (order.status === 'completed')){
                            return(
                                <div key={order.id} className={`${styles.py3} ${(index === props.orderList.length - 1) ? null : styles.borderBtmGrayDc}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={() => props.goMyPhotoDetail(order.id, order)}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.col11} ${styles.px0}`}>
                                            {((order.status === 'confirmed') || (order.status === 'waiting_payment')) && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.confirmed} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`} style={{width: 65}}>{context.t("Confirmed")}</p>
                                            )}
                                            {order.status === 'completed' && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.completed} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`} style={{width: 65}}>{context.t("Completed")}</p>
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
                                </div>
                            )
                        }
                    })}
                </div>
            )
        )}
    </div>
)

MyPhotos.propTypes = {
    orderList: PropTypes.array,
    goMyPhotoDetail: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

MyPhotos.contextTypes = {
    t: PropTypes.func
}

export default MyPhotos
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import MyLoader from '../Loader';

class MySchedule extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        goMyScheduleDetail: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        goPayment: PropTypes.func.isRequired,
        goReveiwCreate: PropTypes.func.isRequired,
        orderListMore: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        isSendingEmail: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _isBottom(el) {
        if(el){
            return el.getBoundingClientRect().bottom <= window.innerHeight;
        }
        else{
            return false
        }
    }

    _handleScroll = async() => {
        const wrappedElement = this.refs.scheduleContainer
        if (this._isBottom(wrappedElement)) {
            if(!this.props.isLoadingMore){
                this.props.orderListMore()
            }
        }
    }

    render(){
        const { loading, orderList, profile, isSendingEmail } = this.props;
        return(
            <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{this.context.t("My Schedule")}</p>
                {profile && !profile.is_verified && (
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3} ${styles.widthFull}`}>
                        <p className={`${styles.font1214} ${styles.pink}`} style={{width: 'calc(100% - 100px)'}}>
                            {this.context.t("Your request will be sent to the photographer when you complete the email verification")}
                        </p>
                        <div className={`${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48, width: 100}} onClick={this.props.send}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                {this.context.t("Resend")}
                            </p>
                        </div>
                    </div>
                )}
                {loading ? (
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    (orderList && orderList.length > 0) ? (
                        <div className={`${styles.mt45}`} ref={"scheduleContainer"}>
                            {orderList.map((order, index) => (
                                <div key={order.id} className={`${styles.py3} ${(index === orderList.length - 1) ? null : styles.borderBtmGrayDc}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.cursorPointer}`} onClick={() => this.props.goMyScheduleDetail(order.id, order)}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.col11} ${styles.px0}`}>
                                            {order.status === 'pending' && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.pending} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{this.context.t("Pending")}</p>
                                            )}
                                            {((order.status === 'confirmed') || (order.status === 'waiting_payment')) && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.confirmed} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{this.context.t("Confirmed")}</p>
                                            )}
                                            {order.status === 'paid' && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.paid} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{this.context.t("Paid")}</p>
                                            )}
                                            {order.status === 'cancelled' && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.cancelled} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{this.context.t("Cancelled")}</p>
                                            )}
                                            {order.status === 'completed' && (
                                                <p className={`${styles.fontBold} ${styles.font13} ${styles.completed} ${styles.col3} ${styles.colSm2} ${styles.colMd1} ${styles.px0}`}>{this.context.t("Completed")}</p>
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
                                            <img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Detail")} className={`${styles.iconArrowRight}`} />
                                        </div>
                                    </div>
                                    {order.status === 'confirmed' && (
                                        <Fragment>
                                        <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => this.props.goPayment(order)} style={{height: 48}}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Add Payment Details")}</p>
                                        </div>
                                        <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>
                                        {this.context.t("Please add payment details by : ")}
                                        {this.context.t(`${new Date(new Date(order.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
                                        </p>
                                        </Fragment>
                                    )}
                                    {order.status === 'waiting_payment' && (
                                        <Fragment>
                                        <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => this.props.goPayment(order)} style={{height: 48}}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("View Payment Information")}</p>
                                        </div>
                                        <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>
                                        {this.context.t("Please make payment by : ")}
                                        {this.context.t(`${new Date(new Date(order.deposit.created_at).getTime() + 1000*60*60*24*1)}`)}
                                        </p>
                                        </Fragment>
                                    )}
                                    {order.status === 'completed' && !order.is_reviewed && (
                                        <div className={`${styles.widthFull} ${styles.bgCompleted} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => this.props.goPayment(order)} style={{height: 48}}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Leave a Review")}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/main.png')} alt={this.context.t("This request no longer exists")} className={`${styles.mt5} ${styles.pt3}`} style={{width: '80%', maxWidth: 400}} />
                            <p className={`${styles.font1214} ${styles.mt3}`}>
                                {this.context.t("You haven't made any reservations yet.")}<br/>
                                {this.context.t("A new schedule will appear when you submit a request to a photographer.")}
                            </p>
                        </div>
                    )
                )}
                {isSendingEmail && (
                    <MyLoader />
                )}
            </div>
        )
    }
}

export default MySchedule
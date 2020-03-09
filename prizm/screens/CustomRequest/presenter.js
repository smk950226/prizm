import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Modal from 'react-responsive-modal';

class CustomRequest extends Component{
    static propTypes = {
        goCustomRequestCreate: PropTypes.func.isRequired,
        profile: PropTypes.object,
        cancel: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired,
        goRequestOrderList: PropTypes.func.isRequired,
        send: PropTypes.func.isRequired,
        isSendingEmail: PropTypes.bool.isRequired,
        openCancel: PropTypes.func.isRequired,
        closeCancel: PropTypes.func.isRequired,
        showCancel: PropTypes.bool.isRequired,
        goPayment: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { profile, isSendingEmail, showCancel, isLoading } = this.props;
        return(
            <div className={`${styles.containerCustomer} ${styles.safearea}`}>
                <div className={`${styles.widthFull} ${styles.banner}`} style={{position: 'relative', overflow: 'hidden'}}>
                    <video id="video_background" src={require('../../assets/videos/newyork.mp4')} className={`${styles.widthFull} ${styles.banner}`} style={{objectFit: 'cover'}} autoPlay={true} loop={true} muted={true} playsInline={true} />
                    <p className={`${styles.font16} ${styles.fontBold} ${styles.white} ${styles.absoluteCenter}`}>{this.context.t("SEOUL")}</p>
                </div>
                <div className={`${styles.heightCustomRequest} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull} ${styles.px3}`}>
                    {profile ? (
                        <Fragment>
                            {profile.custom_request_status.status === 'none' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Meet the ")}<span className={`${styles.fontBold}`}>{this.context.t("coolest photographers in Seoul")}</span><br/>
                                        {this.context.t("Enrich your travel with photography")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goCustomRequestCreate}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                    </div>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'close' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Meet the ")}<span className={`${styles.fontBold}`}>{this.context.t("coolest photographers in Seoul")}</span><br/>
                                        {this.context.t("Enrich your travel with photography")}
                                    </p>
                                    <div className={`${styles.widthFull} ${profile.is_verified ? styles.bgGray16 : styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 460}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                            {profile.is_verified ? (
                                                this.context.t("Your custom request has been submitted.")
                                            ) : (
                                                <Fragment>
                                                    {this.context.t("Your custom request has been submitted.")}<br/>
                                                    {this.context.t("Please complete the email verification")}
                                                </Fragment>
                                            )}
                                        </p>
                                    </div>
                                    {!profile.is_verified  && (
                                        <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 460}} onClick={this.props.send}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                {this.context.t("Resend Verification Email")}
                                            </p>
                                        </div>
                                    )}
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} style={{maxWidth: 460}}>
                                        {profile.is_verified ? (
                                            <Fragment>
                                                {this.context.t("We are waiting for photographers to submit their proposals.")}<br/>
                                                {this.context.t("We will notify you through text message and email when we have received proposals from photographers")}
                                            </Fragment>
                                        ) : (
                                            this.context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")
                                        )}
                                    </p>
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt5} ${styles.gray93} ${styles.cursorPointer}`} onClick={this.props.openCancel}>
                                        {this.context.t("Make a New Request")}<br/>
                                    </p>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'open' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Meet the ")}<span className={`${styles.fontBold}`}>{this.context.t("coolest photographers in Seoul")}</span><br/>
                                        {this.context.t("Enrich your travel with photography")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this.props.goRequestOrderList(profile.custom_request_status.id)}>
                                        <div style={{position: 'relative'}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Proposals for ")}{profile.first_name} {profile.last_name}</p>
                                        <div style={{position: 'absolute', top: -20, right: -5}}>
                                            <div style={{position: 'relative'}}>
                                                <img src={require('../../assets/images/icon_count.png')} style={{width: 20}} />
                                                <p className={`${styles.fontExtraBold} ${styles.font8} ${styles.absoluteCenter} ${styles.pb1}`}>{profile.custom_request_status.count}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                        {this.context.t("PRIZM photographers' proposals have arrived.")}<br/>
                                        {this.context.t("Please click the button above to see them in detail")}
                                    </p>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'confirmed' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Meet the ")}<span className={`${styles.fontBold}`}>{this.context.t("coolest photographers in Seoul")}</span><br/>
                                        {this.context.t("Enrich your travel with photography")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 460}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                            {this.context.t("Your custom request has been confirmed.")}
                                        </p>
                                    </div>
                                    <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isLoading ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 460}} onClick={() => this.props.goPayment(profile.custom_request_status.orderId)}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                            {profile.custom_request_status.payment === 'confirmed' && (
                                                this.context.t("Add Payment Details")
                                            )}
                                            {profile.custom_request_status.payment === 'waiting_payment' && (
                                                this.context.t("Waiting for Payment")
                                            )}
                                            {profile.custom_request_status.payment === 'paid' && (
                                                this.context.t("Payment Successful!")
                                            )}
                                        </p>
                                    </div>
                                    {profile.custom_request_status.payment !== 'paid' && (
                                        <p className={`${styles.font10} ${styles.textCenter} ${styles.mt2} ${styles.pink}`}>
                                            {this.context.t("Please add payment details by : ")}
                                            {this.context.t(`${new Date(new Date(profile.custom_request_status.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
                                        </p>
                                    )}
                                </div>
                            )}
                        </Fragment>
                        
                    ) : (
                        <div className={``}>
                            <p className={`${styles.font1416} ${styles.textCenter}`}>
                                {this.context.t("Meet the ")}<span className={`${styles.fontBold}`}>{this.context.t("coolest photographers in Seoul")}</span><br/>
                                {this.context.t("Enrich your travel with photography")}
                            </p>
                            <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goCustomRequestCreate}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                            </div>
                            <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer} ${styles.fontBold}`} onClick={this.props.goSignin}>
                                {this.context.t("Already made a reservation?")}
                            </p>
                    </div>
                    )}
                </div>
                <Modal
                open={showCancel} 
                onClose={this.props.closeCancel} 
                center
                styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                >
                    <div className={`${styles.containerModal} ${styles.px3} ${styles.py3} ${styles.bgWhite}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`}>
                            <img src={require('../../assets/images/icon_alert.png')} style={{width: '20%', minWidth: 60, maxWidth: 150}} />
                        </div>
                        <p className={`${styles.mt3} ${styles.font1416} ${styles.textCenter}`}>
                            {this.context.t("If you make a new custom request, your existing request will be automatically cancelled.")}
                        </p>
                        <p className={`${styles.mt4} ${styles.font1416} ${styles.textCenter}`}>
                            {this.context.t("Continue?")}
                        </p>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mxAuto}`} style={{maxWidth: 400}}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt4} ${styles.widthFull}`}>
                                <div className={`${styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, width: 'calc(50% - 8px)'}} onClick={this.props.cancel}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("OK")}</p>
                                </div>
                                <div className={`${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, width: 'calc(50% - 8px)'}} onClick={this.props.closeCancel}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Back")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default CustomRequest; 
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

class CustomRequest extends Component{
    static propTypes = {
        goCustomRequestCreate: PropTypes.func.isRequired,
        profile: PropTypes.object,
        cancel: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired,
        goRequestOrderList: PropTypes.func.isRequired,
        send: PropTypes.func.isRequired,
        isSendingEmail: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { profile, isSendingEmail } = this.props;
        return(
            <div className={`${styles.containerCustomer} ${styles.safearea}`}>
                <div className={`${styles.widthFull} ${styles.banner}`} style={{position: 'relative', overflow: 'hidden'}}>
                    <video id="video_background" src={require('../../assets/videos/newyork.mp4')} className={`${styles.widthFull} ${styles.banner}`} style={{objectFit: 'cover'}} autoPlay={true} loop={true} muted={true} playsInline={true} />
                    <p className={`${styles.font16} ${styles.fontBold} ${styles.white} ${styles.absoluteCenter}`}>{this.context.t("NEWYORK")}</p>
                </div>
                <div className={`${styles.heightCustomRequest} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull} ${styles.px3}`}>
                    {profile ? (
                        <Fragment>
                            {profile.custom_request_status.status === 'none' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                        {this.context.t("with the best photographers in New York.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goCustomRequestCreate}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                    </div>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'close' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                        {this.context.t("with the best photographers in New York.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${profile.is_verified ? styles.bgGray33 : styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 460}}>
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
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 460}} onClick={this.props.send}>
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
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt5} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.cancel}>
                                        {this.context.t("Make New Request")}<br/>
                                    </p>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'open' && (
                                <div className={``}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                        {this.context.t("with the best photographers in New York.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this.props.goRequestOrderList(profile.custom_request_status.id)}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Proposals for ")}{profile.first_name} {profile.last_name}</p>
                                    </div>
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                        {this.context.t("PRIZM photographers' proposals have arrived.")}<br/>
                                        {this.context.t("Please click the button above to see them in detail")}
                                    </p>
                                </div>
                            )}
                        </Fragment>
                        
                    ) : (
                        <div className={``}>
                            <p className={`${styles.font1416} ${styles.textCenter}`}>
                                {this.context.t("Enrich your New York City trip experience")}<br/>
                                {this.context.t("with the best photographers in New York.")}
                            </p>
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goCustomRequestCreate}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                            </div>
                            <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.goSignin}>
                                {this.context.t("Already requested?")}
                            </p>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}
export default CustomRequest; 
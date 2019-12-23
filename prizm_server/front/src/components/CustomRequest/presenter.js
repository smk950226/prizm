import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

class CustomRequest extends Component{
    static propTypes = {
        goCustomRequestCreate: PropTypes.func.isRequired,
        profile: PropTypes.object,
        cancel: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { profile } = this.props;
        return(
            <div className={`${styles.containerCustomer} ${styles.safearea}`}>
                {/* <div className={`${styles.bgNewyork} ${styles.widthFull} ${styles.banner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <p className={`${styles.font16} ${styles.fontBold} ${styles.white}`}>{this.context.t("NEWYORK")}</p>
                </div> */}
                <div className={`${styles.widthFull} ${styles.banner}`} style={{position: 'relative', overflow: 'hidden'}}>
                    <video id="video_background" src={require('../../assets/videos/newyork.mp4')} className={`${styles.widthFull} ${styles.banner}`} style={{objectFit: 'cover'}} autoPlay={true} loop={true} muted={true} playsInline={true} />
                    <p className={`${styles.font16} ${styles.fontBold} ${styles.white} ${styles.absoluteCenter}`}>{this.context.t("NEWYORK")}</p>
                </div>
                <div className={`${styles.heightCustomRequest} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`}>
                    {profile ? (
                        <Fragment>
                            {profile.custom_request_status.status === 'none' && (
                                <div className={`${styles.mb5} ${styles.pb5}`}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("뉴욕 현지 최고의 사진작가와 함께")}<br/>
                                        {this.context.t("당신의 뉴욕 여행을 더욱 특별하게 만들어보세요.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goCustomRequestCreate}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("지금 바로 예약하기")}</p>
                                    </div>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'close' && (
                                <div className={`${styles.mb5} ${styles.pb5}`}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("뉴욕 현지 최고의 사진작가와 함께")}<br/>
                                        {this.context.t("당신의 뉴욕 여행을 더욱 특별하게 만들어보세요.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("맞춤 예약 신청이 완료되었습니다.")}</p>
                                    </div>
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                        {this.context.t("PRIZM 사진작가들의 제안서 등록을 기다리고 있습니다.")}<br/>
                                        {this.context.t("등록이 완료되면 메일과 SMS를 통해 안내해드리겠습니다.")}
                                    </p>
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt5} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.cancel}>
                                        {this.context.t("새 맞춤 예약하기")}<br/>
                                    </p>
                                </div>
                            )}
                            {profile.custom_request_status.status === 'open' && (
                                <div className={`${styles.mb5} ${styles.pb5}`}>
                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                        {this.context.t("뉴욕 현지 최고의 사진작가와 함께")}<br/>
                                        {this.context.t("당신의 뉴욕 여행을 더욱 특별하게 만들어보세요.")}
                                    </p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{profile.name}{this.context.t(" 님을 위한 제안들")}</p>
                                    </div>
                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                        {this.context.t("PRIZM 사진작가들의 제안서 등록이 완료되었습니다.")}<br/>
                                        {this.context.t("위의 버튼을 클릭해서 지금 바로 확인해보세요!")}
                                    </p>
                                </div>
                            )}
                        </Fragment>
                        
                    ) : (
                        <div className={`${styles.mb5} ${styles.pb5}`}>
                            <p className={`${styles.font1416} ${styles.textCenter}`}>
                                {this.context.t("뉴욕 현지 최고의 사진작가와 함께")}<br/>
                                {this.context.t("당신의 뉴욕 여행을 더욱 특별하게 만들어보세요.")}
                            </p>
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goCustomRequestCreate}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("지금 바로 예약하기")}</p>
                            </div>
                            <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.goSignin}>
                                {this.context.t("이미 맞춤 예약을 신청하셨나요?")}
                            </p>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}
export default CustomRequest; 
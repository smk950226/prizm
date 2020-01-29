import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { Link } from 'react-router-dom';

class FindPassword extends Component{
    static proptTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        findPassword: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired,
        emailForm: PropTypes.bool.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        finded: PropTypes.bool.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        handleKeyPress: PropTypes.func.isRequired,
        handleFindPassword: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { email, emailForm, isSubmitting, finded } = this.props;
        if(finded){
            return(
                <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
                        <p className={`${styles.fontBold} ${styles.font17}`}>{this.context.t("비밀번호 재설정")}</p>
                    </div>
                    <div className={`${styles.row} ${styles.justifyContentBetween} ${styles.textCenter} ${styles.p0} ${styles.mx0} ${styles.mt4}`}>
                        <p className={`${styles.col12} ${styles.textCenter} ${styles.font14}`}>
                            {this.context.t("아래의 메일로 비밀번호 재설정 링크를 발송하였습니다.")}
                        </p>
                    </div>
                    <div className={`${styles.widthFull} ${styles.mt4}`}>
                        <input className={`${styles.textInput2}`} type={"text"} name={"finded"} value={finded} readOnly={true} />
                    </div>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.goSignin}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Login")}</p>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
                        <p className={`${styles.fontBold} ${styles.font17}`}>{this.context.t("비밀번호 재설정")}</p>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("Email")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={email} onChange={this.props.handleInputChange} onKeyPress={this.props.handleKeyPress} />
                    </div>
                    <div className={`${styles.row} ${styles.justifyContentBetween} ${styles.textCenter} ${styles.p0} ${styles.mx0} ${styles.mt4}`}>
                        <p className={`${styles.col12} ${styles.textCenter} ${styles.font14}`}>
                            {this.context.t("가입하신 이메일 주소를 입력하면")}<br/>
                            {this.context.t("새로운 비밀번호를 설정할 수 있는 링크를 보내드립니다.")}
                        </p>
                    </div>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this.props.handleFindPassword}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Send")}</p>
                    </div>
                </div>
            )
        }
        
    }
}

export default FindPassword;
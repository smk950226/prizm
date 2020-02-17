import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MyLoader from '../Loader';

class FindPasswordResult extends Component{
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
        password1: PropTypes.string.isRequired,
        password2: PropTypes.string.isRequired,
        passwordForm: PropTypes.bool.isRequired,
        handleFindPasswordResult: PropTypes.func.isRequired,
        handleKeyPressResult: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { email, emailForm, isSubmitting, finded, password1, password2, passwordForm } = this.props;
        if(finded){
            return(
                <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
                        <p className={`${styles.fontBold} ${styles.font17}`}>{this.context.t("Reset your password")}</p>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("New password")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput2}`} type={"password"} name={"password1"} value={password1} onChange={this.props.handleInputChange} onKeyPress={this.props.handleKeyPressResult} />
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("New password")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput2}`} type={"password"} name={"password2"} value={password2} onChange={this.props.handleInputChange} onKeyPress={this.props.handleKeyPressResult} />
                    </div>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.handleFindPasswordResult}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Change")}</p>
                    </div>
                    {isSubmitting && (
                        <MyLoader />
                    )}
                </div>
            )
        }
        else{
            return(
                <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.pt45}`}>
                        <p className={`${styles.fontBold} ${styles.font17}`}>{this.context.t("Reset your password")}</p>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("Email")}</p>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={email} onChange={this.props.handleInputChange} onKeyPress={this.props.handleKeyPress} />
                    </div>
                    <div className={`${styles.row} ${styles.justifyContentBetween} ${styles.textCenter} ${styles.p0} ${styles.mx0} ${styles.mt4}`}>
                        <p className={`${styles.col12} ${styles.textCenter} ${styles.font14}`}>
                            {this.context.t("Please check your email again.")}<br/>
                        </p>
                    </div>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.handleFindPassword}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Confirm")}</p>
                    </div>
                    {isSubmitting && (
                        <MyLoader />
                    )}
                </div>
            )
        }
        
    }
}

export default FindPasswordResult;
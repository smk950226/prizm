import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const AdminProfileSetting = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.justifyContentBetween}`}>
            <p className={`${styles.mt45} ${styles.fontBold} ${styles.font2024}`}>{context.t("Payout Settings")}</p>
            <p className={`${styles.fontBold} ${styles.font13} ${styles.pink} ${styles.cursorPointer} ${props.editable ? styles.hidden : null}`} onClick={props.enableEdit}>{context.t("Edit")}</p>
        </div>
        <p className={`${styles.mt1} ${styles.font1012}`}>{context.t("Please enter the payout information.")}</p>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
            <div className={`${styles.col12} ${styles.colMd6} ${styles.px0} ${styles.prMd2}`}>
                <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("Legal Name")}</p>
                <div className={`${styles.widthFull}`}>
                    <input className={`${styles.textInput2}`} type={"text"} name={"legalName"} value={props.legalName} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
                </div>
            </div>
            <div className={`${styles.col12} ${styles.colMd6} ${styles.px0} ${styles.plMd2}`}>
                <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("Date of Birth")}</p>
                <div className={`${styles.widthFull}`}>
                    <input className={`${styles.textInput2}`} type={"text"} name={"birth"} placeholder={'YYYYMMDD'} maxLength={8} value={props.birth} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
                </div>
            </div>
        </div>
        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt45}`}>{context.t("Payout Options")}</p>
        <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                {((props.profile.country_code === 'KR') || (props.profile.country_number === '82')) ? (
                    <Fragment>
                        <div className={`${styles.checkBox} ${props.accountType === 'bank_account' ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                            {props.accountType === 'bank_account' && (
                                <img src={require('../../assets/images/icon_check.png')} alt={context.t("Bank Account")} style={{width: 10, height: 10}} />
                            )}
                        </div>
                        <p className={`${props.accountType === 'bank_account' ? styles.fontBold : null} ${styles.font1314} ${styles.ml2}`}>{context.t("Bank Account")}</p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className={`${styles.checkBox} ${props.accountType === 'paypal_account' ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                            {props.accountType === 'paypal_account' && (
                                <img src={require('../../assets/images/icon_check.png')} alt={context.t("Paypal Account")} style={{width: 10, height: 10}} />
                            )}
                        </div>
                        <p className={`${props.accountType === 'paypal_account' ? styles.fontBold : null} ${styles.font1314} ${styles.ml2}`}>{context.t("Paypal Account")}</p>
                    </Fragment>
                )}
            </div>
        </div>
        {props.accountType === 'bank_account' && (
            <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Bank Account")}</p>
        )}
        {props.accountType === 'paypal_account' && (
            <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Paypal Account")}</p>
        )}
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"content"} value={props.content} onChange={props.handleInputChange} readOnly={props.editable ? null : true} />
        </div>
        {props.editable && (
            <Fragment>
                <div className={`${styles.mobileOnly}`}>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Save")}</p>
                    </div>
                </div>
                <div className={`${styles.mobileNone}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <div className={`${styles.bgGray33} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48, width: 140}} onClick={props.submit}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Save change")}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </div>
)

AdminProfileSetting.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    legalName: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    birth: PropTypes.string.isRequired,
    accountType: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    enableEdit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired
}

AdminProfileSetting.contextTypes = {
    t: PropTypes.func
}

export default AdminProfileSetting;

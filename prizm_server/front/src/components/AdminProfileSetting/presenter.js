import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import MdArrowDropup from 'react-ionicons/lib/MdArrowDropup';
import InputMask from 'react-input-mask';
import MyLoader from '../Loader';
import ReactCountryFlag from "react-country-flag";
import Modal from 'react-responsive-modal';

const AdminProfileSetting = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFull} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.justifyContentBetween}`}>
            <p className={`${styles.mt45} ${styles.fontBold} ${styles.font2024}`}>{context.t("Profile")}</p>
            <p className={`${styles.fontBold} ${styles.font13} ${styles.pink} ${styles.cursorPointer} ${props.editable ? styles.hidden : null}`} onClick={props.enableEdit}>{context.t("Edit")}</p>
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.pt45}`}>{context.t("First name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"firstName"} value={props.firstName} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Last name")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"lastName"} value={props.lastName} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Mobile")}</p>
        <div className={`${styles.positionRelative}`}>
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={props.editable ? props.handleShowCountryNumber : null}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 17}}>
                        <p className={`${styles.font13}`}>{props.countryNumber ? `+${props.countryNumber}` : `${props.countryNumber}`}</p>
                        <MdArrowDropup fontSize="16px" color="#000000" />
                    </div>
                </div>
                <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                    <div className={`${styles.col10} ${styles.px0}`}>
                        <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={props.mobile} onChange={props.handleInputChange} contentEditable={props.editable ? null : true} readOnly={props.editable ? null : true} />
                    </div>
                </div>
            </div>
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Instagram")}</p>
        <div className={`${styles.widthFull}`}>
            <InputMask mask={'inst\\agr\\am.com/******************************'} 
            formatChars={{
                '*': '[A-Za-z0-9!@#$()-_+=.,]'
            }}
            maskChar={''} alwaysShowMask={true} value={props.instagram} readOnly={props.editable ? null : true} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress}>
                {(inputProps) => <input {...inputProps} type={"text"} name={"instagram"} className={`${styles.textInput2}`} contentEditable={props.editable ? null : true} />}
            </InputMask>
        </div>
        <p className={`${styles.fontBold} ${styles.font10} ${styles.mt4}`}>{context.t("Email")}</p>
        <div className={`${styles.widthFull}`}>
            <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={props.email} contentEditable={false} readOnly={true} />
        </div>
        {props.editable && (
            <Fragment>
                <div className={`${styles.mobileOnly}`}>
                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.submit}>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Save")}</p>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goPasswordChange}>{context.t("Do you want to change your password?")}</p>
                </div>
                <div className={`${styles.mobileNone}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        <div className={`${styles.bgGray33} ${styles.mtProfile} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, width: 140}} onClick={props.submit}>
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Save change")}</p>
                        </div>
                    </div>
                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt3} ${styles.textCenter} ${styles.cursorPointer}`} onClick={props.goPasswordChange}>{context.t("Do you want to change your password?")}</p>
                </div>
            </Fragment>
        )}
        {props.isSubmitting && (
            <MyLoader />
        )}
        <Modal
        open={props.showCountryNumber} 
        onClose={props.closeShowCountryNumber} 
        center
        styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
        >
            <div className={`${styles.containerModal}`}>
                <p className={`${styles.textCenter} ${styles.my3} ${styles.fontBold} ${styles.font1214}`}>{context.t("Nationality")}</p>
                <div className={`${styles.px5}`}>
                    <div className={`${styles.widthFull}`}>
                        <input className={`${styles.textInput2}`} type={"text"} name={"q"} placeholder={context.t("Type your country")} value={props.q} onChange={props.handleInputChange} />
                    </div>
                </div>
                <div className={`${styles.overflowYScroll} ${styles.px3} ${styles.pt2}`} style={{maxHeight: 300}}>
                    {props.q !== "" && props.countryList.map((country, index) => (
                        <div key={index} className={`${styles.row} ${styles.mx0} ${styles.mb2}`} onClick={() => props.handleCountryNumberChange(country.number, country.value)}>
                            <ReactCountryFlag 
                                styleProps={{
                                    width: '15px',
                                    height: '15px'
                                }}
                                code={country.value}
                                svg
                            />
                            <p className={`${styles.font1214} ${styles.ml2}`}>{country.label}</p>
                            <p className={`${styles.font1214} ${styles.ml2}`}>{`+${country.number}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    </div>
)

AdminProfileSetting.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,

    mobile: PropTypes.string.isRequired,
    emailForm: PropTypes.bool.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goPasswordChange: PropTypes.func.isRequired,
    enableEdit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    openShowCountryNumber: PropTypes.func.isRequired,
    closeShowCountryNumber: PropTypes.func.isRequired,
    countryList: PropTypes.array,
    q: PropTypes.string.isRequired
}

AdminProfileSetting.contextTypes = {
    t: PropTypes.func
}

export default AdminProfileSetting;

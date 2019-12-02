import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { Collapse } from 'react-collapse';
import styled from 'styled-components';

const DayContainer = styled.div`
    height: ${props => `${(props.length*32)+15}px`};
    width: 100%;
    overflow-x: scroll !important;
    margin-top: 15px;
`

const OrderComp = (props, context) => (
    <Fragment>
        <div className={`${styles.py4} ${props.index === props.total - 1 ? null : styles.borderBtmGrayDc} ${styles.cursorPointer}`} onClick={props.showResponse ? props.closeResponse : props.openResponse}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                <p className={`${styles.fontBold} ${styles.font1316}`}>
                    {props.order.user.name}
                </p>
                <p className={`${styles.fontBold} ${styles.font13} ${props.order.status === 'confirmed' ? styles.confirmed : null} ${props.order.status === 'cancelled' ? styles.pink : null}`}>
                    {props.order.status === 'pending' && context.t('Pending')}
                    {props.order.status === 'confirmed' && context.t('Confirmed')}
                    {props.order.status === 'cancelled' && context.t('Cancelled')}
                    {props.order.status === 'completed' && context.t('Completed')}
                </p>
            </div>
            <div className={`${styles.mobileOnly}`}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                    <div className={`${styles.col3} ${styles.colSm2} ${styles.px0}`}>
                        <p className={`${styles.fontRBold} ${styles.font1214}`}>{context.t("Location")}</p>
                    </div>
                    <div className={`${styles.col9} ${styles.colSM10} ${styles.px0}`}>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.textRight}`}>{props.order.location.name}</p>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt2}`}>
                    <div className={`${styles.col3} ${styles.colSm2} ${styles.px0}`}>
                        <p className={`${styles.fontRBold} ${styles.font1214}`}>{context.t("Date&Time")}</p>
                    </div>
                    <div className={`${styles.col9} ${styles.colSM10} ${styles.px0}`}>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.textRight}`}>
                            {props.order.date_option === 'Specific' && `${props.order.specific_date.slice(2,4).concat('/',props.order.specific_date.slice(5,7), '/', props.order.specific_date.slice(8,10), ' ', props.order.specific_date.slice(11,13), ':', props.order.specific_date.slice(14,16))}`}
                            {props.order.date_option === 'Range' && (
                                `${props.order.start_date.slice(2,4).concat('/',props.order.start_date.slice(5,7), '/', props.order.start_date.slice(8,10), ' ~ ', props.order.end_date.slice(2,4), '/',props.order.end_date.slice(5,7), '/', props.order.end_date.slice(8,10))}`
                            )}
                        </p>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                    <div className={`${styles.col3} ${styles.colSm2} ${styles.px0}`}>
                        <p className={`${styles.fontRBold} ${styles.font1214}`}>{context.t("Service&Pricing")}</p>
                    </div>
                    <div className={`${styles.col9} ${styles.colSM10} ${styles.px0}`}>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.textRight}`}>{`${props.order.option.title} (${props.order.option.person > 1 ? `${props.order.option.person} people,` : `${props.order.option.person} person,`} ${props.order.option.hour > 1 ? `${props.order.option.hour} hrs` : `${props.order.option.hour} hr`})`}</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.mobileNone}`}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3}`}>
                    <div className={`${styles.col4} ${styles.colLg3} ${styles.pr3} ${styles.pl0}`}>
                        <p className={`${styles.fontRBold} ${styles.font1214}`}>{context.t("Location")}</p>
                    </div>
                    <div className={`${styles.col4} ${styles.colLg3} ${styles.pr3} ${styles.pl0}`}>
                        <p className={`${styles.fontRBold} ${styles.font1214}`}>{context.t("Date&Time")}</p>
                    </div>
                    <div className={`${styles.col4} ${styles.colLg3} ${styles.pr3} ${styles.pl0}`}>
                        <p className={`${styles.fontRBold} ${styles.font1214}`}>{context.t("Location")}</p>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.mx0} ${styles.mt2}`}>
                    <div className={`${styles.col4} ${styles.colLg3} ${styles.pr3} ${styles.pl0}`}>
                        <p className={`${styles.fontBold} ${styles.font1214}`}>{props.order.location.name}</p>
                    </div>
                    <div className={`${styles.col4} ${styles.colLg3} ${styles.pr3} ${styles.pl0}`}>
                        <p className={`${styles.fontBold} ${styles.font1214}`}>
                            {props.order.status === 'confirmed' ? (
                                `${props.order.confirmed_date.slice(2,4).concat('/',props.order.confirmed_date.slice(5,7), '/', props.order.confirmed_date.slice(8,10), ' ', props.order.confirmed_date.slice(11,13), ':', props.order.confirmed_date.slice(14,16))}`
                            ) : (
                                <Fragment>
                                    {props.order.date_option === 'Specific' && `${props.order.specific_date.slice(2,4).concat('/',props.order.specific_date.slice(5,7), '/', props.order.specific_date.slice(8,10), ' ', props.order.specific_date.slice(11,13), ':', props.order.specific_date.slice(14,16))}`}
                                    {props.order.date_option === 'Range' && (
                                        `${props.order.start_date.slice(2,4).concat('/',props.order.start_date.slice(5,7), '/', props.order.start_date.slice(8,10), ' ~ ', props.order.end_date.slice(2,4), '/',props.order.end_date.slice(5,7), '/', props.order.end_date.slice(8,10))}`
                                    )}
                                </Fragment>
                            )}
                        </p>
                    </div>
                    <div className={`${styles.col4} ${styles.colLg3} ${styles.pr3} ${styles.pl0}`}>
                        <p className={`${styles.fontBold} ${styles.font1214}`}>{`${props.order.option.title} (${props.order.option.person > 1 ? `${props.order.option.person} people,` : `${props.order.option.person} person,`} ${props.order.option.hour > 1 ? `${props.order.option.hour} hrs` : `${props.order.option.hour} hr`})`}</p>
                    </div>
                </div>
            </div>
        </div>
        <Collapse isOpened={props.showResponse} theme={{collapse: styles.collapse}}>
            <div className={`${styles.bgGray33} ${styles.py3} ${styles.px3}`}>
                <p className={`${styles.fontBold} ${styles.font1214} ${styles.white}`}>{context.t("How would you like to respond?")}</p>
                {props.order.available_time ? (null) : (
                    <Fragment>
                        {props.order.date_option === 'Specific' && (
                            <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`} onClick={props.checkedOption === 1 ? () => props.selectOption(0) : () => props.selectOption(1)}>
                                <div className={`${styles.checkBoxSm} ${props.checkedOption === 1 ? styles.checked : null} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    {props.checkedOption === 1 && (
                                        <img src={require('../../assets/images/icon_checked.png')} className={`${styles.iconChecked}`} />
                                    )}
                                </div>
                                <div className={`${styles.checkBoxSmText}`}>
                                    <p className={`${props.checkedOption === 1 ? styles.fontBold : null} ${styles.font1113} ${styles.white} ${styles.ml2}`}>
                                        {context.t("Yes, I’m available at the date&time. I’d like to confirm the reservation.")}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`} onClick={props.checkedOption === 2 ? () => props.selectOption(0) : () => props.selectOption(2)}>
                            <div className={`${styles.checkBoxSm} ${props.checkedOption === 2 ? styles.checked : null} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                {props.checkedOption === 2 && (
                                    <img src={require('../../assets/images/icon_checked.png')} className={`${styles.iconChecked}`} />
                                )}
                            </div>
                            <div className={`${styles.checkBoxSmText}`}>
                                <p className={`${props.checkedOption === 2 ? styles.fontBold : null} ${styles.font1113} ${styles.white} ${styles.ml2}`}>
                                    {props.order.date_option === 'Specific' ? context.t("No, I’d not be available at the date&time, but I’d like to suggest other date&time options to my client.") : context.t("Yes, I'm available at the selected period. I'd like to suggest timeslot options to the client.")}
                                </p>
                            </div>
                        </div>
                    </Fragment>
                )}
                <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`} onClick={props.checkedOption === 3 ? () => props.selectOption(0) : () => props.selectOption(3)}>
                    <div className={`${styles.checkBoxSm} ${props.checkedOption === 3 ? styles.checked : null} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                        {props.checkedOption === 3 && (
                            <img src={require('../../assets/images/icon_checked.png')} className={`${styles.iconChecked}`} />
                        )}
                    </div>
                    <div className={`${styles.checkBoxSmText}`}>
                        <p className={`${props.checkedOption === 3 ? styles.fontBold : null} ${styles.font1113} ${styles.white} ${styles.ml2}`}>
                            {context.t("No, I’d not be available and would like to decline the request.")}
                        </p>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.mx0}`}>
                    <div className={`${styles.bgConfirmed} ${styles.py2} ${styles.px3} ${styles.mt3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} onClick={props.submit}>
                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.white}`}>{context.t("Confirm")}</p>
                    </div>
                </div>
            </div>
        </Collapse>
        <Collapse isOpened={props.showDatePicker} theme={{collapse: styles.collapse}}>
            <div className={`${styles.bgGray33} ${styles.py3} ${styles.px3}`} style={{marginTop: 1}}>
                <p className={`${styles.font1113} ${styles.white}`} style={{lineHeight: 1.2}}>
                    {context.t("Please select your available timeslots in the table below.")}<br/>
                    <span className={`${styles.mobileNone}`}>
                        {context.t("Then we will send it to your client and guide him/her to choose the most desired option.")}
                    </span>
                </p>
                <DayContainer length={props.dayList.length}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.flexNowrap}`} style={{height: 15}}>
                        <p className={`${styles.hidden} ${styles.nowrapInner}`} style={{width: 70}}>{'hidden'}</p>
                        {props.timeList.map((time, index) => (
                            <p key={index} className={`${styles.fontBold} ${styles.font9} ${styles.white} ${styles.nowrapInner}`} style={{width: 31, marginLeft: -5}}>{time}</p>
                        ))}
                    </div>
                    {props.dayList.map((day, index) => (
                        <div key={index} className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.flexNowrap}`} style={{height: 32}}>
                            <p className={`${styles.fontBold} ${styles.font1113} ${styles.white} ${styles.nowrapInner}`} style={{width: 70}}>{`${String(day.getFullYear()).slice(2,4)}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}`}</p>
                            {props.timeList.map((time, index) => {
                                const isSelected = props.selectedTime.find(se => se === `${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) ? true : false
                                return(
                                    <div key={index} className={`${isSelected ? styles.bgConfirmed :styles.bgWhite} ${styles.containerDayBox} ${styles.cursorPointer}`} onClick={isSelected ? () => props.removeTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) :() => props.selectTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`)}>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </DayContainer>
            </div>
        </Collapse>
    </Fragment>
)

OrderComp.propTypes = {
    order: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    showResponse: PropTypes.bool.isRequired,
    openResponse: PropTypes.func.isRequired,
    closeResponse: PropTypes.func.isRequired,
    selectOption: PropTypes.func.isRequired,
    checkedOption: PropTypes.number.isRequired,
    openDatePicker: PropTypes.func.isRequired,
    closeDatePicker: PropTypes.func.isRequired,
    showDatePicker: PropTypes.bool.isRequired,
    dayList: PropTypes.array.isRequired,
    timeList: PropTypes.array.isRequired,
    selectedTime: PropTypes.array.isRequired,
    selectTime: PropTypes.func.isRequired,
    removeTime: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
}

OrderComp.contextTypes = {
    t: PropTypes.func
}

export default OrderComp
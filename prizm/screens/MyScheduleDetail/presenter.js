import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';

const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker icon={require('../../assets/images/icon_marker.png')} position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
)))

const MyScheduleDetail = (props, context) => (
    <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
            <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{props.order.photographer.nickname}</p>
            {props.order.status === 'pending' && (
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.pending}`}>{context.t("Pending")}</p>
            )}
            {((props.order.status === 'confirmed') || (props.order.status === 'waiting_payment')) && (
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.confirmed}`}>{context.t("Confirmed")}</p>
            )}
            {props.order.status === 'paid' && (
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.paid}`}>{context.t("Paid")}</p>
            )}
            {props.order.status === 'cancelled' && (
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.cancelled}`}>{context.t("Cancelled")}</p>
            )}
            {props.order.status === 'completed' && (
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17} ${styles.completed}`}>{context.t("Completed")}</p>
            )}
        </div>
        <p className={`${styles.font11} ${styles.mt2}`}>{props.order.photographer.main_location}</p>
        <p className={`${styles.fontBold} ${styles.font13} ${styles.mt2}`}>{context.t("Location")}</p>
        <p className={`${styles.fontBold} ${styles.font14} ${styles.mt3}`}>{props.order.location.name}</p>
        <div className={`${styles.mt2}`}>
            <Map
            isMarkerShown={true}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className={`${styles.containerMap}`} />}
            mapElement={<div style={{ height: `100%` }} />}
            lng={props.order.location.lng}
            lat={props.order.location.lat}
            />
        </div>
        <p className={`${styles.fontBold} ${styles.font13} ${styles.mt45}`}>{context.t("Date&Time")}</p>
        {props.order.status === 'pending' ? (
            <Fragment>
                {props.order.date_option === "Specific" && (
                    <Fragment>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.mt3}`}>{props.order.specific_date.slice(2,4).concat('/', props.order.specific_date.slice(5,7), '/', props.order.specific_date.slice(8,10), ' ', props.order.specific_date.slice(11,13), ':', props.order.specific_date.slice(14,16))}</p>
                    </Fragment>
                )}
                {props.order.date_option === 'Range' && (
                    <Fragment>
                        <p className={`${styles.fontBold} ${styles.font14} ${styles.mt3}`}>{props.order.start_date.slice(2,4).concat('/', props.order.start_date.slice(5,7), '/', props.order.start_date.slice(8,10), ' ~ ',props.order.end_date.slice(2,4).concat('/', props.order.end_date.slice(5,7), '/', props.order.end_date.slice(8,10)))}</p>
                    </Fragment>
                )}
            </Fragment>
        ) : (
            <Fragment>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.mt3}`}>{props.order.confirmed_date.slice(2,4).concat('/', props.order.confirmed_date.slice(5,7), '/', props.order.confirmed_date.slice(8,10), ' ', props.order.confirmed_date.slice(11,13), ':', props.order.confirmed_date.slice(14,16))}</p>
            </Fragment>
        )}
        
        <p className={`${styles.fontBold} ${styles.font13} ${styles.mt45}`}>{context.t("Service&Pricing")}</p>
        <p className={`${styles.fontBold} ${styles.font14} ${styles.mt3}`}>{`${props.order.option.title} (${props.order.option.person > 1 ? `${props.order.option.person} people` : `${props.order.option.person} person`}, ${props.order.option.hour > 1 ? `${props.order.option.hour} hrs` : `${props.order.option.hour} hr`})`}</p>
        <p className={`${styles.font11} ${styles.mt1} ${styles.mb45}`}>{props.order.option.description}</p>
        {props.order.status === 'confirmed' && (
            <Fragment>
            <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => props.goPayment(props.order)} style={{height: 48}}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Add Payment Details")}</p>
            </div>
            <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>
            {context.t("Please add payment details by : ")}
            {context.t(`${new Date(new Date(props.order.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
            </p>
            </Fragment>
        )}
        {props.order.status === 'waiting_payment' && (
            <Fragment>
            <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => props.goPayment(props.order)} style={{height: 48}}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("View Payment Information")}</p>
            </div>
            <p className={`${styles.font11} ${styles.mt2} ${styles.gray93}`}>
            {context.t("Please make payment by : ")}
            {context.t(`${new Date(new Date(props.order.deposit.created_at).getTime() + 1000*60*60*24*1)}`)}
            </p>
            </Fragment>
        )}
        {props.order.status === 'completed' && !props.order.is_reviewed && (
            <div className={`${styles.widthFull} ${styles.bgCompleted} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mt3}`} onClick={() => props.goReveiwCreate(props.order)} style={{height: 48}}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Leave a Review")}</p>
            </div>
        )}
    </div>
)

MyScheduleDetail.propTypes = {
    order: PropTypes.object.isRequired,
    goPayment: PropTypes.func.isRequired,
    goReveiwCreate: PropTypes.func.isRequired
}

MyScheduleDetail.contextTypes = {
    t: PropTypes.func
}

export default MyScheduleDetail
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import OrderComp from '../OrderComp';

const AdminOrderList = (props, context) => (
    <div className={`${styles.containerAdmin} ${styles.pxAdmin2}`}>
        {props.loading ? (
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            <div className={`${styles.row} ${styles.mx0} ${styles.widthFull}`}>
                <div className={`${styles.safearea} ${styles.containerAdminToolboxSide}`}>
                    <p className={`${styles.mt4} ${styles.fontBold} ${styles.font201820}`}>{context.t("Manage Reservations")}</p>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.mb3}`}>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${props.page === 'all' ? styles.confirmed : styles.black} ${props.page === 'all' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => props.handlePageChange('all')}>
                            {context.t("All")}
                        </p>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${props.page === 'pending' ? styles.confirmed : styles.black} ${props.page === 'pending' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => props.handlePageChange('pending')}>
                            {context.t("Pending")}
                        </p>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${props.page === 'confirmed' ? styles.confirmed : styles.black} ${props.page === 'confirmed' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => props.handlePageChange('confirmed')}>
                            {context.t("Confirmed")}
                        </p>
                        <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${props.page === 'past' ? styles.confirmed : styles.black} ${props.page === 'past' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => props.handlePageChange('past')}>
                            {context.t("Past")}
                        </p>
                    </div>
                    {(props.page === 'all') && props.orderList && (props.orderList.length > 0)  && (
                        props.orderList.map((order, index) => (
                            <OrderComp key={index} order={order} index={index} total={props.orderList.length} refresh={props.refresh} />
                        ))
                    )}
                    {(props.page === 'pending') && props.pendingList && (props.pendingList.length > 0)  && (
                        props.pendingList.map((order, index) => (
                            <OrderComp key={index} order={order} index={index} total={props.orderList.length} refresh={props.refresh} />
                        ))
                    )}
                    {(props.page === 'confirmed') && props.confirmedList && (props.confirmedList.length > 0)  && (
                        props.confirmedList.map((order, index) => (
                            <OrderComp key={index} order={order} index={index} total={props.orderList.length} refresh={props.refresh} />
                        ))
                    )}
                    {(props.page === 'past') && props.pastList && (props.pastList.length > 0)  && (
                        props.pastList.map((order, index) => (
                            <OrderComp key={index} order={order} index={index} total={props.orderList.length} refresh={props.refresh} />
                        ))
                    )}
                </div>
                <div className={`${styles.containerAdminToolbox} ${styles.mobileNone} ${styles.bgGrayF8} ${styles.minHeightFull}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.justifyContentCenter} ${styles.widthFull} ${styles.py4}`}>
                        <p className={`${styles.fontBold} ${styles.font12} ${styles.cursorPointer} ${styles.mr3}`}>{context.t("Profile Setting")}</p>
                        <p className={`${styles.fontBold} ${styles.font12} ${styles.cursorPointer} ${styles.ml3}`}>{context.t("Account Setting")}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
)

AdminOrderList.propTypes = {
    page: PropTypes.string.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    orderList: PropTypes.array,
    pendingList: PropTypes.array,
    confirmedList: PropTypes.array,
    pastList: PropTypes.array,
    refresh: PropTypes.func.isRequired
}

AdminOrderList.contextTypes = {
    t: PropTypes.func
}

export default AdminOrderList;
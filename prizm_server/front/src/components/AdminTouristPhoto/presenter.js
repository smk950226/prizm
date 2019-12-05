import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import OrderComp from '../OrderComp';
import AdminCustomerImage from '../AdminCustomerImage';
import styled from 'styled-components';

const ProfileDiv = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;

    @media (min-width: 1440px){
        width: 64px;
        height: 64px;
        border-radius: 32px;
    }
    
`

const AdminOrderList = (props, context) => (
    <div className={`${styles.containerAdmin} ${styles.pxAdmin}`}>
        {props.loading ? (
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt5} ${styles.pt5}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            <div className={`${styles.row} ${styles.mx0} ${styles.widthFull}`}>
                <div className={`${styles.safeareaAdmin}`} style={{width: 240}}>
                    <p className={`${styles.fontBold} ${styles.font20} ${styles.mt3} ${styles.mb45}`}>{context.t("Tourist Photos")}</p>
                    {props.orderList.map((order, index) => {
                        if((order.status === 'confirmed') || (order.status === 'paid') || (order.status === 'completed')){
                            return(
                                <AdminCustomerImage key={index} order={order} refresh={props.refresh} />
                            )
                        }
                    })}
                </div>
            </div>
        )}
    </div>
)

AdminOrderList.propTypes = {
    page: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    orderList: PropTypes.array,
    refresh: PropTypes.func.isRequired,
    photographer: PropTypes.object.isRequired
}

AdminOrderList.contextTypes = {
    t: PropTypes.func
}

export default AdminOrderList;
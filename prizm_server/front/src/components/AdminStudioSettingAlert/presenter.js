import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import OrderComp from '../OrderComp';
import RequestComp from '../RequestComp';
import AdminCustomerImage from '../AdminCustomerImage';
import styled from 'styled-components';

class AdminOrderList extends Component{
    static propTypes = {
        goStudioSetting: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        return(
            <div className={`${styles.safearea} ${styles.minHeightFull} ${styles.containerCustomer} ${styles.px3}`}>
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font2024}`}>{this.context.t("Create your studio")}</p>
                <div className={`${styles.mt3} ${styles.textCenter}`}>
                    <img src={require('../../assets/images/main.png')} style={{width: '40%', minWidth: 150, maxWidth: 300}} />
                </div>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.mt4}`}>
                    {this.context.t("Let's create your first PRIZM studio.")}
                </p>
                <p className={`${styles.font14} ${styles.mt4}`}>
                    {this.context.t("Your studio works as potential clients' gateways to make reservations according to locations and service&pricing options available on the webpage.")}
                </p>
                <p className={`${styles.font14} ${styles.mt4}`}>
                    {this.context.t("Please introduce yourself in detail so that your clients can get enough information about you. Also, please prepare your profile picture and example photos to be displayed on the webpage.")}
                </p>
                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mb3}`} style={{height: 48, marginTop: 65}} onClick={this.props.goStudioSetting}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Create Studio")}</p>
                </div>
            </div>
        )
    }
}

export default AdminOrderList;
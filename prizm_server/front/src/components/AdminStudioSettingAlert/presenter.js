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
                <p className={`${styles.mt45} ${styles.fontBold} ${styles.font2024}`}>{this.context.t("Studio Create")}</p>
                <div className={`${styles.mt3} ${styles.textCenter}`}>
                    <img src={require('../../assets/images/main.png')} style={{width: '40%', minWidth: 150, maxWidth: 300}} />
                </div>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.mt4}`}>
                    {this.context.t("From now on, we will create your studio.")}
                </p>
                <p className={`${styles.font14} ${styles.mt4}`}>
                    {this.context.t("The customer will check the author's information through the studio and schedule the filming according to the location and service & pricing options you have set.")}
                </p>
                <p className={`${styles.font14} ${styles.mt4}`}>
                    {this.context.t("Please enter details so that the customer can get enough information about you. Also, prepare your profile pictures and examples to be displayed at the top of the studio page.")}
                </p>
                <div className={`${styles.widthFull} ${styles.bgGray16} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${styles.mb3}`} style={{height: 48, marginTop: 65}} onClick={this.props.goStudioSetting}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Create Studio")}</p>
                </div>
            </div>
        )
    }
}

export default AdminOrderList;
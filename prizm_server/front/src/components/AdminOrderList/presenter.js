import React, { Component } from 'react';
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

class AdminOrderList extends Component{
    static propTypes = {
        status: PropTypes.string.isRequired,
        handleStatusChange: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        orderList: PropTypes.array,
        refresh: PropTypes.func.isRequired,
        photographer: PropTypes.object.isRequired,
        goStudioSetting: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        goAccount: PropTypes.func.isRequired,
        orderListMore: PropTypes.func.isRequired,
        isLoadingMore: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    _handleScroll = async() => {
        const wrappedElement = this.refs.orderContainer
        if (this._isBottom(wrappedElement)) {
            if(!this.props.isLoadingMore){
                this.props.orderListMore()
            }
        }
    }

    render(){
        const { photographer, status, loading, orderList, isLoadingMore } = this.props;
        return(
            <div className={`${styles.containerAdmin} ${styles.pxAdmin2}`}>
                <div className={`${styles.row} ${styles.mx0} ${styles.widthFull}`}>
                    <div className={`${styles.safearea} ${styles.containerAdminToolboxSide}`}>
                        <div className={`${styles.mobileNone}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt4}`}>
                                <ProfileDiv image={photographer.profile_image} />
                                <div className={`${styles.ml3}`}>
                                    <p className={`${styles.fontBold} ${styles.font2024}`}>{photographer.nickname}<span className={`${styles.ml3} ${styles.fontBold} ${styles.font1113} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.goStudioSetting}>{this.context.t("Edit Studio")}</span></p>
                                    <a href={`https://prizm.cloud/${photographer.studio_id}`} target={'_blank'} className={`${styles.textDecorationNone} ${styles.urlBlue} ${styles.fontBold} ${styles.font1416} ${styles.mt2}`}>{`prizm.cloud/${photographer.studio_id}`}</a>
                                </div>
                            </div>
                        </div>
                        <p className={`${styles.mt4} ${styles.fontBold} ${styles.font201820}`}>{this.context.t("Manage Reservations")}</p>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt3} ${styles.mb3}`}>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${status === 'all' ? styles.confirmed : styles.black} ${status === 'all' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => this.props.handleStatusChange('all')}>
                                {this.context.t("All")}
                            </p>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${status === 'pending' ? styles.confirmed : styles.black} ${status === 'pending' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => this.props.handleStatusChange('pending')}>
                                {this.context.t("Pending")}
                            </p>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${status === 'confirmed' ? styles.confirmed : styles.black} ${status === 'confirmed' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => this.props.handleStatusChange('confirmed')}>
                                {this.context.t("Confirmed")}
                            </p>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${status === 'paid' ? styles.confirmed : styles.black} ${status === 'paid' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => this.props.handleStatusChange('paid')}>
                                {this.context.t("Paid")}
                            </p>
                            <p className={`${styles.fontBold} ${styles.font1214} ${styles.mr4} ${styles.py1} ${styles.cursorPointer} ${status === 'past' ? styles.confirmed : styles.black} ${status === 'past' ? styles.borderBtmConfirmed2 : styles.black}`} style={{boxSizing: 'border-box'}} onClick={() => this.props.handleStatusChange('past')}>
                                {this.context.t("Past")}
                            </p>
                        </div>
                        <div ref={"orderContainer"}>
                        {loading ? (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt5}`}>
                                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                            </div>
                        ) : (
                            orderList && (orderList.length > 0)  ? (
                                orderList.map((order, index) => (
                                    <OrderComp key={index} order={order} index={index} total={orderList.length} refresh={this.props.refresh} />
                                ))
                            ) : (
                                <div className={`${styles.textCenter}`}>
                                    <img src={require('../../assets/images/main.png')} alt={this.context.t("Request not exist")} className={`${styles.mt5}`} style={{width: '80%', maxWidth: 400}} />
                                    <p className={`${styles.font1214} ${styles.mt3}`}>{this.context.t("You haven't received reservation requests yet.")}</p>
                                </div>
                            )
                        )}
                        {isLoadingMore && (
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mt5}`}>
                                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                            </div>
                        )}
                        </div>
                    </div>
                    <div className={`${styles.containerAdminToolbox} ${styles.mobileNone} ${styles.bgGrayF8} ${styles.minHeightFull}`} style={{display: 'block'}}>
                        <div className={`${styles.px3} ${styles.mobileNone}`} style={{marginTop: 100}}>
                            <p className={`${styles.fontBold} ${styles.font1620} ${styles.mb4}`}>{this.context.t("Tourist Photos")}</p>
                            {orderList.map((order, index) => {
                                if((order.status === 'confirmed') || (order.status === 'waiting_payment') || (order.status === 'paid') || (order.status === 'completed')){
                                    return(
                                        <AdminCustomerImage key={index} order={order} refresh={this.props.refresh} />
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminOrderList;
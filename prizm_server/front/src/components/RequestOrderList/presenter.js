import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class RequestOrderList extends Component{
    static propTypes = {
        orderListMore: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        orders: PropTypes.array,
        isLoadingMore: PropTypes.bool.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        goRequestOrderDetail: PropTypes.func.isRequired,
        goCustomRequest: PropTypes.func.isRequired
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
        if(wrappedElement){
            if (this._isBottom(wrappedElement)) {
                if(!this.props.isLoadingMore){
                    this.props.orderListMore()
                }
            }
        }
    }

    render(){
        const { loading, orders } = this.props;
        return(
            <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer}`}>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.px3} ${styles.py2} ${styles.bgGrayF8}`}>
                    <img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Go Back")} className={`${styles.iconArrowRight} ${styles.cursorPointer}`} onClick={this.props.goCustomRequest} />
                    <p className={`${styles.font1012}`}>{this.context.t("Please select your most preferred photographer.")}</p>
                    <img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Go Back")} className={`${styles.iconArrowRight} ${styles.hidden}`} />
                </div>
                {loading ? (
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    (orders && orders.length > 0) ? (
                        <div className={`${styles.mt45}`} ref={"orderContainer"}>
                            {orders.map((order, index) => {
                                const location = JSON.parse(order.location.replace(/'/gi, '"'))
                                return(
                                <div key={order.id} className={`${styles.py3} ${index % 2 === 0 ? styles.bgWhite : styles.bgGrayF8} ${styles.px3} ${styles.py3} ${styles.cursorPointer}`} onClick={() => this.props.goRequestOrderDetail(order)}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            {order.photographer.profile_image ? (
                                                <ProfileDiv image={order.photographer.profile_image} />
                                            ) : (
                                                <div className={`${styles.bgGray97}`} style={{width: 56, height: 56, borderRadius: 28}} />
                                            )}
                                            <div className={`${styles.ml3}`}>
                                                <p className={`${styles.fontBold} ${styles.font1416}`}>{order.photographer.nickname}</p>
                                                <p className={`${styles.font13} ${styles.mt2}`}>{order.photographer.career}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className={`${styles.font1214} ${styles.pink} ${styles.cursorPointer}`} onClick={() => this.props.goRequestOrderDetail(order)}>
                                                {this.context.t("Details >")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                        <p className={`${styles.font1214}`}>
                                            <span className={`${styles.fontBold}`}>
                                                {this.context.t("Photography Location")}
                                            </span>
                                            {` : ${location.name}`}
                                        </p>
                                        <div className={`${styles.bgBlack} ${styles.mx2}`} style={{width: 2, height: 14}} />
                                        <p className={`${styles.font1214}`}>
                                            <span className={`${styles.fontBold}`}>
                                                {this.context.t("Price")}
                                            </span>
                                            {` : $${numberWithCommas(order.price)}`}
                                        </p>
                                    </div>
                                </div>
                            )})}
                        </div>
                    ) : (
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/main.png')} alt={this.context.t("This request no longer exists")} className={`${styles.mt5} ${styles.pt3}`} style={{width: '80%', maxWidth: 400}} />
                            <p className={`${styles.font1214} ${styles.mt3}`}>
                                {this.context.t("You haven't made any reservations yet.")}<br/>
                                {this.context.t("A new schedule will appear when you submit a request to a photographer.")}
                            </p>
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default RequestOrderList
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyScheduleDetail from './presenter';
import Loader from 'react-loader-spinner';
import styles from '../../style/styles.module.scss';

class Container extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        getOrderDetail: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    }

    constructor(props){
        super(props)
        const { match : { params : { orderId } } } = props;
        this.state = {
            loading: true,
            orderId,
            order: props.location.state ? props.location.state.order ? props.location.state.order : null : null,
        }
    }

    componentDidMount = async() => {
        const { isLoggedIn, goHome, getOrderDetail } = this.props;
        const { order, orderId } = this.state;
        if(!isLoggedIn){
            goHome()
        }
        else{
            if(order){
                this.setState({
                    loading: false
                })
            }
            else{
                const order = await getOrderDetail(orderId)
                this.setState({
                    order,
                    loading: false
                })
            }
        }
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <div className={`${styles.heightFull} ${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            )
        }
        else{
            return(
                <MyScheduleDetail {...this.props} {...this.state} />
            )
        }
    }
}

export default Container;
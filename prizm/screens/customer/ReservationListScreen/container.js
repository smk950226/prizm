import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import ReservationListScreen from './presenter';
import { NavigationEvents } from "react-navigation";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        getOrderList: PropTypes.func.isRequired,
        getOrderListMore: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        checkNotification: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const { orderList } = props;
        this.state = {
            orderList: orderList ? orderList : [],
            loading: true,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            isSendingEmail: false,
            refreshing: false,
            fetchedOrderList: false,
            fetchClear: false
        }
    }

    componentDidMount = async() => {
        if(!this.props.isLoggedIn){
            this.props.navigation.navigate('Home')
        }
        if(this.props.orderList){
            this.setState({
                loading: false
            })
        }
        await this.props.getOrderList()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedOrderList } = prevState;
        if((!fetchedOrderList)){
            let update = {}
            if(nextProps.orderList){
                update.fetchedOrderList = true
                update.orderList = nextProps.orderList
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = async() => {
        if(this.state.fetchedOrderList && !this.state.fetchClear){
            await this.props.checkNotification()
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }
    _orderListMore = async() => {
        const { page, isLoadingMore, hasNextPage } = this.state;
        const { getOrderListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getOrderListMore(page+1)
                if(result){
                    this.setState({
                        page: page+1,
                        orderList: [...this.state.orderList, ...result]
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
                else{
                    this.setState({
                        hasNextPage: false
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
            }
        }
    }

    _send = async() => {
        const { isSendingEmail } = this.state;
        const { sendVerificationEmail, isLoggedIn } = this.props;
        if(!isSendingEmail){
            if(isLoggedIn){
                this.setState({
                    isSendingEmail: true
                })
                const result = await sendVerificationEmail()
                if(result.status === 'ok'){
                    Alert.alert(null, 
                        this.context.t("A verification email has been sent. Please check your inbox."),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSendingEmail: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else if(result.error){
                    Alert.alert(null, 
                        result.error,
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSendingEmail: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else{
                    Alert.alert(null, 
                        this.context.t("An error has occurred.."),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSendingEmail: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
            }
        }
    }

    _refresh = async() => {
        const { getOrderList } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
            fetchClear: false,
            fetchedOrderList: false
        })
        await getOrderList()
    }  

    _remount = async() => {
        const { getOrderList } = this.props;
        this.setState({
            fetchClear: false,
            fetchedOrderList: false
        })
        await getOrderList()
    }

    render(){
        const { orderList } = this.state;
        return(
            <Fragment>
                <NavigationEvents
                onWillFocus={payload => {
                    this._remount()
                }}
                />
                <ReservationListScreen 
                {...this.props} 
                {...this.state} 
                orderList={orderList}
                orderListMore={this._orderListMore}
                send={this._send}
                refresh={this._refresh}
                />
            </Fragment>
        )
    }
}

export default Container;
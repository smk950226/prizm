import React, { Component, Fragment } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import CustomRequestListScreen from './presenter';
import { NavigationEvents } from "react-navigation";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getRequestOrderList: PropTypes.func.isRequired,
        getRequestOrderListMore: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props);
        const requestId = props.navigation.getParam('requestId', null)
        this.state = {
            loading: true,
            requestId,
            orders: [],
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            refreshing: false
        }
    }

    componentDidMount = async() => {
        const { getRequestOrderList, profile } = this.props;
        const { requestId } = this.state;
        if(profile && requestId){
            if(profile.custom_request_status.status === 'open'){
                const result = await getRequestOrderList(requestId)
                if(result.status === 'ok'){
                    this.setState({
                        loading: false,
                        orders: result.orders
                    })
                }
                else if(result.error){
                    Alert.alert(null, 
                        result.error, 
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                loading: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                    this.props.navigation.navigate('Home')
                }
                else{
                    Alert.alert(null, 
                        this.context.t("An error has ocurred.."), 
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                loading: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                    this.props.navigation.navigate('Home')
                }
            }
            else{
                this.props.navigation.navigate('Home')
            }
        }
        else{   
            this.props.navigation.navigate('Home')
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.profile && !this.props.profile){
            this.props.navigation.navigate('Home')
        }
    }

    _orderListMore = async() => {
        const { page, isLoadingMore, hasNextPage, requestId } = this.state;
        const { getRequestOrderListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getRequestOrderListMore(requestId, page+1)
                if(result.status === 'ok'){
                    this.setState({
                        page: page+1,
                        orders: [...this.state.orders, ...result.orders]
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

    _refreshComp = async(obj) => {
        const { profile } = this.props;
        const { requestId } = this.state;
        if(profile && requestId){
            let newOrderList = []
            this.state.ordres.map(order => {
                if(order.id === obj.id){
                    newOrderList.push(obj)
                    return null
                }
                else{
                    newOrderList.push(order)
                }
                this.setState({
                    ordres: newOrderList,
                    loading: false
                })
            })
        }
        else{
            this.props.navigation.navigate('Home')
        }
    }

    _refresh = async() => {
        const { getRequestOrderList, profile } = this.props;
        const { requestId } = this.state;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })
        if(profile && requestId){
            if(profile.custom_request_status.status === 'open'){
                const result = await getRequestOrderList(requestId)
                if(result.status === 'ok'){
                    this.setState({
                        loading: false,
                        orders: result.orders,
                        refreshing: false
                    })
                }
                else if(result.error){
                    Alert.alert(null, 
                        result.error, 
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                loading: false,
                                refreshing: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                    this.props.navigation.navigate('Home')
                }
                else{
                    Alert.alert(null, 
                        this.context.t("An error has ocurred.."), 
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                loading: false,
                                refreshing: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                    this.props.navigation.navigate('Home')
                }
            }
            else{
                this.setState({
                    refreshing: false
                })
                this.props.navigation.navigate('Home')
            }
        }
        else{   
            this.setState({
                refreshing: false
            })
            this.props.navigation.navigate('Home')
        }
    }  

    _remount = async() => {
        const { getRequestOrderList, profile } = this.props;
        const { requestId } = this.state;
        if(profile && requestId){
            if(profile.custom_request_status.status === 'open'){
                const result = await getRequestOrderList(requestId)
                if(result.status === 'ok'){
                    this.setState({
                        orders: result.orders,
                    })
                }
                else if(result.error){
                    Alert.alert(null, result.error)
                    this.props.navigation.navigate('Home')
                }
                else{
                    Alert.alert(null, this.context.t("An error has ocurred.."))
                    this.props.navigation.navigate('Home')
                }
            }
            else{
                this.props.navigation.navigate('Home')
            }
        }
        else{
            this.props.navigation.navigate('Home')
        }
    }

    render(){
        return (
            <Fragment>
                <NavigationEvents
                onWillFocus={payload => {
                    this._remount()
                }}
                />
                <CustomRequestListScreen 
                {...this.props} 
                {...this.state}
                orderListMore={this._orderListMore}
                refreshComp={this._refreshComp}
                refresh={this._refresh}
                />
            </Fragment>
        )
    }
}

export default Container; 